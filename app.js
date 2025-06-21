import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Importar rutas
import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/user.routes.js';
import tipousuarioRoutes from './routes/tipousuario.routes.js';
import usuariostipousuarioRoutes from './routes/usuariostipousuario.routes.js';
import sintomaRoutes from './routes/sintoma.routes.js';
import registrosintomaRoutes from './routes/registrosintoma.routes.js';
import centrosaludRoutes from './routes/centrosalud.routes.js';
import centroginecologicoRoutes from './routes/centroginecologico.routes.js';
import medicoRoutes from './routes/medico.routes.js';
import controlprenatalRoutes from './routes/controlprenatal.routes.js';
import datoembarazoRoutes from './routes/datoembarazo.routes.js';
import hijoRoutes from './routes/hijo.routes.js';
import controlpostnatalRoutes from './routes/controlpostnatal.routes.js';
import controlagendadoRoutes from './routes/controlagendado.routes.js';
import crecimientohijoRoutes from './routes/crecimientohijo.routes.js';
import registroenfermedadRoutes from './routes/registroenfermedad.routes.js';
import catalogovacunaRoutes from './routes/catalogovacuna.routes.js';
import registrovacunaRoutes from './routes/registrovacuna.routes.js';
import notificacionprogramadaRoutes from './routes/notificacionprogramada.routes.js';
import alimentopersonalizadoRoutes from './routes/alimentopersonalizado.routes.js';
import registroalimentacionRoutes from './routes/registroalimentacion.routes.js';
import registrodesechoRoutes from './routes/registrodesecho.routes.js';
import logroRoutes from './routes/logro.routes.js';
import registrologroRoutes from './routes/registrologro.routes.js';
import guiaRoutes from './routes/guia.routes.js';
import subguiaRoutes from './routes/subguia.routes.js';
import imagenessubguiaRoutes from './routes/imagenessubguia.routes.js';
import antojoRoutes from './routes/antojo.routes.js';
import registroAntojoRoutes from './routes/registroantojo.routes.js';



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
app.use('/api/tipousuario', tipousuarioRoutes);
app.use('/api/usuariostipousuario', usuariostipousuarioRoutes);
app.use('/api/sintoma', sintomaRoutes);
app.use('/api/registrosintoma', registrosintomaRoutes);
app.use('/api/centrosalud', centrosaludRoutes);
app.use('/api/centroginecologico', centroginecologicoRoutes);
app.use('/api/medico', medicoRoutes);
app.use('/api/controlprenatal', controlprenatalRoutes);
app.use('/api/embarazo', datoembarazoRoutes);
app.use('/api/hijo', hijoRoutes);
app.use('/api/controlpostnatal', controlpostnatalRoutes);
app.use('/api/controlagendado', controlagendadoRoutes);
app.use('/api/crecimientohijo', crecimientohijoRoutes);
app.use('/api/registroenfermedad', registroenfermedadRoutes);
app.use('/api/catalogovacuna', catalogovacunaRoutes);
app.use('/api/registrovacuna', registrovacunaRoutes);
app.use('/api/notificacionprogramada', notificacionprogramadaRoutes);
app.use('/api/alimentopersonalizado', alimentopersonalizadoRoutes);
app.use('/api/registroalimentacion', registroalimentacionRoutes);
app.use('/api/registrodesecho', registrodesechoRoutes);
app.use('/api/logro', logroRoutes);
app.use('/api/registrologro', registrologroRoutes);
app.use('/api/guia', guiaRoutes);
app.use('/api/subguia', subguiaRoutes);
app.use('/api/imagenessubguia', imagenessubguiaRoutes);
app.use('/api/antojo', antojoRoutes);
app.use('/api/registroantojo', registroAntojoRoutes);


// Ruta de prueba
app.get('/', (req, res) => {
  res.send('Backend Creciendo Contigo funcionando');
});

// Iniciar servidor
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
