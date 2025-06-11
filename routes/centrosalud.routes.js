import { Router } from 'express';
import {
  obtenerCentrosSalud,
  crearCentroSalud,
  actualizarCentroSalud,
  validarCentroSaludController,
  eliminarCentroSalud
} from '../controllers/centrosalud.controller.js';

const router = Router();

router.get('/', obtenerCentrosSalud);
router.post('/', crearCentroSalud);
router.put('/:id', actualizarCentroSalud);
router.put('/validar/:id', validarCentroSaludController);
router.delete('/:id', eliminarCentroSalud);

export default router;