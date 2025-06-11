import { Router } from 'express';
import {
  obtenerGuias,
  crearGuia,
  actualizarGuia,
  eliminarGuia
} from '../controllers/guia.controller.js';

const router = Router();

router.get('/', obtenerGuias);
router.post('/', crearGuia);
router.put('/:id', actualizarGuia);
router.delete('/:id', eliminarGuia);

export default router;