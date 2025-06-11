import { Router } from 'express';
import {
  obtenerControlesPrenatales,
  obtenerControlesPrenatalesPorUsuario,
  crearControlPrenatal,
  actualizarControlPrenatal,
  eliminarControlPrenatal
} from '../controllers/controlprenatal.controller.js';

const router = Router();

router.get('/', obtenerControlesPrenatales);
router.get('/usuario/:idUsuario', obtenerControlesPrenatalesPorUsuario);
router.post('/', crearControlPrenatal);
router.put('/:id', actualizarControlPrenatal);
router.delete('/:id', eliminarControlPrenatal);

export default router;