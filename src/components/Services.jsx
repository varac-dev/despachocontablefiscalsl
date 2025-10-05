import { useState, useEffect, useRef } from 'react';
import './Services.css';

const Services = ({ onContactClick }) => {
  const [selectedService, setSelectedService] = useState(null);
  const [modalService, setModalService] = useState(null);
  const [showContactForm, setShowContactForm] = useState(false);
  const [visibleItems, setVisibleItems] = useState(new Set());
  const itemRefs = useRef({});

  // Estado del formulario de contacto
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    rfc: '',
    mensaje: ''
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const itemId = entry.target.dataset.itemId;
            setVisibleItems((prev) => new Set([...prev, itemId]));
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    Object.values(itemRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  // Datos completos de servicios basados en contenido-sitio-web-v2.json
  const servicesData = [
    {
      id: 'personas-morales',
      nombre: 'Contabilidad General - Personas Morales',
      tipo: 'destacado',
      etiqueta: 'Más Popular',
      icon: 'fa-building',
      descripcion: 'Servicio mensual completo para empresas que buscan cumplimiento total y claridad financiera',
      incluye: [
        'Contabilidad electrónica',
        'Presentación de declaraciones por obligaciones fiscales ante el SAT (pagos provisionales y mensuales de ISR e IVA)',
        'Presentación de la declaración Anual y sus informativas',
        'Presentación de la declaración de Retenciones de ISR por salarios y asimilados a salarios',
        'Impuesto de la Retención de ISR por salarios al Estado',
        'Presentación de la Declaración Informativa de Operaciones con Terceros (DIOT)',
        'Entero de retenciones de IVA Mensual',
        'Entero de retención de ISR por servicios profesionales',
        'Entero mensual de retenciones de ISR de ingresos por arrendamiento',
        'Asesoría laboral y de Seguro Social',
        'Asesoría especializada',
        'Alta Patronal en el Subdelegación',
        'Manejo integral del Seguro Social (altas, bajas y modificaciones)',
        'Cálculo del Salario Base de Cotización',
        'Estados financieros',
        'Control Interno y archivo documental',
        'Administración del buzón tributario',
        'Asesoría del timbrado de facturación y nóminas',
        'Asesoría y orientación fiscal, financiera y de seguridad social',
        'Asesoría presencial y/o telefónica ante cualquier duda o aclaración',
        'Atención a revisiones y/o invitaciones del SAT'
      ],
      beneficios: [
        'Visibilidad financiera completa mensual',
        'Control interno robusto',
        'Cumplimiento total de obligaciones fiscales y laborales',
        'Gestión integral de retenciones e impuestos'
      ]
    },
    {
      id: 'personas-fisicas',
      nombre: 'Contabilidad General - Personas Físicas',
      tipo: 'destacado',
      icon: 'fa-user-tie',
      descripcion: 'Servicio mensual diseñado para profesionistas, emprendedores y personas con actividad profesional o empresarial',
      incluye: [
        'Presentación de declaraciones por obligaciones fiscales ante el SAT (pagos provisionales y mensuales de ISR e IVA)',
        'Presentación de la declaración Anual',
        'Presentación de la declaración de Retenciones de ISR por salarios y asimilados a salarios',
        'Impuesto de la Retención de ISR por salarios al Estado',
        'Presentación de la Declaración Informativa de Operaciones con Terceros (DIOT)',
        'Asesoría laboral y de Seguro Social',
        'Asesoría especializada',
        'Alta Patronal en el Subdelegación',
        'Manejo integral del Seguro Social (altas, bajas y modificaciones)',
        'Cálculo del Salario Base de Cotización',
        'Administración del buzón tributario',
        'Asesoría en deducciones autorizadas',
        'Asesoría y orientación fiscal, financiera y de seguridad social',
        'Asesoría presencial y/o telefónica ante cualquier duda o aclaración',
        'Atención a revisiones y/o invitaciones del SAT'
      ],
      beneficios: [
        'Cumplimiento total de obligaciones fiscales',
        'Optimización de deducciones autorizadas',
        'Tranquilidad ante revisiones del SAT',
        'Gestión integral del Seguro Social'
      ]
    },
    {
      id: 'auditoria-defensa',
      nombre: 'Auditoría y Defensa Fiscal',
      tipo: 'especializado',
      icon: 'fa-shield-alt',
      descripcion: 'Revisión y respaldo legal frente a auditorías e incidencias fiscales con el SAT, IMSS e INFONAVIT',
      incluye: [
        'Auditorías internas y externas',
        'Revisión de declaraciones e inconsistencias',
        'Atención a requerimientos y cartas invitación',
        'Contestación de revisiones electrónicas',
        'Defensa y representación legal del contribuyente',
        'Auditoría en Seguro Social'
      ],
      beneficios: [
        'Detección temprana de riesgos fiscales',
        'Protección legal ante el SAT',
        'Reducción de multas y recargos',
        'Respaldo profesional en revisiones'
      ]
    },
    {
      id: 'regularizacion',
      nombre: 'Paquete de Regularización Fiscal',
      tipo: 'especializado',
      icon: 'fa-check-double',
      descripcion: 'Ideal para ponerse al corriente con el SAT y recuperar tranquilidad financiera, evitando multas',
      incluye: [
        'Diagnóstico fiscal completo',
        'Corrección de declaraciones omitidas o erróneas',
        'Actualización de obligaciones en RFC',
        'Regularización de facturación CFDI y nómina',
        'Gestión de opinión de cumplimiento positiva'
      ],
      beneficios: [
        'Recuperación del cumplimiento fiscal',
        'Evitar sanciones y multas',
        'Obtención de opinión positiva del SAT',
        'Paz mental y seguridad jurídica'
      ]
    },
    {
      id: 'consultoria',
      nombre: 'Consultoría Especializada',
      tipo: 'premium',
      icon: 'fa-lightbulb',
      descripcion: 'Blindaje fiscal y protección patrimonial con estrategias a la medida',
      incluye: [
        'Planeación fiscal personalizada',
        'Protección de bienes personales y empresariales',
        'Diseño de estructuras fiscales (holding, fideicomisos)',
        'Estrategias de optimización de impuestos conforme la ley',
        'Consultoría en sucesión patrimonial y herencias'
      ],
      beneficios: [
        'Protección patrimonial integral',
        'Optimización tributaria legal',
        'Estructuras fiscales eficientes',
        'Planeación sucesoria segura'
      ]
    },
    {
      id: 'nominas',
      nombre: 'Nóminas',
      tipo: 'operativo',
      icon: 'fa-users-cog',
      descripcion: 'Procesamiento completo de nómina con cumplimiento total de obligaciones laborales y fiscales',
      incluye: [
        'Cálculo exacto de sueldos y prestaciones',
        'Timbrado CFDI de nómina',
        'Cálculo de prestaciones de ley',
        'Cumplimiento integral IMSS',
        'Cálculo y gestión de finiquitos'
      ],
      beneficios: [
        'Eliminación de errores en nómina',
        'Cumplimiento laboral total',
        'Empleados satisfechos',
        'Ahorro de tiempo administrativo'
      ]
    }
  ];

  const gridItems = [
    // Item 0: Contabilidad General - Personas Morales (Más Popular)
    {
      id: 0,
      type: 'service',
      serviceId: 'personas-morales',
      featured: true
    },
    // Item 1: Métrica
    {
      id: 1,
      type: 'metric',
      number: '100+',
      label: 'Clientes Activos',
      icon: 'fa-users'
    },
    // Item 2: Métrica
    {
      id: 2,
      type: 'metric',
      number: '40+',
      label: 'Años Experiencia',
      icon: 'fa-award'
    },
    // Item 3: Contabilidad General - Personas Físicas
    {
      id: 3,
      type: 'service',
      serviceId: 'personas-fisicas',
      featured: false
    },
    // Item 4: Métrica
    {
      id: 4,
      type: 'metric',
      number: '5K+',
      label: 'Registros/Mes',
      icon: 'fa-file-alt'
    },
    // Item 5: Métrica
    {
      id: 5,
      type: 'metric',
      number: 'Lun-Vie',
      label: 'Atención',
      icon: 'fa-headset'
    },
    // Item 6: Métrica
    {
      id: 6,
      type: 'metric',
      number: '98%',
      label: 'Tasa Éxito',
      icon: 'fa-chart-line'
    },
    // Item 7: Métrica
    {
      id: 7,
      type: 'metric',
      number: '100%',
      label: 'Ahorro Fiscal',
      icon: 'fa-piggy-bank'
    },
    // Item 11: Métrica
    {
      id: 11,
      type: 'metric',
      number: '100%',
      label: 'Cumplimiento',
      icon: 'fa-balance-scale'
    },
    // Item 12: Auditoría y Defensa Fiscal
    {
      id: 12,
      type: 'service',
      serviceId: 'auditoria-defensa',
      featured: false
    },
    // Item 13: Métrica
    {
      id: 13,
      type: 'metric',
      number: '1K+',
      label: 'Nóminas/Mes',
      icon: 'fa-receipt'
    },
    // Item 14: Métrica
    {
      id: 14,
      type: 'metric',
      number: '< 24hrs',
      label: 'Tiempo Respuesta',
      icon: 'fa-clock'
    },
    // Item 15: Nóminas
    {
      id: 15,
      type: 'service',
      serviceId: 'nominas',
      featured: false
    },
    // Item 16: Métrica
    {
      id: 16,
      type: 'metric',
      number: '5K+',
      label: 'Declaraciones/Año',
      icon: 'fa-file-invoice'
    },
    // Item 17: Métrica
    {
      id: 17,
      type: 'metric',
      number: '100+',
      label: 'Casos Resueltos',
      icon: 'fa-check-circle'
    },
    // Item 19: Métrica
    {
      id: 19,
      type: 'metric',
      number: '85%',
      label: 'Eficiencia Fiscal',
      icon: 'fa-percentage'
    },
    // Item 20: Consultoría Especializada
    {
      id: 20,
      type: 'service',
      serviceId: 'consultoria',
      featured: false
    },
    // Item 21: Métrica
    {
      id: 21,
      type: 'metric',
      number: '50+',
      label: 'Auditorías/Año',
      icon: 'fa-search'
    },
    // Item 23: Métrica
    {
      id: 23,
      type: 'metric',
      number: '95%',
      label: 'Satisfacción',
      icon: 'fa-smile'
    },
    // Item 24: Paquete de Regularización Fiscal
    {
      id: 24,
      type: 'service',
      serviceId: 'regularizacion',
      featured: false
    },
    // Item 25: Métrica
    {
      id: 25,
      type: 'metric',
      number: '10+',
      label: 'Especialistas',
      icon: 'fa-user-tie'
    },
    // Item 26: Info Card - Experiencia
    {
      id: 26,
      type: 'info',
      icon: 'fa-calendar-alt',
      title: '40+ Años',
      description: 'De experiencia en el sector contable y fiscal'
    },
    // Item 27: Info Card - Especialización
    {
      id: 27,
      type: 'info',
      icon: 'fa-award',
      title: 'Especialización',
      description: 'En defensa fiscal y cumplimiento tributario'
    },
    // Item 28: Métrica
    {
      id: 28,
      type: 'metric',
      number: '50K+',
      label: 'Documentos/Año',
      icon: 'fa-file-alt'
    },
    // Item 29: Info Card - Clientes
    {
      id: 29,
      type: 'info',
      icon: 'fa-users',
      title: 'Decenas de Clientes',
      description: 'Personas físicas, profesionistas y PYMES atendidas'
    },
    // Item 30: Info Card - Confianza
    {
      id: 30,
      type: 'info',
      icon: 'fa-handshake',
      title: 'Confianza',
      description: 'Clientes que permanecen con nosotros durante años'
    }
  ];

  const handleOpenModal = (serviceId) => {
    const service = servicesData.find(s => s.id === serviceId);
    if (service) {
      setModalService(service);
      document.body.style.overflow = 'hidden';
    }
  };

  const handleCloseModal = () => {
    setModalService(null);
    setShowContactForm(false);
    setFormData({
      nombre: '',
      email: '',
      rfc: '',
      mensaje: ''
    });
    document.body.style.overflow = 'unset';
  };

  const handleModalContactClick = () => {
    setShowContactForm(true);
  };

  const handleFormChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert('Por favor ingresa un email válido');
      return;
    }

    // Crear mensaje de WhatsApp
    let mensajeWhatsApp = `*Nueva Consulta - Despacho Contable Fiscal SL*\n\n`;
    mensajeWhatsApp += `*Nombre:* ${formData.nombre}\n`;
    mensajeWhatsApp += `*Email:* ${formData.email}\n`;
    if (formData.rfc) {
      mensajeWhatsApp += `*RFC:* ${formData.rfc}\n`;
    }
    mensajeWhatsApp += `*Servicio de interés:* ${modalService.nombre}\n`;
    if (formData.mensaje) {
      mensajeWhatsApp += `\n*Mensaje:*\n${formData.mensaje}`;
    }

    // Codificar el mensaje para URL
    const mensajeCodificado = encodeURIComponent(mensajeWhatsApp);
    const numeroWhatsApp = '527716242330';

    // Abrir WhatsApp con el mensaje
    window.open(`https://wa.me/${numeroWhatsApp}?text=${mensajeCodificado}`, '_blank');

    // Cerrar modal y resetear todo
    handleCloseModal();
  };

  const handleBackToDetails = () => {
    setShowContactForm(false);
  };

  return (
    <section id="servicios" className="services">
      <div className="container">
        {/* Section Header */}
        <div className="services-header">
          <span className="services-subtitle">Lo que ofrecemos</span>
          <h2>Nuestros Servicios</h2>
          <p>Soluciones integrales para todas tus necesidades contables y fiscales</p>
        </div>

        {/* Bento Grid */}
        <div className="bento-grid">
          {gridItems.map((item) => {
            if (item.type === 'metric') {
              return (
                <div
                  key={item.id}
                  className={`metric-card ${visibleItems.has(String(item.id)) ? 'visible' : ''}`}
                  ref={(el) => (itemRefs.current[item.id] = el)}
                  data-item-id={item.id}
                >
                  <div className="metric-icon">
                    <i className={`fas ${item.icon}`}></i>
                  </div>
                  <div className="metric-content">
                    <h3 className="metric-number">{item.number}</h3>
                    <p className="metric-label">{item.label}</p>
                  </div>
                </div>
              );
            } else if (item.type === 'info') {
              return (
                <div
                  key={item.id}
                  className={`info-card ${visibleItems.has(String(item.id)) ? 'visible' : ''}`}
                  ref={(el) => (itemRefs.current[item.id] = el)}
                  data-item-id={item.id}
                >
                  <div className="info-icon">
                    <i className={`fas ${item.icon}`}></i>
                  </div>
                  <div className="info-content">
                    <h3 className="info-title">{item.title}</h3>
                    <p className="info-description">{item.description}</p>
                  </div>
                </div>
              );
            } else if (item.type === 'service') {
              const serviceData = servicesData.find(s => s.id === item.serviceId);
              if (!serviceData) return null;

              return (
                <div
                  key={item.id}
                  className={`service-card ${item.featured ? 'featured' : ''} ${selectedService === item.id ? 'active' : ''} ${visibleItems.has(String(item.id)) ? 'visible' : ''}`}
                  onMouseEnter={() => setSelectedService(item.id)}
                  onMouseLeave={() => setSelectedService(null)}
                  ref={(el) => (itemRefs.current[item.id] = el)}
                  data-item-id={item.id}
                >
                  {serviceData.etiqueta && (
                    <div className="service-badge">{serviceData.etiqueta}</div>
                  )}

                  <div className="service-card-content">
                    <div className="service-icon">
                      <i className={`fas ${serviceData.icon}`}></i>
                    </div>

                    <div className="service-info">
                      <h3>{serviceData.nombre}</h3>
                      <p className="service-description">{serviceData.descripcion}</p>

                      <ul className="benefits-list">
                        {serviceData.beneficios.slice(0, 4).map((benefit, idx) => (
                          <li key={idx}>
                            <i className="fas fa-check-circle"></i>
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="service-cta">
                    <button
                      className="service-cta-button"
                      onClick={() => handleOpenModal(item.serviceId)}
                    >
                      Más Información
                      <i className="fas fa-arrow-right"></i>
                    </button>
                  </div>
                </div>
              );
            }
            return null;
          })}
        </div>
      </div>

      {/* Modal de Servicio */}
      {modalService && (
        <div className="service-modal-overlay" onClick={handleCloseModal}>
          <div className="service-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={handleCloseModal}>
              <i className="fas fa-times"></i>
            </button>

            {!showContactForm ? (
              // Vista de detalles del servicio
              <>
                <div className="modal-header">
                  <div className="modal-icon">
                    <i className={`fas ${modalService.icon}`}></i>
                  </div>
                  <h2>{modalService.nombre}</h2>
                  {modalService.etiqueta && (
                    <span className="modal-badge">{modalService.etiqueta}</span>
                  )}
                </div>

                <div className="modal-body">
                  <p className="modal-description">{modalService.descripcion}</p>

                  <div className="modal-section">
                    <h3>
                      <i className="fas fa-check-square"></i>
                      ¿Qué incluye este servicio?
                    </h3>
                    <ul className="modal-includes-list">
                      {modalService.incluye.map((item, idx) => (
                        <li key={idx}>
                          <i className="fas fa-chevron-right"></i>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="modal-section">
                    <h3>
                      <i className="fas fa-star"></i>
                      Beneficios principales
                    </h3>
                    <div className="modal-benefits-grid">
                      {modalService.beneficios.map((benefit, idx) => (
                        <div key={idx} className="benefit-card">
                          <i className="fas fa-check-circle"></i>
                          <span>{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="modal-type-badge">
                    Tipo de servicio: <span>{modalService.tipo}</span>
                  </div>
                </div>

                <div className="modal-footer">
                  <button
                    className="modal-cta-button primary"
                    onClick={handleModalContactClick}
                  >
                    Solicitar Servicio
                    <i className="fas fa-arrow-right"></i>
                  </button>
                  <button
                    className="modal-cta-button secondary"
                    onClick={handleCloseModal}
                  >
                    Cerrar
                  </button>
                </div>
              </>
            ) : (
              // Vista del formulario de contacto
              <>
                <div className="modal-header">
                  <button className="modal-back-btn" onClick={handleBackToDetails}>
                    <i className="fas fa-arrow-left"></i>
                  </button>
                  <div className="modal-icon">
                    <i className={`fas ${modalService.icon}`}></i>
                  </div>
                  <h2>Solicitar {modalService.nombre}</h2>
                </div>

                <div className="modal-body">
                  <p className="modal-form-subtitle">
                    Complete el formulario y nos pondremos en contacto contigo en menos de 24 horas
                  </p>

                  <form onSubmit={handleFormSubmit} className="modal-contact-form">
                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="nombre">
                          <i className="fas fa-user"></i>
                          Nombre completo *
                        </label>
                        <input
                          type="text"
                          id="nombre"
                          name="nombre"
                          value={formData.nombre}
                          onChange={handleFormChange}
                          required
                          placeholder="Tu nombre completo"
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="email">
                          <i className="fas fa-envelope"></i>
                          Email *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleFormChange}
                          required
                          placeholder="tu@email.com"
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="rfc">
                        <i className="fas fa-id-card"></i>
                        RFC (Opcional)
                      </label>
                      <input
                        type="text"
                        id="rfc"
                        name="rfc"
                        value={formData.rfc}
                        onChange={handleFormChange}
                        placeholder="XAXX010101000"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="mensaje">
                        <i className="fas fa-comment-dots"></i>
                        ¿En qué podemos ayudarte?
                      </label>
                      <textarea
                        id="mensaje"
                        name="mensaje"
                        value={formData.mensaje}
                        onChange={handleFormChange}
                        rows="4"
                        placeholder="Cuéntanos sobre tu situación actual y cómo podemos ayudarte..."
                      ></textarea>
                    </div>

                    <div className="form-service-info">
                      <i className="fas fa-info-circle"></i>
                      <div>
                        <strong>Servicio seleccionado:</strong> {modalService.nombre}
                        <br />
                        <small>{modalService.descripcion}</small>
                      </div>
                    </div>

                    <div className="modal-footer">
                      <button type="submit" className="modal-cta-button primary">
                        <i className="fab fa-whatsapp"></i>
                        Enviar por WhatsApp
                      </button>
                      <button
                        type="button"
                        className="modal-cta-button secondary"
                        onClick={handleBackToDetails}
                      >
                        Volver
                      </button>
                    </div>
                  </form>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default Services;