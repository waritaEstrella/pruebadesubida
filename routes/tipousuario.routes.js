import { Router } from 'express';
import {
  obtenerTiposUsuario,
  crearTipoUsuario,
  actualizarTipoUsuario,
  eliminarTipoUsuario
} from '../controllers/tipousuario.controller.js';

const router = Router();

router.get('/', obtenerTiposUsuario);
router.post('/', crearTipoUsuario);
router.put('/:id', actualizarTipoUsuario);
router.delete('/:id', eliminarTipoUsuario);

export default router;