import { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './GoogleReviews.css';

const GoogleReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [placeInfo, setPlaceInfo] = useState(null);
  const [expandedReviews, setExpandedReviews] = useState({});

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    arrows: true,
    swipeToSlide: true,
    touchThreshold: 10,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          arrows: true,
          dots: true
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
          dots: true,
          centerMode: true,
          centerPadding: '20px'
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
          dots: true,
          centerMode: false,
          adaptiveHeight: true,
          variableWidth: false,
          swipe: true,
          touchMove: true
        }
      },
      {
        breakpoint: 390,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
          dots: true,
          centerMode: false,
          adaptiveHeight: true,
          variableWidth: false,
          swipe: true,
          touchMove: true
        }
      }
    ]
  };

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001';
        const response = await fetch(`${apiUrl}/api/reviews`);

        if (!response.ok) {
          throw new Error('Error al obtener las reseñas');
        }

        const data = await response.json();

        if (data.success) {
          setPlaceInfo(data.placeInfo);
          setReviews(data.reviews);
        } else {
          throw new Error(data.message || 'No se pudieron cargar las reseñas');
        }
      } catch (err) {
        console.error('Error fetching reviews:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<i key={`full-${i}`} className="fas fa-star"></i>);
    }
    if (hasHalfStar) {
      stars.push(<i key="half" className="fas fa-star-half-alt"></i>);
    }
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<i key={`empty-${i}`} className="far fa-star"></i>);
    }
    return stars;
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString('es-MX', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const toggleExpand = (index) => {
    setExpandedReviews(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const truncateText = (text, maxLength = 150) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength);
  };

  if (loading) {
    return (
      <section className="google-reviews">
        <div className="container">
          <div className="loading-state">
            <i className="fas fa-spinner fa-spin"></i>
            <p>Cargando reseñas...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="google-reviews">
        <div className="container">
          <div className="error-state">
            <i className="fas fa-exclamation-circle"></i>
            <p>No se pudieron cargar las reseñas en este momento</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="google-reviews">
      <div className="container">
        {/* Section Header */}
        <div className="reviews-header">
          <h2>Lo Que Dicen Nuestros Clientes</h2>
          {placeInfo && (
            <div className="overall-rating">
              <div className="rating-stars">
                {renderStars(placeInfo.rating)}
              </div>
              <div className="rating-info">
                <span className="rating-number">{placeInfo.rating}</span>
                <span className="rating-count">({placeInfo.totalReviews} reseñas)</span>
              </div>
            </div>
          )}
          <p>Testimonios reales de Google Business</p>
        </div>

        {/* Reviews Slider */}
        <div className="reviews-slider-container">
          <Slider {...sliderSettings}>
            {reviews.map((review, index) => (
              <div key={index} className="slider-item">
                <div className="review-card">
                  <div className="review-header">
                    <div className="reviewer-info">
                      <img
                        src={review.profile_photo_url}
                        alt={review.author_name}
                        className="reviewer-photo"
                      />
                      <div>
                        <h4>{review.author_name}</h4>
                        <p className="review-date">{formatDate(review.time)}</p>
                      </div>
                    </div>
                    <div className="review-rating">
                      {renderStars(review.rating)}
                    </div>
                  </div>
                  <div className="review-text">
                    <p>
                      {expandedReviews[index]
                        ? review.text
                        : truncateText(review.text)}
                      {review.text.length > 150 && (
                        <span
                          className="read-more"
                          onClick={() => toggleExpand(index)}
                        >
                          {expandedReviews[index] ? ' Ver menos' : '... Ver más'}
                        </span>
                      )}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>

        {/* Google Link 
        <div className="reviews-footer">
          <a
            href="https://maps.app.goo.gl/Lwy1UBZ3mEJmUvYA8"
            target="_blank"
            rel="noopener noreferrer"
            className="google-link"
          >
            <i className="fab fa-google"></i>
            Ver todas las reseñas en Google
          </a>
        </div>*/}
      </div>
    </section>
  );
};

export default GoogleReviews;
