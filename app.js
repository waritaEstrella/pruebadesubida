import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Importar rutas
import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/user.routes.js';

dotenv.config();

const app = express();

// Configuración de CORS
app.use(cors({
  origin: '*', // ⚠️ En producción, usa tu dominio real
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Middleware para parsear JSON (con límite ampliado) y formularios
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: false }));

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/usuarios', userRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('Backend Creciendo Contigo funcionando');
});

// Iniciar servidor
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
