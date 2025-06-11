import { Router } from 'express';
import {
  obtenerLogros,
  crearLogro,
  actualizarLogro,
  eliminarLogro
} from '../controllers/logro.controller.js';

const router = Router();

router.get('/', obtenerLogros);
router.post('/', crearLogro);
router.put('/:id', actualizarLogro);
router.delete('/:id', eliminarLogro);

export default router;