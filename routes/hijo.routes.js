import { Router } from 'express';
import {
  obtenerHijos,
  obtenerHijosPorUsuario,
  crearHijo,
  actualizarHijo,
  eliminarHijo
} from '../controllers/hijo.controller.js';

const router = Router();

router.get('/', obtenerHijos);
router.get('/usuario/:idUsuario', obtenerHijosPorUsuario);
router.post('/', crearHijo);
router.put('/:id', actualizarHijo);
router.delete('/:id', eliminarHijo);

export default router;