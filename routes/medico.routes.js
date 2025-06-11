import { Router } from 'express';
import {
  obtenerMedicos,
  crearMedico,
  actualizarMedico,
  eliminarMedico
} from '../controllers/medico.controller.js';

const router = Router();

router.get('/', obtenerMedicos);
router.post('/', crearMedico);
router.put('/:id', actualizarMedico);
router.delete('/:id', eliminarMedico);

export default router;