# Despacho Contable Fiscal SL - Sitio Web

Sitio web profesional para el Despacho Contable Fiscal SL Pachuca con integración de reseñas de Google.

## 🚀 Características

- ✅ Diseño moderno y responsive
- ✅ Sección de servicios detallada
- ✅ Integración con reseñas reales de Google Business
- ✅ Formulario de contacto
- ✅ Mapa de ubicación integrado
- ✅ Backend API para obtener reseñas de Google

## 📋 Requisitos Previos

- Node.js (versión 16 o superior)
- npm (viene con Node.js)
- API Key de Google Maps/Places

## 🛠️ Instalación

1. Clonar el repositorio (si aplica) o navegar a la carpeta del proyecto:
```bash
cd nuevo-proyecto
```

2. Instalar dependencias:
```bash
npm install
```

3. Configurar variables de entorno:
Crear/editar el archivo `.env` en la raíz del proyecto con:
```env
VITE_GOOGLE_MAPS_API_KEY=tu_api_key_aqui
VITE_GOOGLE_PLACE_ID=tu_place_id_aqui
VITE_API_URL=http://localhost:3001
PORT=3001
```

## 🎯 Uso

### Modo Desarrollo

#### Opción 1: Ejecutar todo junto (Frontend + Backend)
```bash
npm run dev:all
```

#### Opción 2: Ejecutar por separado

Terminal 1 - Backend:
```bash
npm run server
```

Terminal 2 - Frontend:
```bash
npm run dev
```

El frontend estará disponible en: `http://localhost:5173` (o el puerto que Vite asigne)
El backend estará disponible en: `http://localhost:3001`

### Producción

1. Construir el proyecto:
```bash
npm run build
```

2. Preview de producción:
```bash
npm run preview
```

## 📁 Estructura del Proyecto

```
nuevo-proyecto/
├── src/
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── Hero.jsx
│   │   ├── About.jsx
│   │   ├── Services.jsx
│   │   ├── Testimonials.jsx
│   │   ├── GoogleReviews.jsx    # Componente de reseñas de Google
│   │   ├── Contact.jsx
│   │   └── Footer.jsx
│   ├── App.jsx
│   └── main.jsx
├── server/
│   └── index.js                 # Servidor Express para API de Google
├── .env                         # Variables de entorno
└── package.json
```

## 🔑 API de Google Places

### Obtener tu API Key

1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Crea un nuevo proyecto o selecciona uno existente
3. Habilita la API "Places API"
4. Ve a "Credenciales" y crea una API Key
5. Agrega la API Key al archivo `.env`

### Obtener tu Place ID

Tu Place ID actual es: `ChIJYUD2oVghkmIRZhn_NR4QB20`

Para verificar o actualizar:
1. Ve a [Place ID Finder](https://developers.google.com/maps/documentation/places/web-service/place-id)
2. Busca tu negocio
3. Copia el Place ID
4. Actualiza el archivo `.env`

## 🌐 Endpoints del Backend

### GET /api/health
Verifica que el servidor esté funcionando
```bash
curl http://localhost:3001/api/health
```

### GET /api/reviews
Obtiene las reseñas de Google
```bash
curl http://localhost:3001/api/reviews
```

## 📝 Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo (solo frontend)
- `npm run server` - Inicia el servidor backend
- `npm run dev:all` - Inicia frontend y backend simultáneamente
- `npm run build` - Construye el proyecto para producción
- `npm run preview` - Vista previa de la versión de producción
- `npm run lint` - Ejecuta el linter

## 🔒 Seguridad

- **IMPORTANTE**: Nunca subas el archivo `.env` a repositorios públicos
- Agrega `.env` a tu `.gitignore`
- En producción, usa variables de entorno del servidor/hosting

## 🚢 Despliegue

### Frontend (Vercel/Netlify)
1. Construye el proyecto: `npm run build`
2. Despliega la carpeta `dist/`
3. Configura las variables de entorno en tu plataforma

### Backend (Railway/Render/Heroku)
1. Despliega la carpeta `server/`
2. Configura las variables de entorno
3. Actualiza `VITE_API_URL` en el frontend con la URL del backend en producción

## 📱 Contacto

**Despacho Contable Fiscal SL Pachuca**
- 📍 Torre Prisma, piso 6, ofc 608, Camino Real de La Plata 110, Zona Plateada, 42083 Pachuca de Soto, Hgo.
- 📞 771 624 2330
- 📧 contabilidadfiscal@hotmail.com
- 🌐 [Ver en Google Maps](https://maps.app.goo.gl/Lwy1UBZ3mEJmUvYA8)

## 📄 Licencia

Este proyecto es privado y confidencial.
# despachocontablefiscalsl
