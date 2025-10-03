import { useState, useEffect } from 'react';

/**
 * Custom hook para obtener posts de WordPress
 * @param {Object} options - Opciones de configuración
 * @param {number} options.perPage - Número de posts por página (default: 10)
 * @param {number} options.page - Página actual (default: 1)
 * @param {string} options.category - ID de categoría para filtrar (opcional)
 * @returns {Object} { posts, loading, error, totalPages, hasMore }
 */
export const useWordPressPosts = (options = {}) => {
  const { perPage = 10, page = 1, category = null } = options;

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(0);
  const [totalPosts, setTotalPosts] = useState(0);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      setError(null);

      try {
        const baseUrl = import.meta.env.VITE_WORDPRESS_API_URL;

        if (!baseUrl) {
          throw new Error('VITE_WORDPRESS_API_URL no está configurada en las variables de entorno');
        }

        // Construir URL con parámetros
        const params = new URLSearchParams({
          per_page: perPage,
          page: page,
          _embed: 'true', // Incluye media embebida (imágenes destacadas)
        });

        if (category) {
          params.append('categories', category);
        }

        const url = `${baseUrl}/posts?${params}`;
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();

        // Obtener total de páginas y posts desde headers
        const total = parseInt(response.headers.get('X-WP-Total') || '0');
        const pages = parseInt(response.headers.get('X-WP-TotalPages') || '0');

        setTotalPosts(total);
        setTotalPages(pages);
        setPosts(data);
      } catch (err) {
        console.error('Error fetching WordPress posts:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [perPage, page, category]);

  return {
    posts,
    loading,
    error,
    totalPages,
    totalPosts,
    hasMore: page < totalPages
  };
};

/**
 * Custom hook para obtener un post individual por slug
 * @param {string} slug - Slug del post
 * @returns {Object} { post, loading, error }
 */
export const useWordPressPost = (slug) => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!slug) {
      setLoading(false);
      return;
    }

    const fetchPost = async () => {
      setLoading(true);
      setError(null);

      try {
        const baseUrl = import.meta.env.VITE_WORDPRESS_API_URL;

        if (!baseUrl) {
          throw new Error('VITE_WORDPRESS_API_URL no está configurada en las variables de entorno');
        }

        const url = `${baseUrl}/posts?slug=${slug}&_embed=true`;
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();

        if (data.length === 0) {
          throw new Error('Post no encontrado');
        }

        setPost(data[0]);
      } catch (err) {
        console.error('Error fetching WordPress post:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  return { post, loading, error };
};
