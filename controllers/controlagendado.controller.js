import {
  createControlAgendado,
  getControlesAgendados,
  getControlesAgendadosPorUsuario,
  updateControlAgendado,
  marcarControlAgendadoNotificado,
  deleteControlAgendado
} from '../models/controlagendado.model.js';

// Obtener controles agendados activos
export const obtenerControlesAgendados = async (req, res) => {
  try {
    const controles = await getControlesAgendados();
    res.status(200).json(controles);
  } catch (error) {
    console.error('Error al obtener controles agendados:', error.message);
    res.status(500).json({ error: 'Error del servidor al obtener controles agendados' });
  }
};

// Obtener controles agendados por usuario
export const obtenerControlesAgendadosPorUsuario = async (req, res) => {
  const { idUsuario } = req.params;
  if (!idUsuario) {
    return res.status(400).json({ error: 'Falta el idUsuario' });
  }
  try {
    const controles = await getControlesAgendadosPorUsuario(idUsuario);
    res.status(200).json(controles);
  } catch (error) {
    console.error('Error al obtener controles agendados por usuario:', error.message);
    res.status(500).json({ error: 'Error del servidor al obtener controles agendados por usuario' });
  }
};

// Crear control agendado
export const crearControlAgendado = async (req, res) => {
  const {
    idUsuario,
    idHijo = null,
    tipoControl,
    fecha,
    hora,
    motivo,
    idMedico = null,
    idUsuarioCreador
  } = req.body;
  if (!idUsuario || !tipoControl || !fecha || !hora || !idUsuarioCreador) {
    return res.status(400).json({ error: 'Faltan datos requeridos' });
  }
  try {
    const control = await createControlAgendado({
      idUsuario,
      idHijo,
      tipoControl,
      fecha,
      hora,
      motivo,
      idMedico,
      idUsuarioCreador
    });
    res.status(201).json(control);
  } catch (error) {
    console.error('Error al crear control agendado:', error.message);
    res.status(500).json({ error: 'Error del servidor al crear control agendado' });
  }
};

// Actualizar control agendado
export const actualizarControlAgendado = async (req, res) => {
  const { id } = req.params;
  const {
    idHijo = null,
    tipoControl,
    fecha,
    hora,
    motivo,
    idMedico = null,
    notificado,
    idUsuarioEditor
  } = req.body;
  if (!tipoControl || !fecha || !hora || !idUsuarioEditor) {
    return res.status(400).json({ error: 'Faltan datos requeridos' });
  }
  try {
    const control = await updateControlAgendado(id, {
      idHijo,
      tipoControl,
      fecha,
      hora,
      motivo,
      idMedico,
      notificado,
      idUsuarioEditor
    });
    res.status(200).json(control);
  } catch (error) {
    console.error('Error al actualizar control agendado:', error.message);
    res.status(500).json({ error: 'Error del servidor al actualizar control agendado' });
  }
};

// Marcar como notificado
export const marcarControlAgendadoComoNotificado = async (req, res) => {
  const { id } = req.params;
  try {
    await marcarControlAgendadoNotificado(id);
    res.status(200).json({ mensaje: 'Control agendado marcado como notificado' });
  } catch (error) {
    console.error('Error al marcar como notificado:', error.message);
    res.status(500).json({ error: 'Error del servidor al marcar como notificado' });
  }
};

// Eliminar (desactivar) control agendado
export const eliminarControlAgendado = async (req, res) => {
  const { id } = req.params;
  try {
    await deleteControlAgendado(id);
    res.status(200).json({ mensaje: 'Control agendado eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar control agendado:', error.message);
    res.status(500).json({ error: 'Error del servidor al eliminar control agendado' });
  }
};