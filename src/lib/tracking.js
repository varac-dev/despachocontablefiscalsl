// Atribución de fuente para WhatsApp: el visitante que llega de un anuncio
// trae ?gclid= (Google) o utm_source; lo guardamos y los botones de WhatsApp
// añaden una línea natural al mensaje precargado ("Los encontré en Google").
// El bot del despacho parsea esa línea y etiqueta first_source del contacto.
const KEY = 'dsp_traffic_source'

export function captureTrafficSource() {
  try {
    const p = new URLSearchParams(window.location.search)
    if (p.get('gclid') || p.get('gad_source') || p.get('gbraid') || p.get('wbraid') || p.get('utm_source') === 'google') {
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
    if (src === 'google') return '\n\n_Los encontré en Google_'
    if (src) return `\n\n_Los encontré en ${src}_`
  } catch { /* ídem */ }
  return ''
}

export function waUrl(baseText) {
  return `https://wa.me/527716242330?text=${encodeURIComponent(baseText + waSourceSuffix())}`
}
