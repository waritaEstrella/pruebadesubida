import express from 'express';
import {
  register,
  verifyEmailController,
  login,
  forgotPassword,
  resetPasswordController,
  resetPasswordPage // ← para mostrar el formulario de cambio de contraseña
} from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/register', register);
router.get('/verify-email', verifyEmailController); // Para deep link y web
router.post('/login', login);
router.post('/forgot-password', forgotPassword);

// Mostrar formulario de restablecimiento de contraseña (web)
router.get('/reset-password', resetPasswordPage);

// Procesar restablecimiento (web o app)
router.post('/reset-password', resetPasswordController);


export default router;
