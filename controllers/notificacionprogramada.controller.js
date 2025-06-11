import {
  createNotificacionProgramada,
  getNotificacionesProgramadasPorUsuario,
  updateNotificacionProgramada,
  marcarNotificacionEnviada,
  cancelarNotificacionProgramada
} from '../models/notificacionprogramada.model.js';

// Obtener notificaciones programadas activas por usuario
export const obtenerNotificacionesProgramadasPorUsuario = async (req, res) => {
  const { idUsuario } = req.params;
  if (!idUsuario) {
    return res.status(400).json({ error: 'Falta el idUsuario' });
  }
  try {
    const notificaciones = await getNotificacionesProgramadasPorUsuario(idUsuario);
    res.status(200).json(notificaciones);
  } catch (error) {
    console.error('Error al obtener notificaciones programadas:', error.message);
    res.status(500).json({ error: 'Error del servidor al obtener notificaciones programadas' });
  }
};

// Crear notificación programada
export const crearNotificacionProgramada = async (req, res) => {
  const {
    idUsuario,
    idHijo = null,
    idRegistroVacuna = null,
    tipo,
    titulo,
    mensaje,
    fechaHora,
    idUsuarioCreador
  } = req.body;
  if (!idUsuario || !tipo || !titulo || !fechaHora || !idUsuarioCreador) {
    return res.status(400).json({ error: 'Faltan datos requeridos' });
  }
  try {
    const notificacion = await createNotificacionProgramada({
      idUsuario,
      idHijo,
      idRegistroVacuna,
      tipo,
      titulo,
      mensaje,
      fechaHora,
      idUsuarioCreador
    });
    res.status(201).json(notificacion);
  } catch (error) {
    console.error('Error al crear notificación programada:', error.message);
    res.status(500).json({ error: 'Error del servidor al crear notificación programada' });
  }
};

// Actualizar notificación programada
export const actualizarNotificacionProgramada = async (req, res) => {
  const { id } = req.params;
  const {
    tipo,
    titulo,
    mensaje,
    fechaHora,
    enviada,
    cancelada,
    idUsuarioEditor
  } = req.body;
  if (!tipo || !titulo || !fechaHora || typeof enviada === 'undefined' || typeof cancelada === 'undefined' || !idUsuarioEditor) {
    return res.status(400).json({ error: 'Faltan datos requeridos' });
  }
  try {
    const notificacion = await updateNotificacionProgramada(id, {
      tipo,
      titulo,
      mensaje,
      fechaHora,
      enviada,
      cancelada,
      idUsuarioEditor
    });
    res.status(200).json(notificacion);
  } catch (error) {
    console.error('Error al actualizar notificación programada:', error.message);
    res.status(500).json({ error: 'Error del servidor al actualizar notificación programada' });
  }
};

// Marcar notificación como enviada
export const marcarNotificacionComoEnviada = async (req, res) => {
  const { id } = req.params;
  try {
    await marcarNotificacionEnviada(id);
    res.status(200).json({ mensaje: 'Notificación marcada como enviada' });
  } catch (error) {
    console.error('Error al marcar notificación como enviada:', error.message);
    res.status(500).json({ error: 'Error del servidor al marcar notificación como enviada' });
  }
};

// Cancelar notificación programada
export const cancelarNotificacion = async (req, res) => {
  const { id } = req.params;
  const { idUsuarioEditor } = req.body;
  if (!idUsuarioEditor) {
    return res.status(400).json({ error: 'Falta el idUsuarioEditor' });
  }
  try {
    await cancelarNotificacionProgramada(id, idUsuarioEditor);
    res.status(200).json({ mensaje: 'Notificación cancelada correctamente' });
  } catch (error) {
    console.error('Error al cancelar notificación:', error.message);
    res.status(500).json({ error: 'Error del servidor al cancelar notificación' });
  }
};