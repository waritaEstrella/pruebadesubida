import {
  createImagenSubguia,
  getImagenesPorSubguia,
  updateImagenSubguia,
  deleteImagenSubguia
} from '../models/imagenessubguia.model.js';

// Obtener imágenes por subguía
export const obtenerImagenesPorSubguia = async (req, res) => {
  const { idSubguia } = req.params;
  if (!idSubguia) {
    return res.status(400).json({ error: 'Falta el idSubguia' });
  }
  try {
    const imagenes = await getImagenesPorSubguia(idSubguia);
    res.status(200).json(imagenes);
  } catch (error) {
    console.error('Error al obtener imágenes de subguía:', error.message);
    res.status(500).json({ error: 'Error del servidor al obtener imágenes de subguía' });
  }
};

// Crear imagen de subguía
export const crearImagenSubguia = async (req, res) => {
  const { idSubguia, urlImagen, descripcion } = req.body;
  if (!idSubguia || !urlImagen) {
    return res.status(400).json({ error: 'Faltan datos requeridos' });
  }
  try {
    const imagen = await createImagenSubguia({ idSubguia, urlImagen, descripcion });
    res.status(201).json(imagen);
  } catch (error) {
    console.error('Error al crear imagen de subguía:', error.message);
    res.status(500).json({ error: 'Error del servidor al crear imagen de subguía' });
  }
};

// Actualizar imagen de subguía
export const actualizarImagenSubguia = async (req, res) => {
  const { id } = req.params;
  const { urlImagen, descripcion } = req.body;
  if (!urlImagen) {
    return res.status(400).json({ error: 'Faltan datos requeridos' });
  }
  try {
    const imagen = await updateImagenSubguia(id, { urlImagen, descripcion });
    res.status(200).json(imagen);
  } catch (error) {
    console.error('Error al actualizar imagen de subguía:', error.message);
    res.status(500).json({ error: 'Error del servidor al actualizar imagen de subguía' });
  }
};

// Eliminar imagen de subguía (borrado físico)
export const eliminarImagenSubguia = async (req, res) => {
  const { id } = req.params;
  try {
    await deleteImagenSubguia(id);
    res.status(200).json({ mensaje: 'Imagen de subguía eliminada correctamente' });
  } catch (error) {
    console.error('Error al eliminar imagen de subguía:', error.message);
    res.status(500).json({ error: 'Error del servidor al eliminar imagen de subguía' });
  }
};