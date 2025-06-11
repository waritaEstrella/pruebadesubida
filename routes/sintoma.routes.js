import { Router } from 'express';
import {
  obtenerSintomas,
  crearSintoma,
  actualizarSintoma,
  eliminarSintoma,
  obtenerSintomasPorUsuarioCreador
} from '../controllers/sintoma.controller.js';

const router = Router();

router.get('/', obtenerSintomas);
router.post('/', crearSintoma);
router.put('/:id', actualizarSintoma);
router.delete('/:id', eliminarSintoma);
router.get('/usuario/:idUsuarioCreador', obtenerSintomasPorUsuarioCreador);

export default router;