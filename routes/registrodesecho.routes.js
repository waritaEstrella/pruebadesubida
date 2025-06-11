import { Router } from 'express';
import {
  obtenerRegistrosDesechoPorHijo,
  crearRegistroDesecho,
  actualizarRegistroDesecho,
  eliminarRegistroDesecho
} from '../controllers/registrodesecho.controller.js';

const router = Router();

router.get('/hijo/:idHijo', obtenerRegistrosDesechoPorHijo);
router.post('/', crearRegistroDesecho);
router.put('/:id', actualizarRegistroDesecho);
router.delete('/:id', eliminarRegistroDesecho);

export default router;