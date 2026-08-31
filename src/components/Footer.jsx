import './Footer.css';

const Footer = () => {
  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    const target = document.querySelector(targetId);
    if (target) {
      const headerHeight = 70;
      const targetPosition = target.offsetTop - headerHeight;
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <footer>
      <div className="container">
        {/* Footer Content */}
        <div className="footer-content">
          {/* Company Info */}
          <div className="footer-section">
            <h3>Despacho Contable Fiscal SL</h3>
            <p>Confianza y experiencia fiscal a tu servicio desde hace más de 40 años.</p>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h4>Enlaces Rápidos</h4>
            <ul className="footer-links">
              <li>
                <a href="#inicio" onClick={(e) => handleNavClick(e, '#inicio')}>
                  Inicio
                </a>
              </li>
              <li>
                <a href="#nosotros" onClick={(e) => handleNavClick(e, '#nosotros')}>
                  Nosotros
                </a>
              </li>
              <li>
                <a href="#servicios" onClick={(e) => handleNavClick(e, '#servicios')}>
                  Servicios
                </a>
              </li>
              <li>
                <a href="#contacto" onClick={(e) => handleNavClick(e, '#contacto')}>
                  Contacto
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="footer-section">
            <h4>Síguenos</h4>
            <div className="social-links">
              <a
                href="https://www.instagram.com/despachocontablefiscalSL"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-instagram"></i>
              </a>
              <a
                href="https://www.facebook.com/DespachoContableFiscalSL"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-facebook"></i>
              </a>
              <a
                href="https://www.tiktok.com/@despachocontablefiscalsl"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-tiktok"></i>
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div className="footer-section">
            <h4>Contacto</h4>
            <p>771 624 2330</p>
            <p>contabilidadfiscal@hotmail.com</p>
          </div>
        </div>

        {/* Cobertura nacional: enlaces a las landings por ciudad (SEO interlinking) */}
        <div className="footer-cities">
          <h4>Despacho contable en tu ciudad</h4>
          <p>
            <a href="/despacho-contable-en-cdmx">Ciudad de México</a> ·{' '}
            <a href="/despacho-contable-en-puebla">Puebla</a> ·{' '}
            <a href="/despacho-contable-en-tijuana">Tijuana</a> ·{' '}
            <a href="/despacho-contable-en-monterrey">Monterrey</a> ·{' '}
            <a href="/despacho-contable-en-queretaro">Querétaro</a> ·{' '}
            <a href="/despacho-contable-en-estado-de-mexico">Estado de México</a> ·{' '}
            <a href="/despacho-contable-en-guadalajara">Guadalajara</a> ·{' '}
            <a href="/despacho-contable-en-cancun">Cancún</a> ·{' '}
            <a href="/despacho-contable-en-merida">Mérida</a>
          </p>
          <p className="footer-servicios">
            <strong>Servicios:</strong>{' '}
            <a href="/regularizacion-fiscal-sat">Regularización Fiscal ante el SAT</a> ·{' '}
            <a href="/declaraciones-fiscales">Declaraciones Mensuales y Anuales</a> ·{' '}
            <a href="/defensa-fiscal">Defensa Fiscal y Auditorías</a> ·{' '}
            <a href="/contabilidad-pymes">Contabilidad para PyMEs y Profesionistas</a>
          </p>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <p>&copy; 2025 Despacho Contable Fiscal SL. Todos los derechos reservados.</p>
          <div className="footer-legal">
            <a href="#aviso-legal">Aviso Legal</a>
            <a href="/aviso-de-privacidad">Política de Privacidad</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
