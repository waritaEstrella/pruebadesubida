import express from 'express';
import {
  register,
  verifyEmailController,
  login,
  forgotPassword,
  resetPasswordController,
  googleAuth,
  linkGoogle,
  resetPasswordPage // ← NUEVO: importa el controlador GET
} from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/register', register);
router.get('/verify-email', verifyEmailController); // Para deep link y web
router.post('/login', login);
router.post('/forgot-password', forgotPassword);

// --- NUEVO: GET para mostrar el formulario web ---
router.get('/reset-password', resetPasswordPage);

// --- POST para procesar cambio desde la web o app ---
router.post('/reset-password', resetPasswordController);

router.post('/google', googleAuth);
router.post('/link-google', linkGoogle);


export default router;
