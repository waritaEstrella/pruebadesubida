import express from 'express';
import { updateTipoUsuarioController } from '../controllers/user.controller.js';

const router = express.Router();

router.patch('/tipo_usuario', updateTipoUsuarioController);

export default router;
