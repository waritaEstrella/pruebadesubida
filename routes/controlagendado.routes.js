import { Router } from 'express';
import {
  obtenerControlesAgendados,
  obtenerControlesAgendadosPorUsuario,
  crearControlAgendado,
  actualizarControlAgendado,
  marcarControlAgendadoComoNotificado,
  eliminarControlAgendado
} from '../controllers/controlagendado.controller.js';

const router = Router();

router.get('/', obtenerControlesAgendados);
router.get('/usuario/:idUsuario', obtenerControlesAgendadosPorUsuario);
router.post('/', crearControlAgendado);
router.put('/:id', actualizarControlAgendado);
router.put('/notificar/:id', marcarControlAgendadoComoNotificado);
router.delete('/:id', eliminarControlAgendado);

export default router;