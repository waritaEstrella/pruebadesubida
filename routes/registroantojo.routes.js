import { Router } from 'express';
import {
  obtenerRegistrosAntojoPorUsuario,
  crearRegistroAntojo,
  actualizarRegistroAntojo,
  eliminarRegistroAntojo
} from '../controllers/registroantojo.controller.js';

const router = Router();

router.get('/usuario/:idUsuario', obtenerRegistrosAntojoPorUsuario);
router.post('/', crearRegistroAntojo);
router.put('/:id', actualizarRegistroAntojo);
router.delete('/:id', eliminarRegistroAntojo);

export default router;