import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Endpoint para obtener reseñas de Google
app.get('/api/reviews', async (req, res) => {
  try {
    const placeId = process.env.VITE_GOOGLE_PLACE_ID;
    const apiKey = process.env.VITE_GOOGLE_MAPS_API_KEY;

    if (!placeId || !apiKey) {
      return res.status(500).json({
        error: 'Configuración incompleta',
        message: 'Falta PLACE_ID o API_KEY'
      });
    }

    // Llamar a la API de Google Places
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,rating,user_ratings_total,reviews&key=${apiKey}&language=es`
    );

    if (!response.ok) {
      throw new Error('Error al obtener datos de Google Places API');
    }

    const data = await response.json();

    if (data.status === 'OK' && data.result) {
      res.json({
        success: true,
        placeInfo: {
          name: data.result.name,
          rating: data.result.rating,
          totalReviews: data.result.user_ratings_total
        },
        reviews: data.result.reviews || []
      });
    } else {
      res.status(400).json({
        success: false,
        error: data.status,
        message: data.error_message || 'No se pudieron obtener las reseñas'
      });
    }
  } catch (error) {
    console.error('Error en /api/reviews:', error);
    res.status(500).json({
      success: false,
      error: 'Error interno del servidor',
      message: error.message
    });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Servidor funcionando correctamente' });
});

app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
  console.log(`📍 Endpoint de reseñas: http://localhost:${PORT}/api/reviews`);
});
