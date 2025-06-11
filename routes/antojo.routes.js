import { Router } from 'express';
import {
  obtenerAntojos,
  crearAntojo,
  actualizarAntojo,
  eliminarAntojo
} from '../controllers/antojo.controller.js';

const router = Router();

router.get('/', obtenerAntojos);
router.post('/', crearAntojo);
router.put('/:id', actualizarAntojo);
router.delete('/:id', eliminarAntojo);

export default router;