import express from 'express';
import { updateTipoUsuarioController } from '../controllers/user.controller.js';
import { obtenerTipoUsuario } from '../controllers/user.controller.js';

const router = express.Router();

router.patch('/tipo_usuario', updateTipoUsuarioController);
//obtener tipo de usuario
router.get('/correo/:correo', obtenerTipoUsuario);

export default router;
