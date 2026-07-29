// Atribución de fuente para WhatsApp: el visitante que llega de un anuncio
// trae ?gclid= (Google) o utm_source; lo guardamos y los botones de WhatsApp
// añaden una línea natural al mensaje precargado ("Los encontré en Google").
// El bot del despacho parsea esa línea y etiqueta first_source del contacto.
const KEY = 'dsp_traffic_source'
const GCLID_KEY = 'dsp_gclid'

export function captureTrafficSource() {
  try {
    const p = new URLSearchParams(window.location.search)
    const g = p.get('gclid') || p.get('gbraid') || p.get('wbraid')
    if (g) sessionStorage.setItem(GCLID_KEY, g.slice(0, 120))
    if (g || p.get('gad_source') || p.get('utm_source') === 'google') {
      sessionStorage.setItem(KEY, 'google')
    } else if (p.get('utm_source')) {
      sessionStorage.setItem(KEY, p.get('utm_source').slice(0, 24))
    }
  } catch {
    // sessionStorage bloqueado (incógnito viejo): sin atribución, sin romper nada
  }
}

export function waSourceSuffix() {
  try {
    const src = sessionStorage.getItem(KEY)
    if (!src) return ''
    // El "Ref" es el gclid: el bot lo guarda y con él Google puede recibir la
    // venta real como conversión offline (misma mecánica que TP).
    const gid = sessionStorage.getItem(GCLID_KEY)
    const linea = src === 'google' ? '\n\n_Los encontré en Google_' : `\n\n_Los encontré en ${src}_`
    return gid ? `${linea}\nRef: ${gid}` : linea
  } catch { /* ídem */ }
  return ''
}

export function waUrl(baseText) {
  return `https://wa.me/527716242330?text=${encodeURIComponent(baseText + waSourceSuffix())}`
}
