import { Router } from 'express';
import {
  obtenerAlimentosPersonalizadosPorHijo,
  crearAlimentoPersonalizado,
  actualizarAlimentoPersonalizado,
  eliminarAlimentoPersonalizado
} from '../controllers/alimentopersonalizado.controller.js';

const router = Router();

router.get('/hijo/:idHijo', obtenerAlimentosPersonalizadosPorHijo);
router.post('/', crearAlimentoPersonalizado);
router.put('/:id', actualizarAlimentoPersonalizado);
router.delete('/:id', eliminarAlimentoPersonalizado);

export default router;