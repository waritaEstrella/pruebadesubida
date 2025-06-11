import { Router } from 'express';
import {
  obtenerSintomas,
  crearSintoma,
  actualizarSintoma,
  eliminarSintoma
} from '../controllers/sintoma.controller.js';

const router = Router();

router.get('/', obtenerSintomas);
router.post('/', crearSintoma);
router.put('/:id', actualizarSintoma);
router.delete('/:id', eliminarSintoma);

export default router;