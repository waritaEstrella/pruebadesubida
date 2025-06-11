import { Router } from 'express';
import {
  obtenerRegistrosVacunaPorHijo,
  crearRegistroVacuna,
  actualizarRegistroVacuna,
  eliminarRegistroVacuna
} from '../controllers/registrovacuna.controller.js';

const router = Router();

router.get('/hijo/:idHijo', obtenerRegistrosVacunaPorHijo);
router.post('/', crearRegistroVacuna);
router.put('/:id', actualizarRegistroVacuna);
router.delete('/:id', eliminarRegistroVacuna);

export default router;