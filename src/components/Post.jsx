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
          <h1>⚠️ Error</h1>
          <p>{error}</p>
          <Link to="/contenido" className="back-link">
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
          <h1>Post no encontrado</h1>
          <Link to="/contenido" className="back-link">
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
      <div className="post-header">
        <Link to="/contenido" className="back-link">
          ← Volver a contenido
        </Link>
      </div>

      <article className="post-article">
        {featuredImage && (
          <div className="post-featured-image">
            <img src={featuredImage} alt={post.title.rendered} />
          </div>
        )}

        <div className="post-article-content">
          <div className="post-meta">
            <span className="post-date">{formatDate(post.date)}</span>
            {categories.length > 0 && (
              <div className="post-categories">
                {categories.map((cat) => (
                  <span key={cat.id} className="category-tag">
                    {cat.name}
                  </span>
                ))}
              </div>
            )}
          </div>

          <h1
            className="post-article-title"
            dangerouslySetInnerHTML={{ __html: post.title.rendered }}
          />

          <div
            className="post-article-body"
            dangerouslySetInnerHTML={{ __html: post.content.rendered }}
          />

          <div className="post-footer">
            <Link to="/contenido" className="back-button">
              ← Volver a todos los artículos
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}

export default Post;
