import {
  createTipoUsuario,
  getTiposUsuario,
  updateTipoUsuario,
  deleteTipoUsuario
} from '../models/tipousuario.model.js';

// Obtener todos los tipos de usuario activos
export const obtenerTiposUsuario = async (req, res) => {
  try {
    const tipos = await getTiposUsuario();
    res.status(200).json(tipos);
  } catch (error) {
    console.error('Error al obtener tipos de usuario:', error.message);
    res.status(500).json({ error: 'Error del servidor al obtener tipos de usuario' });
  }
};

// Crear tipo de usuario
export const crearTipoUsuario = async (req, res) => {
  const { tipoUsuario } = req.body;
  if (!tipoUsuario) {
    return res.status(400).json({ error: 'Falta el tipo de usuario' });
  }
  try {
    const tipo = await createTipoUsuario({ tipoUsuario });
    res.status(201).json(tipo);
  } catch (error) {
    console.error('Error al crear tipo de usuario:', error.message);
    res.status(500).json({ error: 'Error del servidor al crear tipo de usuario' });
  }
};

// Actualizar tipo de usuario
export const actualizarTipoUsuario = async (req, res) => {
  const { id } = req.params;
  const { tipoUsuario } = req.body;
  if (!tipoUsuario) {
    return res.status(400).json({ error: 'Falta el tipo de usuario' });
  }
  try {
    const tipo = await updateTipoUsuario(id, { tipoUsuario });
    res.status(200).json(tipo);
  } catch (error) {
    console.error('Error al actualizar tipo de usuario:', error.message);
    res.status(500).json({ error: 'Error del servidor al actualizar tipo de usuario' });
  }
};

// Eliminar (desactivar) tipo de usuario
export const eliminarTipoUsuario = async (req, res) => {
  const { id } = req.params;
  try {
    await deleteTipoUsuario(id);
    res.status(200).json({ mensaje: 'Tipo de usuario eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar tipo de usuario:', error.message);
    res.status(500).json({ error: 'Error del servidor al eliminar tipo de usuario' });
  }
};