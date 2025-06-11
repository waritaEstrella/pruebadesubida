import { Router } from 'express';
import {
  obtenerRegistrosEnfermedadPorHijo,
  crearRegistroEnfermedad,
  actualizarRegistroEnfermedad,
  eliminarRegistroEnfermedad
} from '../controllers/registroenfermedad.controller.js';

const router = Router();

router.get('/hijo/:idHijo', obtenerRegistrosEnfermedadPorHijo);
router.post('/', crearRegistroEnfermedad);
router.put('/:id', actualizarRegistroEnfermedad);
router.delete('/:id', eliminarRegistroEnfermedad);

export default router;