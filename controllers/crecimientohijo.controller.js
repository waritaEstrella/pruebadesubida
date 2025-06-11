import {
  createCrecimientoHijo,
  getCrecimientoHijoPorHijo,
  updateCrecimientoHijo,
  deleteCrecimientoHijo
} from '../models/crecimientohijo.model.js';

// Obtener registros de crecimiento por hijo
export const obtenerCrecimientoHijoPorHijo = async (req, res) => {
  const { idHijo } = req.params;
  if (!idHijo) {
    return res.status(400).json({ error: 'Falta el idHijo' });
  }
  try {
    const registros = await getCrecimientoHijoPorHijo(idHijo);
    res.status(200).json(registros);
  } catch (error) {
    console.error('Error al obtener registros de crecimiento:', error.message);
    res.status(500).json({ error: 'Error del servidor al obtener registros de crecimiento' });
  }
};

// Crear registro de crecimiento
export const crearCrecimientoHijo = async (req, res) => {
  const {
    idHijo,
    fecha,
    peso,
    talla,
    observaciones,
    idControlPostnatal = null,
    idUsuarioRegistrador
  } = req.body;
  if (!idHijo || !fecha || !idUsuarioRegistrador) {
    return res.status(400).json({ error: 'Faltan datos requeridos' });
  }
  try {
    const registro = await createCrecimientoHijo({
      idHijo,
      fecha,
      peso,
      talla,
      observaciones,
      idControlPostnatal,
      idUsuarioRegistrador
    });
    res.status(201).json(registro);
  } catch (error) {
    console.error('Error al crear registro de crecimiento:', error.message);
    res.status(500).json({ error: 'Error del servidor al crear registro de crecimiento' });
  }
};

// Actualizar registro de crecimiento
export const actualizarCrecimientoHijo = async (req, res) => {
  const { id } = req.params;
  const {
    fecha,
    peso,
    talla,
    observaciones,
    idControlPostnatal
  } = req.body;
  if (!fecha) {
    return res.status(400).json({ error: 'Faltan datos requeridos' });
  }
  try {
    const registro = await updateCrecimientoHijo(id, {
      fecha,
      peso,
      talla,
      observaciones,
      idControlPostnatal
    });
    res.status(200).json(registro);
  } catch (error) {
    console.error('Error al actualizar registro de crecimiento:', error.message);
    res.status(500).json({ error: 'Error del servidor al actualizar registro de crecimiento' });
  }
};

// Eliminar registro de crecimiento (borrado físico)
export const eliminarCrecimientoHijo = async (req, res) => {
  const { id } = req.params;
  try {
    await deleteCrecimientoHijo(id);
    res.status(200).json({ mensaje: 'Registro de crecimiento eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar registro de crecimiento:', error.message);
    res.status(500).json({ error: 'Error del servidor al eliminar registro de crecimiento' });
  }
};