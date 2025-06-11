import { Router } from 'express';
import {
  obtenerImagenesPorSubguia,
  crearImagenSubguia,
  actualizarImagenSubguia,
  eliminarImagenSubguia
} from '../controllers/imagenessubguia.controller.js';

const router = Router();

router.get('/subguia/:idSubguia', obtenerImagenesPorSubguia);
router.post('/', crearImagenSubguia);
router.put('/:id', actualizarImagenSubguia);
router.delete('/:id', eliminarImagenSubguia);

export default router;