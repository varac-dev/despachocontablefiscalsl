import { useState } from 'react';
import './RedesSociales.css';

const REELS = [
  {
    code: 'DVKXWsbju7F',
    cover: '/redes/cover_DVKXWsbju7F.jpg',
    caption: '📢 ¡Ya inició el Programa de Regularización Fiscal 2026 del SAT!'
  },
  {
    code: 'DaoHIqUMIV1',
    cover: '/redes/cover_DaoHIqUMIV1.jpg',
    caption: '¿Y si el SAT ya detectó un error y tú aún no lo sabes? 🚨'
  },
  {
    code: 'DaoPQQtO9m4',
    cover: '/redes/cover_DaoPQQtO9m4.jpg',
    caption: '¿Estás pagando más ISR del que realmente te corresponde?'
  },
  {
    code: 'DaL-R_mO48i',
    cover: '/redes/cover_DaL-R_mO48i.jpg',
    caption: 'Pagar menos impuestos no es suerte: es estrategia fiscal'
  }
];

const TIKTOK_URL = 'https://www.tiktok.com/@despachocontablefiscalsl';
const INSTAGRAM_URL = 'https://www.instagram.com/despachocontablefiscalsl/';

const RedesSociales = () => {
  const [activeReel, setActiveReel] = useState(null);
  const [activeDot, setActiveDot] = useState(0);

  const handleScroll = (e) => {
    const el = e.currentTarget;
    const card = el.querySelector('.redes-card');
    if (!card) return;
    const idx = Math.round(el.scrollLeft / (card.offsetWidth + 16));
    setActiveDot(Math.min(idx, REELS.length - 1));
  };

  return (
    <section className="redes-sociales" id="redes">
      <div className="container">
        <div className="redes-header">
          <span className="redes-badge">Contenido que te cuida</span>
          <h2>
            Aprende fiscal con <span className="redes-gold">Soraida</span>
          </h2>
          <p>
            Tips del SAT, deducciones y blindaje fiscal en videos de 1 minuto.
            Síguenos en TikTok e Instagram.
          </p>
        </div>

        <div className="redes-carrusel" onScroll={handleScroll}>
          {REELS.map((reel) => (
            <div className="redes-card" key={reel.code}>
              <div className="redes-media">
                {activeReel === reel.code ? (
                  <iframe
                    src={`https://www.instagram.com/reel/${reel.code}/embed/`}
                    title={reel.caption}
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                    loading="lazy"
                  />
                ) : (
                  <button
                    type="button"
                    className="redes-cover"
                    onClick={() => setActiveReel(reel.code)}
                    aria-label={`Reproducir video: ${reel.caption}`}
                  >
                    <img src={reel.cover} alt={reel.caption} loading="lazy" />
                    <span className="redes-autor">
                      <span className="redes-avatar">S</span>
                      <span>
                        <b>Soraida Nicole</b>
                        <small>@despachocontablefiscalsl</small>
                      </span>
                    </span>
                    <span className="redes-play" aria-hidden="true" />
                    <span className="redes-red-badge">Instagram</span>
                  </button>
                )}
              </div>
              <p className="redes-caption">{reel.caption}</p>
            </div>
          ))}
        </div>

        <div className="redes-dots" aria-hidden="true">
          {REELS.map((reel, i) => (
            <span
              key={reel.code}
              className={i === activeDot ? 'dot dot-activo' : 'dot'}
            />
          ))}
        </div>

        <div className="redes-cta">
          <a
            href={TIKTOK_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="redes-btn redes-btn-solido"
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
              <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
            </svg>
            Seguir en TikTok
          </a>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="redes-btn redes-btn-borde"
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
              <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23a3.7 3.7 0 0 1-.9 1.38c-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41 1.27-.06 1.65-.07 4.85-.07M12 0C8.74 0 8.33.01 7.05.07 5.78.13 4.9.33 4.14.63a5.88 5.88 0 0 0-2.13 1.38A5.88 5.88 0 0 0 .63 4.14C.33 4.9.13 5.78.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.27.26 2.15.56 2.91.3.79.72 1.46 1.38 2.13a5.88 5.88 0 0 0 2.13 1.38c.76.3 1.64.5 2.91.56C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c1.27-.06 2.15-.26 2.91-.56a5.88 5.88 0 0 0 2.13-1.38 5.88 5.88 0 0 0 1.38-2.13c.3-.76.5-1.64.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.27-.26-2.15-.56-2.91a5.88 5.88 0 0 0-1.38-2.13A5.88 5.88 0 0 0 19.86.63c-.76-.3-1.64-.5-2.91-.56C15.67.01 15.26 0 12 0zm0 5.84A6.16 6.16 0 1 0 18.16 12 6.16 6.16 0 0 0 12 5.84zm0 10.15A4 4 0 1 1 16 12a4 4 0 0 1-4 4zm7.85-10.4a1.44 1.44 0 1 1-1.44-1.44 1.44 1.44 0 0 1 1.44 1.44z" />
            </svg>
            Seguir en Instagram
          </a>
        </div>
      </div>
    </section>
  );
};

export default RedesSociales;
