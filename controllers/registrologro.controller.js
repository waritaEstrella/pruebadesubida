import {
  createRegistroLogro,
  getRegistrosLogroPorHijo,
  updateRegistroLogro,
  deleteRegistroLogro
} from '../models/registrologro.model.js';

// Obtener registros de logros activos por hijo
export const obtenerRegistrosLogroPorHijo = async (req, res) => {
  const { idHijo } = req.params;
  if (!idHijo) {
    return res.status(400).json({ error: 'Falta el idHijo' });
  }
  try {
    const registros = await getRegistrosLogroPorHijo(idHijo);
    res.status(200).json(registros);
  } catch (error) {
    console.error('Error al obtener registros de logros:', error.message);
    res.status(500).json({ error: 'Error del servidor al obtener registros de logros' });
  }
};

// Crear registro de logro
export const crearRegistroLogro = async (req, res) => {
  const {
    idHijo,
    fecha,
    idLogro,
    imagenLogro,
    descripcionMomento,
    idUsuarioCreador
  } = req.body;
  if (!idHijo || !fecha || !idLogro || !idUsuarioCreador) {
    return res.status(400).json({ error: 'Faltan datos requeridos' });
  }
  try {
    const registro = await createRegistroLogro({
      idHijo,
      fecha,
      idLogro,
      imagenLogro,
      descripcionMomento,
      idUsuarioCreador
    });
    res.status(201).json(registro);
  } catch (error) {
    console.error('Error al crear registro de logro:', error.message);
    res.status(500).json({ error: 'Error del servidor al crear registro de logro' });
  }
};

// Actualizar registro de logro
export const actualizarRegistroLogro = async (req, res) => {
  const { id } = req.params;
  const {
    fecha,
    idLogro,
    imagenLogro,
    descripcionMomento,
    idUsuarioEditor
  } = req.body;
  if (!fecha || !idLogro || !idUsuarioEditor) {
    return res.status(400).json({ error: 'Faltan datos requeridos' });
  }
  try {
    const registro = await updateRegistroLogro(id, {
      fecha,
      idLogro,
      imagenLogro,
      descripcionMomento,
      idUsuarioEditor
    });
    res.status(200).json(registro);
  } catch (error) {
    console.error('Error al actualizar registro de logro:', error.message);
    res.status(500).json({ error: 'Error del servidor al actualizar registro de logro' });
  }
};

// Eliminar (desactivar) registro de logro
export const eliminarRegistroLogro = async (req, res) => {
  const { id } = req.params;
  try {
    await deleteRegistroLogro(id);
    res.status(200).json({ mensaje: 'Registro de logro eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar registro de logro:', error.message);
    res.status(500).json({ error: 'Error del servidor al eliminar registro de logro' });
  }
};