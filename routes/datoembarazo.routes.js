import { Router } from 'express';
import {
  obtenerDatosEmbarazo,
  obtenerDatosEmbarazoPorUsuario,
  crearDatoEmbarazo,
  actualizarDatoEmbarazo,
  eliminarDatoEmbarazo
} from '../controllers/datoembarazo.controller.js';

const router = Router();

router.get('/', obtenerDatosEmbarazo);
router.get('/usuario/:idUsuario', obtenerDatosEmbarazoPorUsuario);
router.post('/', crearDatoEmbarazo);
router.put('/:id', actualizarDatoEmbarazo);
router.delete('/:id', eliminarDatoEmbarazo);

export default router;