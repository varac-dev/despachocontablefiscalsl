import { useParams, Link } from 'react-router-dom';
import { useWordPressPost } from '../hooks/useWordPressPosts';
import './Post.css';

function Post() {
  const { slug } = useParams();
  const { post, loading, error } = useWordPressPost(slug);

  // Función para extraer la imagen destacada del post
  const getFeaturedImage = (post) => {
    if (post._embedded?.['wp:featuredmedia']?.[0]?.source_url) {
      return post._embedded['wp:featuredmedia'][0].source_url;
    }
    return null;
  };

  // Función para obtener las categorías del post
  const getCategories = (post) => {
    if (post._embedded?.['wp:term']?.[0]) {
      return post._embedded['wp:term'][0];
    }
    return [];
  };

  // Función para formatear la fecha
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('es-ES', options);
  };

  if (loading) {
    return (
      <div className="post-page">
        <div className="post-loading">
          <div className="spinner"></div>
          <p>Cargando artículo...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="post-page">
        <div className="post-error">
          <div className="error-icon">⚠️</div>
          <h1>Error al cargar</h1>
          <p>{error}</p>
          <Link to="/contenido" className="back-button">
            ← Volver a contenido
          </Link>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="post-page">
        <div className="post-error">
          <div className="error-icon">🔍</div>
          <h1>Artículo no encontrado</h1>
          <p>El artículo que buscas no existe o ha sido eliminado.</p>
          <Link to="/contenido" className="back-button">
            ← Volver a contenido
          </Link>
        </div>
      </div>
    );
  }

  const featuredImage = getFeaturedImage(post);
  const categories = getCategories(post);

  return (
    <div className="post-page">
      {/* Hero Section con título y metadatos */}
      <div
        className="post-hero"
        style={featuredImage ? {
          backgroundImage: `linear-gradient(rgba(11, 29, 57, 0.7), rgba(26, 54, 93, 0.7)), url(${featuredImage})`
        } : {}}
      >
        <div className="post-hero-content">
          <div className="post-hero-meta">
            <span className="post-hero-date">
              📅 {formatDate(post.date)}
            </span>
            {categories.length > 0 && (
              <div className="post-hero-categories">
                {categories.map((cat) => (
                  <span key={cat.id} className="hero-category-tag">
                    {cat.name}
                  </span>
                ))}
              </div>
            )}
          </div>
          <h1
            className="post-hero-title"
            dangerouslySetInnerHTML={{ __html: post.title.rendered }}
          />
        </div>
      </div>

      {/* Contenido del artículo */}
      <div className="post-content-wrapper">
        <article className="post-article">
          <div className="post-article-content">
            {/* Navegación y compartir */}
            <div className="post-navigation">
              <Link to="/contenido" className="back-link">
                ← Volver a contenido
              </Link>

              <div className="share-buttons">
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title.rendered)}&url=${window.location.href}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="share-button"
                  title="Compartir en Twitter"
                >
                  𝕏
                </a>
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="share-button"
                  title="Compartir en LinkedIn"
                >
                  in
                </a>
                <a
                  href={`mailto:?subject=${encodeURIComponent(post.title.rendered)}&body=${encodeURIComponent(window.location.href)}`}
                  className="share-button"
                  title="Compartir por email"
                >
                  ✉
                </a>
              </div>
            </div>

            {/* Contenido del post */}
            <div
              className="post-article-body"
              dangerouslySetInnerHTML={{ __html: post.content.rendered }}
            />

            {/* Footer con botón de regreso */}
            <div className="post-footer">
              <Link to="/contenido" className="back-button">
                ← Volver a todos los artículos
              </Link>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}

export default Post;