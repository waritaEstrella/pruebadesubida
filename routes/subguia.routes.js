import { Router } from 'express';
import {
  obtenerSubguiasPorGuia,
  crearSubguia,
  actualizarSubguia,
  eliminarSubguia
} from '../controllers/subguia.controller.js';

const router = Router();

router.get('/guia/:idGuia', obtenerSubguiasPorGuia);
router.post('/', crearSubguia);
router.put('/:id', actualizarSubguia);
router.delete('/:id', eliminarSubguia);

export default router;