import './Testimonials.css';

const Testimonials = () => {
  const stats = [
    {
      icon: 'fa-calendar-alt',
      title: '40+ Años',
      description: 'De experiencia en el sector contable y fiscal'
    },
    {
      icon: 'fa-users',
      title: 'Decenas de Clientes',
      description: 'Personas físicas, profesionistas y PYMES atendidas'
    },
    {
      icon: 'fa-award',
      title: 'Especialización',
      description: 'En defensa fiscal y cumplimiento tributario'
    },
    {
      icon: 'fa-handshake',
      title: 'Confianza',
      description: 'Clientes que permanecen con nosotros durante años'
    }
  ];

  return (
    <section className="testimonials">
      <div className="container">
        {/* Section Header */}
        <div className="testimonials-header">
          <h2>Nuestra Experiencia Habla</h2>
          <p>Más de 40 años construyendo confianza</p>
        </div>

        {/* Stats Grid */}
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div key={index} className="stat-card">
              <div className="stat-icon">
                <i className={`fas ${stat.icon}`}></i>
              </div>
              <h3>{stat.title}</h3>
              <p>{stat.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
