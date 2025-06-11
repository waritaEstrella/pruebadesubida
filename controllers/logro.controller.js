import {
  createLogro,
  getLogros,
  updateLogro,
  deleteLogro
} from '../models/logro.model.js';

// Obtener logros activos
export const obtenerLogros = async (req, res) => {
  try {
    const logros = await getLogros();
    res.status(200).json(logros);
  } catch (error) {
    console.error('Error al obtener logros:', error.message);
    res.status(500).json({ error: 'Error del servidor al obtener logros' });
  }
};

// Crear logro
export const crearLogro = async (req, res) => {
  const {
    nombreLogro,
    descripcion,
    edadRecomendadaMeses,
    idUsuarioCreador
  } = req.body;
  if (!nombreLogro || !idUsuarioCreador) {
    return res.status(400).json({ error: 'Faltan datos requeridos' });
  }
  try {
    const logro = await createLogro({
      nombreLogro,
      descripcion,
      edadRecomendadaMeses,
      idUsuarioCreador
    });
    res.status(201).json(logro);
  } catch (error) {
    console.error('Error al crear logro:', error.message);
    res.status(500).json({ error: 'Error del servidor al crear logro' });
  }
};

// Actualizar logro
export const actualizarLogro = async (req, res) => {
  const { id } = req.params;
  const {
    nombreLogro,
    descripcion,
    edadRecomendadaMeses,
    idUsuarioEditor
  } = req.body;
  if (!nombreLogro || !idUsuarioEditor) {
    return res.status(400).json({ error: 'Faltan datos requeridos' });
  }
  try {
    const logro = await updateLogro(id, {
      nombreLogro,
      descripcion,
      edadRecomendadaMeses,
      idUsuarioEditor
    });
    res.status(200).json(logro);
  } catch (error) {
    console.error('Error al actualizar logro:', error.message);
    res.status(500).json({ error: 'Error del servidor al actualizar logro' });
  }
};

// Eliminar (desactivar) logro
export const eliminarLogro = async (req, res) => {
  const { id } = req.params;
  try {
    await deleteLogro(id);
    res.status(200).json({ mensaje: 'Logro eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar logro:', error.message);
    res.status(500).json({ error: 'Error del servidor al eliminar logro' });
  }
};