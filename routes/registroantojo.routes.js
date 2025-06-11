import { Router } from 'express';
import {
  obtenerRegistrosAntojoPorUsuario,
  crearRegistroAntojo,
  actualizarRegistroAntojo,
  eliminarRegistroAntojo,
  obtenerRegistrosAntojoPorUsuarioYFecha,
  obtenerRegistrosAntojoPorUsuarioYAntojo
} from '../controllers/registroantojo.controller.js';

const router = Router();

router.get('/usuario/:idUsuario', obtenerRegistrosAntojoPorUsuario);
router.post('/', crearRegistroAntojo);
router.put('/:id', actualizarRegistroAntojo);
router.delete('/:id', eliminarRegistroAntojo);
router.get('/usuario/:idUsuario/fecha/:fecha', obtenerRegistrosAntojoPorUsuarioYFecha);
router.get('/usuario/:idUsuario/antojo/:idAntojo', obtenerRegistrosAntojoPorUsuarioYAntojo);
export default router;