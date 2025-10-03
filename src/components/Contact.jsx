import { useState } from 'react';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    rfc: '',
    servicio: '',
    mensaje: ''
  });

  const [message, setMessage] = useState({ type: '', text: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validación básica
    if (!formData.nombre || !formData.email || !formData.servicio) {
      setMessage({
        type: 'error',
        text: 'Por favor completa todos los campos obligatorios'
      });
      setTimeout(() => setMessage({ type: '', text: '' }), 5000);
      return;
    }

    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setMessage({
        type: 'error',
        text: 'Por favor ingresa un email válido'
      });
      setTimeout(() => setMessage({ type: '', text: '' }), 5000);
      return;
    }

    // Crear mensaje de WhatsApp
    const servicioNombres = {
      'contabilidad': 'Contabilidad General',
      'fiscal': 'Servicios Fiscales',
      'nominas': 'Nóminas',
      'auditoria': 'Auditorías',
      'consultoria': 'Consultoría',
      'paquete-integral': 'Paquete Integral',
      'regularizacion': 'Regularización Fiscal'
    };

    let mensajeWhatsApp = `*Nueva Consulta - Despacho Contable Fiscal SL*\n\n`;
    mensajeWhatsApp += `*Nombre:* ${formData.nombre}\n`;
    mensajeWhatsApp += `*Email:* ${formData.email}\n`;
    if (formData.rfc) {
      mensajeWhatsApp += `*RFC:* ${formData.rfc}\n`;
    }
    mensajeWhatsApp += `*Servicio de interés:* ${servicioNombres[formData.servicio]}\n`;
    if (formData.mensaje) {
      mensajeWhatsApp += `\n*Mensaje:*\n${formData.mensaje}`;
    }

    // Codificar el mensaje para URL
    const mensajeCodificado = encodeURIComponent(mensajeWhatsApp);

    // Número de WhatsApp del despacho
    const numeroWhatsApp = '527716242330';

    // Abrir WhatsApp con el mensaje
    window.open(`https://wa.me/${numeroWhatsApp}?text=${mensajeCodificado}`, '_blank');

    // Mostrar mensaje de éxito
    setMessage({
      type: 'success',
      text: '¡Redirigiendo a WhatsApp! Completa el envío desde la app.'
    });

    // Reset form
    setFormData({
      nombre: '',
      email: '',
      rfc: '',
      servicio: '',
      mensaje: ''
    });

    setTimeout(() => setMessage({ type: '', text: '' }), 5000);
  };

  return (
    <section id="contacto" className="contact">
      <div className="container">
        {/* Section Header with gradient effect */}
        <div className="contact-header">
          <span className="section-badge">CONTACTO</span>
          <h2>Conecta con Nosotros</h2>
          <p>Tu éxito financiero comienza con una conversación</p>
        </div>

        {/* Main Bento Grid Container */}
        <div className="bento-container">

          {/* Large Form Card - Main Focus */}
          <div className="bento-card bento-large bento-form-card">
            <div className="card-content">
              <div className="form-header">
                <h3>Cuéntanos tu necesidad</h3>
                <p>Responderemos en menos de 24 horas</p>
              </div>

              {/* Message Display */}
              {message.text && (
                <div className={`alert alert-${message.type}`}>
                  <i className={`fas ${message.type === 'success' ? 'fa-check-circle' : 'fa-exclamation-triangle'}`}></i>
                  <span>{message.text}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-grid">
                  <div className="input-group">
                    <label htmlFor="nombre">Nombre completo</label>
                    <div className="input-wrapper">
                      <i className="fas fa-user"></i>
                      <input
                        id="nombre"
                        type="text"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                        placeholder="Juan Pérez"
                        required
                      />
                    </div>
                  </div>

                  <div className="input-group">
                    <label htmlFor="email">Correo electrónico</label>
                    <div className="input-wrapper">
                      <i className="fas fa-envelope"></i>
                      <input
                        id="email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="correo@ejemplo.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="input-group">
                    <label htmlFor="rfc">RFC (Opcional)</label>
                    <div className="input-wrapper">
                      <i className="fas fa-id-card"></i>
                      <input
                        id="rfc"
                        type="text"
                        name="rfc"
                        value={formData.rfc}
                        onChange={handleChange}
                        placeholder="XAXX010101000"
                      />
                    </div>
                  </div>
                </div>

                <div className="input-group full-width">
                  <label htmlFor="servicio">Servicio de interés</label>
                  <div className="input-wrapper">
                    <i className="fas fa-briefcase"></i>
                    <select
                      id="servicio"
                      name="servicio"
                      value={formData.servicio}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Selecciona un servicio</option>
                      <option value="contabilidad">Contabilidad General</option>
                      <option value="fiscal">Servicios Fiscales</option>
                      <option value="nominas">Nóminas</option>
                      <option value="auditoria">Auditorías</option>
                      <option value="consultoria">Consultoría</option>
                      <option value="paquete-integral">Paquete Integral</option>
                      <option value="regularizacion">Regularización Fiscal</option>
                    </select>
                  </div>
                </div>

                <div className="input-group full-width">
                  <label htmlFor="mensaje">Mensaje (Opcional)</label>
                  <div className="input-wrapper">
                    <i className="fas fa-message"></i>
                    <textarea
                      id="mensaje"
                      name="mensaje"
                      value={formData.mensaje}
                      onChange={handleChange}
                      placeholder="Cuéntanos más detalles sobre tu consulta..."
                      rows="4"
                    ></textarea>
                  </div>
                </div>

                <button type="submit" className="btn-submit">
                  <span>Enviar mensaje</span>
                  <i className="fas fa-paper-plane"></i>
                </button>
              </form>
            </div>
          </div>

          {/* Quick Contact - WhatsApp Priority */}
          <div className="bento-card bento-whatsapp">
            <div className="card-content">
              <div className="whatsapp-gradient">
                <i className="fab fa-whatsapp"></i>
              </div>
              <h4>Respuesta Inmediata</h4>
              <p>¿Prefieres WhatsApp?</p>
              <a
                href="https://wa.me/527716242330"
                target="_blank"
                rel="noopener noreferrer"
                className="whatsapp-link"
              >
                <span>Iniciar chat</span>
                <i className="fas fa-external-link-alt"></i>
              </a>
            </div>
          </div>

          {/* Office Location */}
          <div className="bento-card bento-location">
            <div className="card-content">
              <div className="location-header">
                <i className="fas fa-building"></i>
                <h4>Nuestra Oficina</h4>
              </div>
              <div className="location-details">
                <p className="office-name">Torre Prisma</p>
                <p className="office-address">Piso 6, Oficina 608</p>
                <p className="office-street">Camino Real de La Plata 110</p>
                <p className="office-city">Zona Plateada, Pachuca</p>
              </div>
              <a
                href="https://maps.google.com/?q=Torre+Prisma+Pachuca"
                target="_blank"
                rel="noopener noreferrer"
                className="map-link"
              >
                <i className="fas fa-map-marked-alt"></i>
                <span>Ver en mapa</span>
              </a>
            </div>
          </div>

          {/* Phone Direct */}
          <div className="bento-card bento-phone">
            <div className="card-content">
              <div className="phone-icon">
                <i className="fas fa-headset"></i>
              </div>
              <span className="phone-label">Llámanos</span>
              <a href="tel:7716242330" className="phone-number">
                771 624 2330
              </a>
            </div>
          </div>

          {/* Email */}
          <div className="bento-card bento-email">
            <div className="card-content">
              <i className="fas fa-envelope-open-text"></i>
              <span className="email-label">Email</span>
              <a href="mailto:despachocontable67sl@gmail.com" className="email-address">
                despachocontable67sl@gmail.com
              </a>
            </div>
          </div>

          {/* Schedule */}
          <div className="bento-card bento-schedule">
            <div className="card-content">
              <div className="schedule-header">
                <i className="fas fa-calendar-check"></i>
                <h4>Horario de Atención</h4>
              </div>
              <div className="schedule-grid">
                <div className="schedule-day">
                  <span className="day">Lun - Vie</span>
                  <span className="time">9:00 - 17:00</span>
                </div>
                <div className="schedule-day weekend">
                  <span className="day">Sábado</span>
                  <span className="time">Cerrado</span>
                </div>
              </div>
              <div className="availability-badge">
                <span className="pulse"></span>
                <span>Disponible ahora</span>
              </div>
            </div>
          </div>

          {/* Interactive Map */}
          <div className="bento-card bento-map">
            <div className="map-overlay">
              <button className="map-expand">
                <i className="fas fa-expand"></i>
                <span>Ampliar mapa</span>
              </button>
            </div>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3753.4418633858827!2d-98.77153242503983!3d20.096811181145074!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x62922158a1f64061%3A0x6d07101e35ff1966!2sDespacho%20Contable%20Fiscal%20SL%20Pachuca!5e0!3m2!1ses!2smx!4v1727820000000!5m2!1ses!2smx"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              title="Ubicación del despacho"
            ></iframe>
          </div>

          {/* Stats/Trust Card */}
          <div className="bento-card bento-stats">
            <div className="card-content">
              <div className="stat-item">
                <i className="fas fa-users"></i>
                <div className="stat-info">
                  <span className="stat-number">100+</span>
                  <span className="stat-label">Clientes satisfechos</span>
                </div>
              </div>
              <div className="stat-item">
                <i className="fas fa-award"></i>
                <div className="stat-info">
                  <span className="stat-number">40+</span>
                  <span className="stat-label">Años de experiencia</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;