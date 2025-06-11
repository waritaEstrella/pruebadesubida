import { Router } from 'express';
import {
  asignarTipoUsuario,
  obtenerTiposUsuarioPorUsuario,
  desactivarUsuarioTipoUsuario
} from '../controllers/usuariostipousuario.controller.js';

const router = Router();

router.post('/', asignarTipoUsuario);
router.get('/:idUsuario', obtenerTiposUsuarioPorUsuario);
router.delete('/', desactivarUsuarioTipoUsuario);

export default router;