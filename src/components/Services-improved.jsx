import { useState, useEffect, useRef } from 'react';
import './Services.css';

const Services = () => {
  const [selectedService, setSelectedService] = useState(null);
  const [visibleItems, setVisibleItems] = useState(new Set());
  const itemRefs = useRef({});

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

  // Servicios principales (solo 5)
  const services = [
    {
      id: 'integral',
      icon: 'fa-star',
      title: 'Paquete Contabilidad Integral',
      description: 'Servicio mensual completo que incluye contabilidad, declaraciones y asesoría fiscal básica.',
      benefits: [
        'Registro de operaciones',
        'Estados financieros mensuales',
        'Declaraciones al día',
        'Asesoría fiscal incluida'
      ],
      featured: true,
      badge: 'Más Popular'
    },
    {
      id: 'contabilidad',
      icon: 'fa-calculator',
      title: 'Contabilidad General',
      description: 'Registro, clasificación y análisis de todas las operaciones financieras conforme a las NIF.',
      benefits: [
        'Estados financieros mensuales',
        'Conciliaciones bancarias',
        'Reportes para decisiones',
        'Control de activos'
      ]
    },
    {
      id: 'fiscal',
      icon: 'fa-file-invoice-dollar',
      title: 'Servicios Fiscales',
      description: 'Asesoría y ejecución en el cumplimiento de todas tus obligaciones tributarias.',
      benefits: [
        'Declaraciones mensuales',
        'Planeación fiscal',
        'Defensa ante SAT',
        'Optimización tributaria'
      ]
    },
    {
      id: 'nominas',
      icon: 'fa-users-cog',
      title: 'Nóminas',
      description: 'Procesamiento completo de nómina con cálculo exacto de sueldos y prestaciones.',
      benefits: [
        'Timbrado CFDI',
        'Cálculo prestaciones',
        'Cumplimiento IMSS',
        'Finiquitos'
      ]
    },
    {
      id: 'consultoria',
      icon: 'fa-lightbulb',
      title: 'Consultoría Especializada',
      description: 'Asesoría personalizada desde altas ante el SAT hasta reestructuración fiscal.',
      benefits: [
        'Diagnóstico integral',
        'Estrategias personalizadas',
        'Acompañamiento continuo',
        'Reestructuración'
      ]
    }
  ];

  // Solo 4 métricas clave
  const keyMetrics = [
    { icon: 'fa-users', number: '500+', label: 'Clientes Activos' },
    { icon: 'fa-award', number: '40', label: 'Años Experiencia' },
    { icon: 'fa-chart-line', number: '98%', label: 'Satisfacción' },
    { icon: 'fa-clock', number: '24/7', label: 'Soporte' }
  ];

  return (
    <section id="servicios" className="services">
      <div className="container">
        {/* Section Header */}
        <div className="services-header">
          <span className="services-subtitle">Lo que ofrecemos</span>
          <h2>Nuestros Servicios</h2>
          <p>Soluciones integrales para todas tus necesidades contables y fiscales</p>
        </div>

        {/* Key Metrics - Horizontal Strip */}
        <div className="metrics-strip">
          {keyMetrics.map((metric, index) => (
            <div
              key={index}
              className={`metric-item ${visibleItems.has(`metric-${index}`) ? 'visible' : ''}`}
              ref={(el) => (itemRefs.current[`metric-${index}`] = el)}
              data-item-id={`metric-${index}`}
            >
              <i className={`fas ${metric.icon}`}></i>
              <div>
                <strong>{metric.number}</strong>
                <span>{metric.label}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Services Grid */}
        <div className="services-grid">
          {services.map((service, index) => (
            <div
              key={service.id}
              className={`service-card ${service.featured ? 'featured' : ''} ${selectedService === service.id ? 'active' : ''} ${visibleItems.has(service.id) ? 'visible' : ''}`}
              onMouseEnter={() => setSelectedService(service.id)}
              onMouseLeave={() => setSelectedService(null)}
              ref={(el) => (itemRefs.current[service.id] = el)}
              data-item-id={service.id}
            >
              {service.badge && (
                <div className="service-badge">{service.badge}</div>
              )}

              <div className="service-card-content">
                <div className="service-icon">
                  <i className={`fas ${service.icon}`}></i>
                </div>

                <div className="service-info">
                  <h3>{service.title}</h3>
                  <p className="service-description">{service.description}</p>

                  <ul className="benefits-list">
                    {service.benefits.map((benefit, idx) => (
                      <li key={idx}>
                        <i className="fas fa-check-circle"></i>
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="service-cta">
                <button className="service-cta-button">
                  {service.featured ? 'Solicitar Información' : 'Más Información'}
                  <i className="fas fa-arrow-right"></i>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="services-footer">
          <div className="services-footer-content">
            <h3>¿No encuentras lo que buscas?</h3>
            <p>Podemos crear un paquete personalizado adaptado a tus necesidades específicas</p>
            <button className="services-contact-button">
              <i className="fas fa-comments"></i>
              Contacta con un Asesor
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;