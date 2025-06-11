import { Router } from 'express';
import {
  obtenerCrecimientoHijoPorHijo,
  crearCrecimientoHijo,
  actualizarCrecimientoHijo,
  eliminarCrecimientoHijo
} from '../controllers/crecimientohijo.controller.js';

const router = Router();

router.get('/hijo/:idHijo', obtenerCrecimientoHijoPorHijo);
router.post('/', crearCrecimientoHijo);
router.put('/:id', actualizarCrecimientoHijo);
router.delete('/:id', eliminarCrecimientoHijo);

export default router;