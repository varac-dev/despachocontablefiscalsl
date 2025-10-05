import { useState, useEffect } from 'react';
import './ContactModal.css';

const ContactModal = ({ isOpen, onClose, selectedService }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    rfc: '',
    servicio: '',
    mensaje: ''
  });

  // Mapeo de nombres de servicios a valores del select
  const serviceMapping = {
    'Contabilidad General - Personas Morales': 'personas-morales',
    'Contabilidad General - Personas Físicas': 'personas-fisicas',
    'Auditoría y Defensa Fiscal': 'auditoria-defensa',
    'Paquete de Regularización Fiscal': 'regularizacion',
    'Consultoría Especializada': 'consultoria',
    'Nóminas': 'nominas'
  };

  // Actualizar el servicio seleccionado cuando se reciba uno nuevo
  useEffect(() => {
    if (selectedService && serviceMapping[selectedService]) {
      setFormData(prev => ({
        ...prev,
        servicio: serviceMapping[selectedService]
      }));
    }
  }, [selectedService]);

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
      'personas-morales': 'Contabilidad General - Personas Morales',
      'personas-fisicas': 'Contabilidad General - Personas Físicas',
      'auditoria-defensa': 'Auditoría y Defensa Fiscal',
      'regularizacion': 'Paquete de Regularización Fiscal',
      'consultoria': 'Consultoría Especializada',
      'nominas': 'Nóminas'
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
              <option value="personas-morales">Contabilidad General - Personas Morales</option>
              <option value="personas-fisicas">Contabilidad General - Personas Físicas</option>
              <option value="auditoria-defensa">Auditoría y Defensa Fiscal</option>
              <option value="regularizacion">Paquete de Regularización Fiscal</option>
              <option value="consultoria">Consultoría Especializada</option>
              <option value="nominas">Nóminas</option>
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
