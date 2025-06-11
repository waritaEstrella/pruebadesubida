import {
  createGuia,
  getGuias,
  updateGuia,
  deleteGuia
} from '../models/guia.model.js';

// Obtener todas las guías
export const obtenerGuias = async (req, res) => {
  try {
    const guias = await getGuias();
    res.status(200).json(guias);
  } catch (error) {
    console.error('Error al obtener guías:', error.message);
    res.status(500).json({ error: 'Error del servidor al obtener guías' });
  }
};

// Crear guía
export const crearGuia = async (req, res) => {
  const {
    titulo,
    imagenPresentacion,
    tipoUsuario,
    edadMinimaMeses = null,
    edadMaximaMeses = null,
    idUsuarioCreador
  } = req.body;
  if (!titulo || !tipoUsuario || !idUsuarioCreador) {
    return res.status(400).json({ error: 'Faltan datos requeridos' });
  }
  try {
    const guia = await createGuia({
      titulo,
      imagenPresentacion,
      tipoUsuario,
      edadMinimaMeses,
      edadMaximaMeses,
      idUsuarioCreador
    });
    res.status(201).json(guia);
  } catch (error) {
    console.error('Error al crear guía:', error.message);
    res.status(500).json({ error: 'Error del servidor al crear guía' });
  }
};

// Actualizar guía
export const actualizarGuia = async (req, res) => {
  const { id } = req.params;
  const {
    titulo,
    imagenPresentacion,
    tipoUsuario,
    edadMinimaMeses = null,
    edadMaximaMeses = null
  } = req.body;
  if (!titulo || !tipoUsuario) {
    return res.status(400).json({ error: 'Faltan datos requeridos' });
  }
  try {
    const guia = await updateGuia(id, {
      titulo,
      imagenPresentacion,
      tipoUsuario,
      edadMinimaMeses,
      edadMaximaMeses
    });
    res.status(200).json(guia);
  } catch (error) {
    console.error('Error al actualizar guía:', error.message);
    res.status(500).json({ error: 'Error del servidor al actualizar guía' });
  }
};

// Eliminar guía (borrado físico)
export const eliminarGuia = async (req, res) => {
  const { id } = req.params;
  try {
    await deleteGuia(id);
    res.status(200).json({ mensaje: 'Guía eliminada correctamente' });
  } catch (error) {
    console.error('Error al eliminar guía:', error.message);
    res.status(500).json({ error: 'Error del servidor al eliminar guía' });
  }
};