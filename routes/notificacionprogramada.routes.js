import { Router } from 'express';
import {
  obtenerNotificacionesProgramadasPorUsuario,
  crearNotificacionProgramada,
  actualizarNotificacionProgramada,
  marcarNotificacionComoEnviada,
  cancelarNotificacion
} from '../controllers/notificacionprogramada.controller.js';

const router = Router();

router.get('/usuario/:idUsuario', obtenerNotificacionesProgramadasPorUsuario);
router.post('/', crearNotificacionProgramada);
router.put('/:id', actualizarNotificacionProgramada);
router.put('/enviar/:id', marcarNotificacionComoEnviada);
router.put('/cancelar/:id', cancelarNotificacion);

export default router;