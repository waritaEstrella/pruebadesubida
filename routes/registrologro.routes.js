import { Router } from 'express';
import {
  obtenerRegistrosLogroPorHijo,
  crearRegistroLogro,
  actualizarRegistroLogro,
  eliminarRegistroLogro
} from '../controllers/registrologro.controller.js';

const router = Router();

router.get('/hijo/:idHijo', obtenerRegistrosLogroPorHijo);
router.post('/', crearRegistroLogro);
router.put('/:id', actualizarRegistroLogro);
router.delete('/:id', eliminarRegistroLogro);

export default router;