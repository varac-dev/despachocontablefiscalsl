import { useState } from 'react';
import './ContactModal.css';

const ContactModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    rfc: '',
    servicio: '',
    mensaje: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert('Por favor ingresa un email válido');
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

    // Resetear formulario
    setFormData({
      nombre: '',
      email: '',
      rfc: '',
      servicio: '',
      mensaje: ''
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          <i className="fas fa-times"></i>
        </button>

        <h2>Contáctanos</h2>
        <p className="modal-subtitle">Estamos aquí para ayudarte</p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="nombre">Nombre completo</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              required
              placeholder="Tu nombre"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="tu@email.com"
            />
          </div>

          <div className="form-group">
            <label htmlFor="rfc">RFC (Opcional)</label>
            <input
              type="text"
              id="rfc"
              name="rfc"
              value={formData.rfc}
              onChange={handleChange}
              placeholder="XAXX010101000"
            />
          </div>

          <div className="form-group">
            <label htmlFor="servicio">Servicio de interés</label>
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

          <div className="form-group">
            <label htmlFor="mensaje">Mensaje</label>
            <textarea
              id="mensaje"
              name="mensaje"
              value={formData.mensaje}
              onChange={handleChange}
              required
              rows="4"
              placeholder="¿En qué podemos ayudarte?"
            ></textarea>
          </div>

          <button type="submit" className="submit-button">
            Enviar mensaje
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactModal;
