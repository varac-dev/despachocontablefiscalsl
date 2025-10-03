import { Link } from 'react-router-dom';
import { useWordPressPosts } from '../hooks/useWordPressPosts';
import './Contenido.css';

function Contenido() {
  const { posts, loading, error } = useWordPressPosts({ perPage: 12 });

  // Función para extraer la imagen destacada del post
  const getFeaturedImage = (post) => {
    if (post._embedded?.['wp:featuredmedia']?.[0]?.source_url) {
      return post._embedded['wp:featuredmedia'][0].source_url;
    }
    return 'https://via.placeholder.com/400x250?text=Sin+Imagen';
  };

  // Función para obtener las categorías del post
  const getCategories = (post) => {
    if (post._embedded?.['wp:term']?.[0]) {
      return post._embedded['wp:term'][0].map(cat => cat.name).join(', ');
    }
    return 'Sin categoría';
  };

  // Función para formatear la fecha
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('es-ES', options);
  };

  // Función para limpiar el excerpt de HTML
  const cleanExcerpt = (excerpt) => {
    const div = document.createElement('div');
    div.innerHTML = excerpt;
    return div.textContent || div.innerText || '';
  };

  return (
    <div className="contenido-page">
      <div className="contenido-hero">
        <h1>Contenido</h1>
        <p>Artículos y recursos sobre contabilidad, fiscalidad y gestión empresarial</p>
      </div>

      <div className="contenido-container">
        {loading && (
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Cargando artículos...</p>
          </div>
        )}

        {error && (
          <div className="error-state">
            <p>⚠️ Error al cargar los artículos</p>
            <p className="error-message">{error}</p>
            <p className="error-hint">
              Asegúrate de configurar VITE_WORDPRESS_API_URL en tu archivo .env
            </p>
          </div>
        )}

        {!loading && !error && posts.length === 0 && (
          <div className="empty-state">
            <p>No hay artículos disponibles en este momento.</p>
          </div>
        )}

        {!loading && !error && posts.length > 0 && (
          <div className="posts-grid">
            {posts.map((post) => (
              <article key={post.id} className="post-card">
                <div className="post-image">
                  <img
                    src={getFeaturedImage(post)}
                    alt={post.title.rendered}
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/400x250?text=Sin+Imagen';
                    }}
                  />
                  <span className="post-category">
                    {getCategories(post)}
                  </span>
                </div>
                <div className="post-content">
                  <div className="post-meta">
                    <span className="post-date">{formatDate(post.date)}</span>
                  </div>
                  <h2
                    className="post-title"
                    dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                  />
                  <p className="post-excerpt">
                    {cleanExcerpt(post.excerpt.rendered)}
                  </p>
                  <Link
                    to={`/contenido/${post.slug}`}
                    className="post-link"
                  >
                    Leer más →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Contenido;
