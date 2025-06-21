import { Router } from 'express';
import {
  obtenerDatosEmbarazo,
  obtenerDatosEmbarazoPorUsuario,
  obtenerEmbarazoActivoPorUsuario,
  crearDatoEmbarazo,
  actualizarDatoEmbarazo,
  eliminarDatoEmbarazo
} from '../controllers/datoembarazo.controller.js';

const router = Router();

// 📥 GET: Obtener todos los embarazos activos (todas las usuarias)
router.get('/', obtenerDatosEmbarazo);

// 📥 GET: Obtener todos los embarazos activos por usuaria
router.get('/usuario/:idUsuario', obtenerDatosEmbarazoPorUsuario);

// 📥 GET: Obtener el embarazo activo actual de una usuaria
router.get('/activo/:idUsuario', obtenerEmbarazoActivoPorUsuario);

// ➕ POST: Registrar un nuevo embarazo
router.post('/', crearDatoEmbarazo);

// ✏️ PUT: Actualizar un embarazo existente por ID
router.put('/:id', actualizarDatoEmbarazo);

// ❌ DELETE (lógico): Marcar un embarazo como inactivo (estado = false)
router.delete('/:id', eliminarDatoEmbarazo);

export default router;
