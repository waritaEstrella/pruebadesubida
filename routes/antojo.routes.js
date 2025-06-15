import { Router } from 'express';
import {
  obtenerAntojos,
  crearAntojo,
  actualizarAntojo,
  eliminarAntojo,
  obtenerAntojoPorUsuarioCreador,
  eliminarAntojoYRegistros
} from '../controllers/antojo.controller.js';

const router = Router();

router.get('/', obtenerAntojos);
router.get('/usuario/:idUsuarioCreador', obtenerAntojoPorUsuarioCreador);
router.post('/', crearAntojo);
router.put('/:id', actualizarAntojo);
//router.delete('/:id', eliminarAntojo);
router.delete('/:id', eliminarAntojoYRegistros);

export default router;