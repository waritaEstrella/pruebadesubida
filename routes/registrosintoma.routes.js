import { Router } from 'express';
import {
  obtenerRegistrosSintoma,
  obtenerRegistrosSintomaPorUsuario,
  crearRegistroSintoma,
  actualizarRegistroSintoma,
  eliminarRegistroSintoma
} from '../controllers/registrosintoma.controller.js';

const router = Router();

router.get('/', obtenerRegistrosSintoma);
router.get('/usuario/:idUsuario', obtenerRegistrosSintomaPorUsuario);
router.post('/', crearRegistroSintoma);
router.put('/:id', actualizarRegistroSintoma);
router.delete('/:id', eliminarRegistroSintoma);

export default router;