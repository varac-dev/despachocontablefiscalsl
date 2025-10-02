import { useState } from 'react';
import './Header.css';

const Header = ({ onContactClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    closeMenu();

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
    <header>
      <nav>
        {/* Logo */}
        <div className="logo">
          <img src="/logo_blanco.png" alt="Despacho Contable Fiscal SL" />
        </div>

        {/* Desktop Menu */}
        <div className="desktop-menu">
          <ul>
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

        {/* CTA Button */}
        <button onClick={onContactClick} className="cta-button">
          Contáctanos
        </button>

        {/* Mobile Menu Toggle */}
        <div className="mobile-toggle" onClick={toggleMenu}>
          <i className="fas fa-bars"></i>
        </div>

        {/* Mobile Menu */}
        <div className={`mobile-menu ${isMenuOpen ? 'open' : ''}`}>
          <ul>
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
      </nav>
    </header>
  );
};

export default Header;
