import { useEffect, useRef, useState } from 'react';
import './About.css';
import ContactModal from './ContactModal';

const About = () => {
  const [visibleSections, setVisibleSections] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const sectionRefs = useRef([]);

  useEffect(() => {
    // Ajustar threshold y rootMargin para móviles
    const isMobile = window.innerWidth <= 480;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionId = entry.target.dataset.sectionId;
            setVisibleSections((prev) => [...new Set([...prev, sectionId])]);
          }
        });
      },
      {
        threshold: isMobile ? 0.1 : 0.3,
        rootMargin: isMobile ? '0px' : '-100px'
      }
    );

    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const values = [
    {
      icon: 'fa-balance-scale',
      title: 'Ética Profesional',
      description: 'Cumplimiento estricto de normas fiscales y transparencia absoluta'
    },
    {
      icon: 'fa-heart',
      title: 'Compromiso',
      description: 'Enfoque personalizado en el beneficio de cada cliente'
    },
    {
      icon: 'fa-shield-alt',
      title: 'Responsabilidad',
      description: 'Entregas puntuales y seguimiento constante de tus obligaciones'
    },
    {
      icon: 'fa-users',
      title: 'Cercanía',
      description: 'Comunicación directa, trato humano y accesibilidad'
    },
    {
      icon: 'fa-graduation-cap',
      title: 'Actualización',
      description: 'Capacitación continua en normativas fiscales vigentes'
    },
    {
      icon: 'fa-lightbulb',
      title: 'Innovación',
      description: 'Soluciones fiscales creativas y eficientes adaptadas a cada negocio'
    }
  ];

  return (
    <section id="nosotros" className="about">
      {/* Profile Showcase */}
      <div
        className={`about-profile-showcase ${visibleSections.includes('profile') ? 'visible' : ''}`}
        ref={(el) => (sectionRefs.current[0] = el)}
        data-section-id="profile"
      >
        <div className="container">
          <div className="profile-showcase-grid">
            <div className="profile-showcase-image">
              <img
                src="/Soraida-8copia.jpg"
                alt="Soraida Nicole - Contadora Fiscal Certificada"
              />
            </div>
            <div className="profile-showcase-content">
              <h3>Soraida Nicole</h3>
              <p className="profile-title">Contadora Fiscal Certificada</p>
              <p className="profile-description">
                Especialista en contabilidad fiscal, defensa ante el SAT, auditorías y cumplimiento tributario.
                Con más de cuatro décadas de experiencia, ha construido un legado de confianza protegiendo
                el patrimonio de cientos de clientes.
              </p>
              <div className="profile-stats">
                <div className="stat-item">
                  <span className="stat-number">40+</span>
                  <span className="stat-label">Años</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">500+</span>
                  <span className="stat-label">Clientes</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">98%</span>
                  <span className="stat-label">Éxito</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mission Statement */}
      <div
        className={`about-mission ${visibleSections.includes('mission') ? 'visible' : ''}`}
        ref={(el) => (sectionRefs.current[1] = el)}
        data-section-id="mission"
      >
        <div className="container">
          <div className="mission-content">
            <h3>Asesoría estratégica que protege y hace crecer tu patrimonio.</h3>
            <p>
              Somos un despacho contable especializado en servicios fiscales, auditorías y defensa tributaria.
              Brindamos soluciones personalizadas para personas físicas, profesionistas independientes y PYMES,
              asegurando legalmente la protección y el crecimiento del patrimonio de nuestros clientes.
            </p>
          </div>
        </div>
      </div>

      {/* Values Showcase - Apple Style Cards */}
      <div
        className={`about-values ${visibleSections.includes('values') ? 'visible' : ''}`}
        ref={(el) => (sectionRefs.current[2] = el)}
        data-section-id="values"
      >
        <div className="container">
          <h3 className="values-title">Nuestros valores</h3>
          <div className="values-showcase-grid">
            {values.map((value, index) => (
              <div
                key={index}
                className="value-showcase-card"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="value-icon-wrapper">
                  <i className={`fas ${value.icon}`}></i>
                </div>
                <h4>{value.title}</h4>
                <p>{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Clients Section */}
      <div
        className={`about-clients ${visibleSections.includes('clients') ? 'visible' : ''}`}
        ref={(el) => (sectionRefs.current[3] = el)}
        data-section-id="clients"
      >
        <div className="container">
          <div className="clients-content">
            <h3>Para quienes trabajamos</h3>
            <div className="clients-grid">
              <div className="client-type">
                <i className="fas fa-user"></i>
                <h4>Personas Físicas</h4>
                <p>Cumplimiento fiscal y optimización tributaria personalizada</p>
              </div>
              <div className="client-type">
                <i className="fas fa-briefcase"></i>
                <h4>Profesionistas</h4>
                <p>Soluciones especializadas para actividades profesionales</p>
              </div>
              <div className="client-type">
                <i className="fas fa-building"></i>
                <h4>PYMES</h4>
                <p>Servicios contables integrales para tu empresa</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
};

export default About;
