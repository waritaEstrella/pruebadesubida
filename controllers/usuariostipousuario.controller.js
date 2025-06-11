import {
  createUsuarioTipoUsuario,
  getTiposUsuarioPorUsuario,
  deactivateUsuarioTipoUsuario
} from '../models/usuariostipousuario.model.js';

// Asignar tipo(s) de usuario a un usuario
export const asignarTipoUsuario = async (req, res) => {
  const { idUsuario, idTipoUsuario } = req.body;
  if (!idUsuario || !idTipoUsuario) {
    return res.status(400).json({ error: 'Faltan datos requeridos' });
  }
  try {
    const result = await createUsuarioTipoUsuario({ idUsuario, idTipoUsuario });
    res.status(201).json(result);
  } catch (error) {
    console.error('Error al asignar tipo de usuario:', error.message);
    res.status(500).json({ error: 'Error del servidor al asignar tipo de usuario' });
  }
};

// Obtener tipos de usuario activos por usuario
export const obtenerTiposUsuarioPorUsuario = async (req, res) => {
  const { idUsuario } = req.params;
  if (!idUsuario) {
    return res.status(400).json({ error: 'Falta el idUsuario' });
  }
  try {
    const tipos = await getTiposUsuarioPorUsuario(idUsuario);
    res.status(200).json(tipos);
  } catch (error) {
    console.error('Error al obtener tipos de usuario por usuario:', error.message);
    res.status(500).json({ error: 'Error del servidor al obtener tipos de usuario por usuario' });
  }
};

// Desactivar relación usuario-tipo_usuario
export const desactivarUsuarioTipoUsuario = async (req, res) => {
  const { idUsuario, idTipoUsuario } = req.body;
  if (!idUsuario || !idTipoUsuario) {
    return res.status(400).json({ error: 'Faltan datos requeridos' });
  }
  try {
    await deactivateUsuarioTipoUsuario({ idUsuario, idTipoUsuario });
    res.status(200).json({ mensaje: 'Relación desactivada correctamente' });
  } catch (error) {
    console.error('Error al desactivar relación usuario-tipo_usuario:', error.message);
    res.status(500).json({ error: 'Error del servidor al desactivar relación usuario-tipo_usuario' });
  }
};