import express from 'express';
import upload from '../utils/upload.js';

import {
  actualizarImagenPerfil,
  obtenerUsuarioPorCorreo,
  subirImagenPerfil,
  actualizarUsuarioController,
  obtenerInfoCompletaUsuario,
  asignarTiposUsuarioController,
  registrarUsuarioConTipo
} from '../controllers/user.controller.js';

const router = express.Router();

// ✅ Obtener tipos de usuario + es_admin + es_nuevo
router.get('/info_completa/:correo', obtenerInfoCompletaUsuario);

// ✅ Obtener datos del usuario (nombre, apellidos, imagen, etc.)
router.get('/correo/:correo', obtenerUsuarioPorCorreo);

// ✅ Actualizar imagen de perfil en base de datos
router.put('/imagen', actualizarImagenPerfil);

// ✅ Subir imagen a Cloudinary
router.post('/imagen/cloudinary', upload.single('imagen'), subirImagenPerfil);

// ✅ Actualizar nombre y fecha de nacimiento
router.patch('/actualizar', actualizarUsuarioController);

//registrar con tipo

router.post('/registrar_con_tipo', registrarUsuarioConTipo);

//seleccionar perfil
router.post('/asignar_tipo', asignarTiposUsuarioController);

export default router;
