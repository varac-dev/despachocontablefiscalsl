#!/usr/bin/env python3
"""
Generador de páginas de SERVICIO — Despacho Contable Fiscal SL.

Plantilla maestra: public/despacho-contable-en-cdmx.html (la misma de las
ciudades). Datos: scripts/servicios.json. Por cada servicio genera
public/<slug>.html transformando la landing de ciudad en una landing de
servicio (hero, split, FAQ, schema y prefills de WhatsApp propios) y
neutralizando TODA referencia a CDMX/ciudad.

Uso:  python3 scripts/generar_servicios.py           # genera todo
      python3 scripts/generar_servicios.py --check   # solo valida

Rutas de vercel.json y sitemap.xml las agrega generar_ciudades.py (lee este
mismo servicios.json) — correr AMBOS scripts tras cambiar la plantilla.
Cada ancla es literal de la plantilla CDMX: si no aparece, el script truena
con error claro en vez de generar páginas a medias.
"""
import json
import re
import sys
import pathlib
from urllib.parse import quote

ROOT = pathlib.Path(__file__).resolve().parent.parent
MASTER = ROOT / "public" / "despacho-contable-en-cdmx.html"
DATA = ROOT / "scripts" / "servicios.json"
CIUDADES = ROOT / "scripts" / "ciudades.json"

CHECK_ONLY = "--check" in sys.argv

RE_DIR = re.compile(r"<!-- dir-ciudades:inicio -->.*?<!-- dir-ciudades:fin -->", re.S)
RE_FAQ_HTML = re.compile(r"<section class=\"block faq\">.*?</section>", re.S)
RE_FAQ_LD = re.compile(r"<script type=\"application/ld\+json\">\s*\{[^<]*\"FAQPage\".*?</script>", re.S)
RE_CHECKS = re.compile(r"<ul class=\"checks\">.*?</ul>", re.S)


def dir_completo() -> str:
    """Directorio del footer para páginas de servicio: TODAS las ciudades."""
    data = json.loads(CIUDADES.read_text())
    items = [("despacho-contable-en-cdmx", "Ciudad de México")] + [
        (c["slug"], c["nombre"][3:].strip() if c["nombre"].startswith("el ") else c["nombre"])
        for c in data["ciudades"]
    ]
    links = " · ".join(f'<a href="/{slug}">{label}</a>' for slug, label in items)
    servicios = json.loads(DATA.read_text())["servicios"]
    sv_links = " · ".join(f'<a href="/{s["slug"]}">{s["nombre"]}</a>' for s in servicios)
    return (
        "<!-- dir-ciudades:inicio -->\n"
        '        <div class="footer-cities"><h4>Despacho contable en tu ciudad</h4><p>'
        + links
        + f'</p><p class="footer-servicios"><strong>Servicios:</strong> {sv_links}</p></div>\n'
        "        <!-- dir-ciudades:fin -->"
    )


def generar(master: str, sv: dict, dir_block: str) -> str:
    html = master
    faltantes = []

    def sub(ancla: str, nuevo: str, todas: bool = False):
        nonlocal html
        if ancla not in html:
            faltantes.append(ancla[:70])
            return
        html = html.replace(ancla, nuevo) if todas else html.replace(ancla, nuevo, 1)

    n = sv["nombre"]

    # 0) proteger el directorio del footer de los reemplazos
    if not RE_DIR.search(html):
        faltantes.append("<!-- dir-ciudades markers -->")
    html = RE_DIR.sub("@@DIR@@", html)

    # 1) URLs / slug (canonical, og:url, breadcrumb schema)
    html = html.replace("despacho-contable-en-cdmx", sv["slug"])

    # 2) head: title / metas / og / twitter
    sub("<title>Despacho Contable en CDMX | Contadores Fiscales · 40 Años</title>",
        f"<title>{sv['title']}</title>")
    sub('<meta name="title" content="Despacho Contable en CDMX | Contadores Fiscales · 40 Años" />',
        f'<meta name="title" content="{sv["title"]}" />')
    sub('<meta name="description" content="Despacho contable en CDMX con 40+ años de experiencia. Te ayudamos a resolver cualquier tema con el SAT: contabilidad, declaraciones, regularización y defensa fiscal. 100% a distancia." />',
        f'<meta name="description" content="{sv["meta_desc"]}" />')
    sub('<meta name="keywords" content="despacho contable cdmx, contadores cdmx, despacho de contadores cdmx, despachos contables cdmx, contabilidad ciudad de mexico, defensa fiscal cdmx, regularizacion fiscal cdmx" />',
        f'<meta name="keywords" content="{sv["keywords"]}" />')
    sub('<meta property="og:title" content="Despacho Contable en CDMX | Contadores Fiscales con 40 Años" />',
        f'<meta property="og:title" content="{sv["title"]}" />')
    sub('<meta property="og:description" content="Contabilidad, defensa fiscal ante el SAT y regularización para personas físicas y PYMES en la Ciudad de México. Más de 40 años protegiendo tu patrimonio." />',
        f'<meta property="og:description" content="{sv["og_desc"]}" />')
    sub('<meta property="twitter:title" content="Despacho Contable en CDMX | Contadores Fiscales con 40 Años" />',
        f'<meta property="twitter:title" content="{sv["title"]}" />')
    sub('<meta property="twitter:description" content="Contabilidad, defensa fiscal ante el SAT y regularización para personas físicas y PYMES en la Ciudad de México." />',
        f'<meta property="twitter:description" content="{sv["og_desc"]}" />')

    # 3) schema AccountingService: descripción + areaServed nacional
    sub('"description": "Despacho contable con más de 40 años de experiencia que atiende a personas físicas, profesionistas y PYMES en la Ciudad de México: contabilidad, defensa fiscal ante el SAT, regularización, consultoría y nóminas.",',
        f'"description": "{n}: {sv["og_desc"]} Despacho con más de 40 años de experiencia.",')
    sub('"areaServed": { "@type": "City", "name": "Ciudad de México" },',
        '"areaServed": { "@type": "Country", "name": "México" },')
    sub('<!-- Schema.org: AccountingService + areaServed CDMX -->',
        '<!-- Schema.org: AccountingService + areaServed México -->')

    # 4) breadcrumb (visible + schema)
    sub('<a href="/#servicios">Cobertura</a> &rsaquo; <span>Despacho Contable en CDMX</span>',
        f'<a href="/#servicios">Servicios</a> &rsaquo; <span>{n}</span>')
    sub('"name":"Despacho Contable en CDMX"', f'"name":"{n}"')

    # 5) hero
    sub('<span class="eyebrow"><i class="fas fa-map-marker-alt"></i> Despacho contable en CDMX · 40 años de experiencia</span>',
        f'<span class="eyebrow"><i class="fas fa-scale-balanced"></i> {sv["eyebrow"]}</span>')
    sub('<h1><span id="twrap">Tu despacho contable en <span class="tw-gold">CDMX</span></span><span class="tw-cursor" id="twcur">|</span></h1>',
        f'<h1><span class="tw-gold">{sv["h1_gold"]}</span>{sv["h1_rest"]}</h1>')
    sub('<p class="hero-subhead">Resolvemos cualquier tema con el SAT, sin que salgas de tu oficina.</p>',
        f'<p class="hero-subhead">{sv["subhead"]}</p>')
    sub('<p class="lead">¿Tienes asuntos pendientes con el SAT y no sabes por dónde empezar? No importa si eres empresa, persona física, profesionista independiente o si no sabes nada de impuestos: ponemos tu situación fiscal en orden, claro y sin complicaciones. Más de 40 años respaldándote.</p>',
        f'<p class="lead">{sv["lead"]}</p>')
    sub('alt="Asesoría contable y fiscal para empresas en la Ciudad de México"',
        f'alt="{n} — despacho contable con 40 años de experiencia"')

    # 6) typewriter neutralizado (el H1 ya es estático)
    sub("var parts=[{t:'Tu despacho contable en ',g:false},{t:'CDMX',g:true}];",
        "var parts=[];")

    # 7) WhatsApp: quitar coletilla de ciudad y poner texto del hero por servicio
    html = html.replace("%20en%20CDMX", "")
    wa_enc = quote(sv["wa"])
    sub("text=Hola,%20tengo%20un%20tema%20fiscal%20que%20resolver", f"text={wa_enc}", todas=True)

    # 8) sección servicios (se conserva como cross-sell, retitulada)
    sub('<h2>Servicios contables y fiscales en CDMX</h2>', '<h2>Todos nuestros servicios</h2>')

    # 9) split → detalle del servicio
    sub('<h2>Un despacho contable para toda la CDMX, sin que salgas de tu oficina</h2>',
        f'<h2>{sv["split_h2"]}</h2>')
    sub('<p>No necesitas un despacho a la vuelta de la esquina. En México las obligaciones fiscales son <strong>federales y 100% digitales</strong> ante el SAT, así que atendemos a personas físicas, profesionistas y empresas de <strong>toda la Ciudad de México</strong> —Benito Juárez, Cuauhtémoc, Miguel Hidalgo, Coyoacán, Álvaro Obregón y todas las alcaldías— a distancia, con la misma cercanía y seguimiento que si estuviéramos a un lado.</p>',
        f'<p>{sv["detalle"]}</p>')
    checks = "".join(
        f'<li><i class="fas fa-circle-check"></i> <span>{c}</span></li>' for c in sv["checks"]
    )
    if not RE_CHECKS.search(html):
        faltantes.append('<ul class="checks">')
    html = RE_CHECKS.sub(f'<ul class="checks">{checks}</ul>', html, count=1)
    sub('alt="Contabilidad y trámites fiscales 100% en línea para clientes en CDMX"',
        'alt="Contabilidad y trámites fiscales 100% en línea"')

    # 10) FAQ (visible + JSON-LD)
    faq_html = "".join(
        f'<details{" open" if i == 0 else ""}><summary>{q}</summary><p>{a}</p></details>'
        for i, (q, a) in enumerate(sv["faq"])
    )
    faq_section = (
        '<section class="block faq">\n    <div class="container wrap">\n'
        f'      <div class="section-head"><span class="eyebrow">Preguntas frecuentes</span><h2>{n}</h2></div>\n'
        f"      {faq_html}\n    </div>\n  </section>"
    )
    if not RE_FAQ_HTML.search(html):
        faltantes.append('<section class="block faq">')
    html = RE_FAQ_HTML.sub(faq_section, html, count=1)
    faq_ld = json.dumps({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {"@type": "Question", "name": q,
             "acceptedAnswer": {"@type": "Answer", "text": a}}
            for q, a in sv["faq"]
        ],
    }, ensure_ascii=False, indent=2)
    if not RE_FAQ_LD.search(html):
        faltantes.append('FAQPage JSON-LD')
    html = RE_FAQ_LD.sub(f'<script type="application/ld+json">\n{faq_ld}\n</script>', html, count=1)

    # 11) banda CTA final
    sub('Sea lo que sea con el SAT, lo ponemos en orden. Atendemos toda la CDMX y te respondemos el mismo día.',
        'Sea lo que sea con el SAT, lo ponemos en orden. Atendemos a todo México y te respondemos el mismo día.')

    # 12) medición (GA4 / Meta): page_city → nombre del servicio
    sub("page_city:'CDMX'", f"page_city:'{sv['ga']}'", todas=True)
    sub("'Contacto '+canal+' CDMX'", f"'Contacto '+canal+' · {n}'")
    sub("var CITY='CDMX';", f"var CITY='{sv['ga']}';")

    if faltantes:
        raise SystemExit(
            f"❌ {sv['slug']}: anclas no encontradas (¿cambió la plantilla CDMX?):\n  - "
            + "\n  - ".join(faltantes)
        )

    # sanity: cero rastros de ciudad fuera del directorio del footer
    restos = len(re.findall(r"CDMX|Ciudad de M", html))
    if restos:
        raise SystemExit(f"❌ {sv['slug']}: quedaron {restos} menciones de ciudad sin sustituir")

    html = html.replace("@@DIR@@", dir_block)
    return html


def main():
    master = MASTER.read_text()
    data = json.loads(DATA.read_text())
    dir_block = dir_completo()
    for sv in data["servicios"]:
        html = generar(master, sv, dir_block)
        destino = ROOT / "public" / f"{sv['slug']}.html"
        if not CHECK_ONLY:
            destino.write_text(html)
        print(f"✅ {sv['slug']}.html ({len(html):,} bytes)")
    if CHECK_ONLY:
        print("✔ check: anclas OK, no se escribió nada")


if __name__ == "__main__":
    main()
