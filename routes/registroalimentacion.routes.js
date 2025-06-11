import { Router } from 'express';
import {
  obtenerRegistrosAlimentacionPorHijo,
  crearRegistroAlimentacion,
  actualizarRegistroAlimentacion,
  eliminarRegistroAlimentacion
} from '../controllers/registroalimentacion.controller.js';

const router = Router();

router.get('/hijo/:idHijo', obtenerRegistrosAlimentacionPorHijo);
router.post('/', crearRegistroAlimentacion);
router.put('/:id', actualizarRegistroAlimentacion);
router.delete('/:id', eliminarRegistroAlimentacion);

export default router;