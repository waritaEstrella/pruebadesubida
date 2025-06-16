import { Router } from 'express';
import {
  obtenerCatalogoVacunas,
  crearCatalogoVacuna,
  actualizarCatalogoVacuna,
  eliminarCatalogoVacuna,
} from '../controllers/catalogovacuna.controller.js';

const router = Router();

router.get('/', obtenerCatalogoVacunas);
router.post('/', crearCatalogoVacuna);
router.put('/:id', actualizarCatalogoVacuna);
router.delete('/:id', eliminarCatalogoVacuna);

export default router;