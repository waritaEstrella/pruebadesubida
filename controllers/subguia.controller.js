import {
  createSubguia,
  getSubguiasPorGuia,
  updateSubguia,
  deleteSubguia
} from '../models/subguia.model.js';

// Obtener subguías por guía
export const obtenerSubguiasPorGuia = async (req, res) => {
  const { idGuia } = req.params;
  if (!idGuia) {
    return res.status(400).json({ error: 'Falta el idGuia' });
  }
  try {
    const subguias = await getSubguiasPorGuia(idGuia);
    res.status(200).json(subguias);
  } catch (error) {
    console.error('Error al obtener subguías:', error.message);
    res.status(500).json({ error: 'Error del servidor al obtener subguías' });
  }
};

// Crear subguía
export const crearSubguia = async (req, res) => {
  const {
    idGuia,
    subtitulo,
    descripcion
  } = req.body;
  if (!idGuia || !subtitulo || !descripcion) {
    return res.status(400).json({ error: 'Faltan datos requeridos' });
  }
  try {
    const subguia = await createSubguia({
      idGuia,
      subtitulo,
      descripcion
    });
    res.status(201).json(subguia);
  } catch (error) {
    console.error('Error al crear subguía:', error.message);
    res.status(500).json({ error: 'Error del servidor al crear subguía' });
  }
};

// Actualizar subguía
export const actualizarSubguia = async (req, res) => {
  const { id } = req.params;
  const {
    subtitulo,
    descripcion
  } = req.body;
  if (!subtitulo || !descripcion) {
    return res.status(400).json({ error: 'Faltan datos requeridos' });
  }
  try {
    const subguia = await updateSubguia(id, {
      subtitulo,
      descripcion
    });
    res.status(200).json(subguia);
  } catch (error) {
    console.error('Error al actualizar subguía:', error.message);
    res.status(500).json({ error: 'Error del servidor al actualizar subguía' });
  }
};

// Eliminar subguía (borrado físico)
export const eliminarSubguia = async (req, res) => {
  const { id } = req.params;
  try {
    await deleteSubguia(id);
    res.status(200).json({ mensaje: 'Subguía eliminada correctamente' });
  } catch (error) {
    console.error('Error al eliminar subguía:', error.message);
    res.status(500).json({ error: 'Error del servidor al eliminar subguía' });
  }
};