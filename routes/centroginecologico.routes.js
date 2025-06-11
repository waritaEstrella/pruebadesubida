import { Router } from 'express';
import {
  obtenerCentrosGinecologicos,
  crearCentroGinecologico,
  actualizarCentroGinecologico,
  validarCentroGinecologicoController,
  eliminarCentroGinecologico
} from '../controllers/centroginecologico.controller.js';

const router = Router();

router.get('/', obtenerCentrosGinecologicos);
router.post('/', crearCentroGinecologico);
router.put('/:id', actualizarCentroGinecologico);
router.put('/validar/:id', validarCentroGinecologicoController);
router.delete('/:id', eliminarCentroGinecologico);

export default router;