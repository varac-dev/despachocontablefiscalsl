#!/usr/bin/env python3
"""
Motor generador de páginas SEO por ciudad — Despacho Contable Fiscal SL.

Plantilla maestra: public/despacho-contable-en-cdmx.html (aprobada por el
despacho, jul-2026). Datos: scripts/ciudades.json. Por cada ciudad genera
public/<slug>.html con contenido local único, y regenera sitemap.xml y las
rutas de vercel.json (idempotente — correrlo N veces da el mismo resultado).

Uso:  python3 scripts/generar_ciudades.py            # genera todo
      python3 scripts/generar_ciudades.py --check    # solo valida, no escribe

Agregar una ciudad nueva = agregar su entrada en scripts/ciudades.json y
volver a correr este script. NO editar los HTML generados a mano (se pisan).
"""
import json
import re
import sys
import datetime
import pathlib
from urllib.parse import quote

ROOT = pathlib.Path(__file__).resolve().parent.parent
MASTER = ROOT / "public" / "despacho-contable-en-cdmx.html"
DATA = ROOT / "scripts" / "ciudades.json"
VERCEL = ROOT / "vercel.json"
SITEMAP = ROOT / "public" / "sitemap.xml"
BASE = "https://www.despachocontablefiscal-sl.com"

CHECK_ONLY = "--check" in sys.argv

# ---------- directorio de ciudades (interlinking en el footer) ----------
# El bloque vive en el master entre estos marcadores; aquí se regenera por
# ciudad (excluyendo la propia) para que todas las landings se enlacen entre
# sí y con CDMX. Se tokeniza ANTES de los reemplazos globales (CDMX→ciudad)
# y se reinserta al final para que los labels/hrefs no se corrompan.
DIR_TOKEN = "@@DIR_CIUDADES@@"
RE_DIR = re.compile(r"<!-- dir-ciudades:inicio -->.*?<!-- dir-ciudades:fin -->", re.S)


def _label(nombre: str) -> str:
    return nombre[3:].strip() if nombre.startswith("el ") else nombre


def dir_ciudades_html(ciudades: list[dict], excluir_slug: str) -> str:
    items = [("despacho-contable-en-cdmx", "Ciudad de México")] + [
        (c["slug"], _label(c["nombre"])) for c in ciudades
    ]
    links = " · ".join(
        f'<a href="/{slug}">{label}</a>' for slug, label in items if slug != excluir_slug
    )
    return (
        "<!-- dir-ciudades:inicio -->\n"
        '        <div class="footer-cities"><h4>Despacho contable en tu ciudad</h4><p>'
        + links
        + "</p></div>\n        <!-- dir-ciudades:fin -->"
    )

# ---------- bloques de la plantilla que se reemplazan COMPLETOS ----------
# (anclas literales de la versión CDMX aprobada; si la plantilla cambia y un
#  ancla no se encuentra, el script truena con error claro en vez de generar
#  páginas a medias)
ANCLA_LEAD = '<p class="lead">¿Tienes asuntos pendientes con el SAT y no sabes por dónde empezar? No importa si eres empresa, persona física, profesionista independiente o si no sabes nada de impuestos: ponemos tu situación fiscal en orden, claro y sin complicaciones. Más de 40 años respaldándote.</p>'
ANCLA_COBERTURA = '<p>No necesitas un despacho a la vuelta de la esquina. En México las obligaciones fiscales son <strong>federales y 100% digitales</strong> ante el SAT, así que atendemos a personas físicas, profesionistas y empresas de <strong>toda la Ciudad de México</strong> —Benito Juárez, Cuauhtémoc, Miguel Hidalgo, Coyoacán, Álvaro Obregón y todas las alcaldías— a distancia, con la misma cercanía y seguimiento que si estuviéramos a un lado.</p>'
ANCLA_TITLE = "<title>Despacho Contable en CDMX | Contadores Fiscales · 40 Años</title>"
ANCLA_META_TITLE = '<meta name="title" content="Despacho Contable en CDMX | Contadores Fiscales · 40 Años" />'
ANCLA_META_DESC = '<meta name="description" content="Despacho contable en CDMX con 40+ años de experiencia. Te ayudamos a resolver cualquier tema con el SAT: contabilidad, declaraciones, regularización y defensa fiscal. 100% a distancia." />'
ANCLA_KEYWORDS = '<meta name="keywords" content="despacho contable cdmx, contadores cdmx, despacho de contadores cdmx, despachos contables cdmx, contabilidad ciudad de mexico, defensa fiscal cdmx, regularizacion fiscal cdmx" />'
ANCLA_OG_TITLE = '<meta property="og:title" content="Despacho Contable en CDMX | Contadores Fiscales con 40 Años" />'
ANCLA_OG_DESC = '<meta property="og:description" content="Contabilidad, defensa fiscal ante el SAT y regularización para personas físicas y PYMES en la Ciudad de México. Más de 40 años protegiendo tu patrimonio." />'
ANCLA_TW_TITLE = '<meta property="twitter:title" content="Despacho Contable en CDMX | Contadores Fiscales con 40 Años" />'
ANCLA_TW_DESC = '<meta property="twitter:description" content="Contabilidad, defensa fiscal ante el SAT y regularización para personas físicas y PYMES en la Ciudad de México." />'


def generar(master: str, ciudad: dict, dir_block: str) -> str:
    html = master
    faltantes = []

    # 0) tokenizar el directorio de ciudades para protegerlo de los reemplazos
    if not RE_DIR.search(html):
        faltantes.append("<!-- dir-ciudades:inicio --> … <!-- dir-ciudades:fin -->")
    html = RE_DIR.sub(DIR_TOKEN, html)

    def sub(ancla: str, nuevo: str):
        nonlocal html
        if ancla not in html:
            faltantes.append(ancla[:70])
            return
        html = html.replace(ancla, nuevo)

    n, largo = ciudad["nombre"], ciudad["nombre_largo"]
    # capitalizada para contextos de inicio/título ("el Estado de México" → "El Estado...")
    n_tit = n[0].upper() + n[1:]

    # 1) URLs / slug
    html = html.replace("despacho-contable-en-cdmx", ciudad["slug"])

    # 2) bloques completos con contenido único
    sub(ANCLA_LEAD, f'<p class="lead">{ciudad["lead"]}</p>')
    sub(ANCLA_COBERTURA, f'<p>{ciudad["cobertura"]}</p>')
    sub(ANCLA_TITLE, f"<title>{ciudad['title']}</title>")
    sub(ANCLA_META_TITLE, f'<meta name="title" content="{ciudad["title"]}" />')
    sub(ANCLA_META_DESC, f'<meta name="description" content="{ciudad["meta_desc"]}" />')
    sub(ANCLA_KEYWORDS, f'<meta name="keywords" content="{ciudad["keywords"]}" />')
    sub(ANCLA_OG_TITLE, f'<meta property="og:title" content="{ciudad["title"]}" />')
    sub(ANCLA_OG_DESC, f'<meta property="og:description" content="{ciudad["og_desc"]}" />')
    sub(ANCLA_TW_TITLE, f'<meta property="twitter:title" content="{ciudad["title"]}" />')
    sub(ANCLA_TW_DESC, f'<meta property="twitter:description" content="{ciudad["og_desc"]}" />')

    # 3) textos prellenados de WhatsApp (URL-encoded: sin espacios crudos)
    html = html.replace("%20CDMX", "%20" + quote(n))

    # 4) frases con artículo/género (orden: de la más específica a la más corta)
    html = html.replace("toda la Ciudad de México", ciudad["toda_largo"])
    html = html.replace("toda la CDMX", ciudad["toda"])
    html = html.replace("en la Ciudad de México", f"en {largo}")
    html = html.replace("la Ciudad de México", largo)
    html = html.replace("Ciudad de México", largo)
    html = html.replace("CDMX", n)

    # 5) schema areaServed: estados usan @type State y nombre sin artículo
    if n.startswith("el "):
        html = html.replace(
            f'"@type": "City", "name": "{n}"',
            f'"@type": "State", "name": "{n[3:].strip()}"',
        )
    _ = n_tit  # reservado para futuros contextos de inicio de frase

    if faltantes:
        raise SystemExit(
            f"❌ {ciudad['slug']}: anclas no encontradas en la plantilla (¿cambió CDMX?):\n  - "
            + "\n  - ".join(faltantes)
        )

    # sanity: no deben quedar rastros de la ciudad maestra
    restos = len(re.findall(r"CDMX|Ciudad de M", html))
    if restos:
        raise SystemExit(f"❌ {ciudad['slug']}: quedaron {restos} menciones sin sustituir")

    # reinsertar el directorio de ciudades ya con la ciudad propia excluida
    html = html.replace(DIR_TOKEN, dir_block)
    return html


def actualizar_vercel(slugs: list[str]):
    cfg = json.loads(VERCEL.read_text())
    rutas = cfg["routes"]
    existentes = {r.get("src") for r in rutas}
    # insertar cada ciudad justo antes del catch-all (última ruta)
    for slug in slugs:
        src = f"/{slug}"
        if src not in existentes:
            rutas.insert(len(rutas) - 1, {"src": src, "dest": f"/{slug}.html"})
    if not CHECK_ONLY:
        VERCEL.write_text(json.dumps(cfg, indent=2, ensure_ascii=False) + "\n")


def regenerar_sitemap(slugs: list[str]):
    hoy = datetime.date.today().isoformat()
    urls = [
        ("", "1.0", "weekly"),
        ("despacho-contable-en-cdmx", "0.9", "monthly"),
    ] + [(s, "0.9", "monthly") for s in slugs]
    cuerpo = "\n".join(
        f"""  <url>
    <loc>{BASE}/{path}</loc>
    <lastmod>{hoy}</lastmod>
    <changefreq>{freq}</changefreq>
    <priority>{prio}</priority>
  </url>""".replace(f"{BASE}//", f"{BASE}/")
        for path, prio, freq in urls
    )
    xml = f"""<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
{cuerpo}
</urlset>
"""
    if not CHECK_ONLY:
        SITEMAP.write_text(xml)


def main():
    master = MASTER.read_text()
    data = json.loads(DATA.read_text())
    ciudades = data["ciudades"]
    slugs = []
    for ciudad in ciudades:
        html = generar(master, ciudad, dir_ciudades_html(ciudades, ciudad["slug"]))
        destino = ROOT / "public" / f"{ciudad['slug']}.html"
        if not CHECK_ONLY:
            destino.write_text(html)
        slugs.append(ciudad["slug"])
        print(f"✅ {ciudad['slug']}.html ({len(html):,} bytes)")
    actualizar_vercel(slugs)
    regenerar_sitemap(slugs)
    print(f"✅ vercel.json: rutas al día · sitemap.xml: {len(slugs) + 2} URLs")
    if CHECK_ONLY:
        print("(modo --check: no se escribió nada)")


if __name__ == "__main__":
    main()
