import { useState, useEffect, useRef } from 'react';
import './Services.css';

const Services = ({ onContactClick }) => {
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

  const gridItems = [
    // Item 0: Paquete Contabilidad Integral
    {
      id: 0,
      type: 'service',
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
    // Item 3: Contabilidad General (CENTRADO)
    {
      id: 3,
      type: 'service',
      icon: 'fa-calculator',
      title: 'Contabilidad General',
      description: 'Registro, clasificación y análisis de todas las operaciones financieras conforme a las NIF.',
      benefits: [
        'Estados financieros mensuales',
        'Conciliaciones bancarias',
        'Reportes para decisiones',
        'Control de activos'
      ],
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
    // Item 12: Servicios Fiscales
    {
      id: 12,
      type: 'service',
      icon: 'fa-file-invoice-dollar',
      title: 'Servicios Fiscales',
      description: 'Asesoría y ejecución en el cumplimiento de todas tus obligaciones tributarias.',
      benefits: [
        'Declaraciones mensuales',
        'Planeación fiscal',
        'Defensa ante SAT',
        'Optimización tributaria'
      ],
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
      icon: 'fa-users-cog',
      title: 'Nóminas',
      description: 'Procesamiento completo de nómina con cálculo exacto de sueldos y prestaciones.',
      benefits: [
        'Timbrado CFDI',
        'Cálculo prestaciones',
        'Cumplimiento IMSS',
        'Finiquitos'
      ],
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
    // Item 20: Consultoría
    {
      id: 20,
      type: 'service',
      icon: 'fa-lightbulb',
      title: 'Consultoría Especializada',
      description: 'Asesoría personalizada desde altas ante el SAT hasta reestructuración fiscal.',
      benefits: [
        'Diagnóstico integral',
        'Estrategias personalizadas',
        'Acompañamiento continuo',
        'Reestructuración'
      ],
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
    // Item 24: Auditorías
    {
      id: 24,
      type: 'service',
      icon: 'fa-search-dollar',
      title: 'Auditorías',
      description: 'Auditorías preventivas y correctivas para detectar riesgos antes de revisiones externas.',
      benefits: [
        'Revisión contable',
        'Matrices de riesgo',
        'Recomendaciones',
        'Seguimiento'
      ],
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
    // Item 26: Info Card - Experiencia (Fila 10)
    {
      id: 26,
      type: 'info',
      icon: 'fa-calendar-alt',
      title: '40+ Años',
      description: 'De experiencia en el sector contable y fiscal'
    },
    // Item 27: Info Card - Especialización (Fila 10)
    {
      id: 27,
      type: 'info',
      icon: 'fa-award',
      title: 'Especialización',
      description: 'En defensa fiscal y cumplimiento tributario'
    },
    // Item 28: Métrica (Fila 11)
    {
      id: 28,
      type: 'metric',
      number: '50K+',
      label: 'Documentos/Año',
      icon: 'fa-file-alt'
    },
    // Item 29: Info Card - Clientes (Fila 12)
    {
      id: 29,
      type: 'info',
      icon: 'fa-users',
      title: 'Decenas de Clientes',
      description: 'Personas físicas, profesionistas y PYMES atendidas'
    },
    // Item 30: Info Card - Confianza (Fila 12)
    {
      id: 30,
      type: 'info',
      icon: 'fa-handshake',
      title: 'Confianza',
      description: 'Clientes que permanecen con nosotros durante años'
    }
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
            } else {
              return (
                <div
                  key={item.id}
                  className={`service-card ${item.featured ? 'featured' : ''} ${selectedService === item.id ? 'active' : ''} ${visibleItems.has(String(item.id)) ? 'visible' : ''}`}
                  onMouseEnter={() => setSelectedService(item.id)}
                  onMouseLeave={() => setSelectedService(null)}
                  ref={(el) => (itemRefs.current[item.id] = el)}
                  data-item-id={item.id}
                >
                  {item.badge && (
                    <div className="service-badge">{item.badge}</div>
                  )}

                  <div className="service-card-content">
                    <div className="service-icon">
                      <i className={`fas ${item.icon}`}></i>
                    </div>

                    <div className="service-info">
                      <h3>{item.title}</h3>
                      <p className="service-description">{item.description}</p>

                      <ul className="benefits-list">
                        {item.benefits.map((benefit, idx) => (
                          <li key={idx}>
                            <i className="fas fa-check-circle"></i>
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="service-cta">
                    <button className="service-cta-button" onClick={onContactClick}>
                      {item.featured ? 'Solicitar Información' : 'Más Información'}
                      <i className="fas fa-arrow-right"></i>
                    </button>
                  </div>
                </div>
              );
            }
          })}
        </div>
        
      </div>
    </section>
  );
};

export default Services;
