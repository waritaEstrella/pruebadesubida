import express from 'express';
import {
  updateTipoUsuarioController,
  obtenerTipoUsuario,
  actualizarImagenPerfil,
  obtenerUsuarioPorCorreo
} from '../controllers/user.controller.js';

const router = express.Router();

// Actualizar tipo de usuario
router.patch('/tipo_usuario', updateTipoUsuarioController);

// Obtener tipo de usuario (solo devuelve tipo_usuario)
router.get('/tipo_usuario/:correo', obtenerTipoUsuario);

// Obtener usuario completo (incluye imagen_perfil)
router.get('/correo/:correo', obtenerUsuarioPorCorreo);

// Actualizar imagen de perfil
router.put('/imagen', actualizarImagenPerfil);

export default router;
