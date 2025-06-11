import { Router } from 'express';
import {
  obtenerControlesPostnatales,
  obtenerControlesPostnatalesPorHijo,
  crearControlPostnatal,
  actualizarControlPostnatal,
  eliminarControlPostnatal
} from '../controllers/controlpostnatal.controller.js';

const router = Router();

router.get('/', obtenerControlesPostnatales);
router.get('/hijo/:idHijo', obtenerControlesPostnatalesPorHijo);
router.post('/', crearControlPostnatal);
router.put('/:id', actualizarControlPostnatal);
router.delete('/:id', eliminarControlPostnatal);

export default router;