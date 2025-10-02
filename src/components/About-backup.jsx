import './About.css';

const About = () => {
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
    }
  ];

  return (
    <section id="nosotros" className="about">
      <div className="container">
        {/* Section Header */}
        <div className="about-header">
          <h2>Quiénes Somos</h2>
          <p>Más de 40 años construyendo confianza y protegiendo tu patrimonio</p>
        </div>

        {/* Content */}
        <div className="about-content">
          {/* Text Content */}
          <div>
            <p className="about-text">
              Somos un despacho contable especializado en servicios fiscales, auditorías y defensa tributaria con más de 40 años de experiencia. Fundado por especialistas comprometidos con la excelencia fiscal, brindamos asesoría estratégica, defensa ante el SAT y servicios contables integrales para asegurar legalmente la protección y el crecimiento del patrimonio de nuestros clientes.
            </p>
            <p className="about-text">
              Atendemos a personas físicas, profesionistas independientes y PYMES, ofreciendo soluciones personalizadas que se adaptan a las necesidades específicas de cada cliente. Nuestra especialización en cumplimiento tributario y defensa fiscal nos ha permitido construir relaciones de largo plazo basadas en resultados y confianza.
            </p>

            {/* Values Grid */}
            <div className="values-grid">
              {values.map((value, index) => (
                <div key={index} className="value-card">
                  <i className={`fas ${value.icon}`}></i>
                  <h4>{value.title}</h4>
                  <p>{value.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Profile Card */}
          <div className="profile-wrapper">
            <div className="profile-card">
              <img
                src="/Soraida-8copia.jpg"
                alt="Soraida Nicole - Contadora Fiscal Certificada"
                className="profile-image"
              />
              <h3>Soraida Nicole</h3>
              <p className="role">Contadora Fiscal Certificada</p>
              <p className="description">
                Más de 40 años de experiencia especializada en contabilidad fiscal, defensa ante el SAT, auditorías y cumplimiento tributario.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
