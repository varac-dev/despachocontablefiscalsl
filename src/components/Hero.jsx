import { useEffect, useState } from 'react';
import './Hero.css';

const Hero = ({ onContactClick }) => {
  const [typedText, setTypedText] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const fullText = 'Más de 40 años\nprotegiendo tu patrimonio.';

  useEffect(() => {
    // Hacer visible el hero inmediatamente
    setIsVisible(true);

    // Typing effect
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setTypedText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
      }
    }, 50);

    return () => clearInterval(typingInterval);
  }, []);

  return (
    <section id="inicio" className="hero">
      <div className={`hero-container ${isVisible ? 'visible' : ''}`}>
        <div className="hero-content">
          <h1 className="hero-title">
            <span className="typing-text">
              {typedText.split('\n').map((line, index) => (
                <span key={index}>
                  {line}
                  {index === 0 && typedText.includes('\n') && <br />}
                </span>
              ))}
              {typedText.length < fullText.length && <span className="typing-cursor">|</span>}
            </span>
          </h1>
          <p className="hero-subtitle">
            Excelencia fiscal que genera confianza.
          </p>
          <button className="hero-cta-button" onClick={onContactClick}>
            Contáctanos
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
