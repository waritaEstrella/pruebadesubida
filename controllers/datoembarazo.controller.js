import {
  createDatoEmbarazo,
  getDatosEmbarazo,
  getDatosEmbarazoPorUsuario,
  updateDatoEmbarazo,
  deleteDatoEmbarazo
} from '../models/datoembarazo.model.js';

// Obtener datos de embarazo activos
export const obtenerDatosEmbarazo = async (req, res) => {
  try {
    const datos = await getDatosEmbarazo();
    res.status(200).json(datos);
  } catch (error) {
    console.error('Error al obtener datos de embarazo:', error.message);
    res.status(500).json({ error: 'Error del servidor al obtener datos de embarazo' });
  }
};

// Obtener datos de embarazo por usuaria
export const obtenerDatosEmbarazoPorUsuario = async (req, res) => {
  const { idUsuario } = req.params;
  if (!idUsuario) {
    return res.status(400).json({ error: 'Falta el idUsuario' });
  }
  try {
    const datos = await getDatosEmbarazoPorUsuario(idUsuario);
    res.status(200).json(datos);
  } catch (error) {
    console.error('Error al obtener datos de embarazo por usuaria:', error.message);
    res.status(500).json({ error: 'Error del servidor al obtener datos de embarazo por usuaria' });
  }
};

// Crear dato de embarazo
export const crearDatoEmbarazo = async (req, res) => {
  const {
    idUsuario,
    fechaUltimaRegla,
    fechaProbableParto,
    diasEmbarazo,
    idUsuarioCreador
  } = req.body;
  if (!idUsuario || !idUsuarioCreador) {
    return res.status(400).json({ error: 'Faltan datos requeridos' });
  }
  try {
    const dato = await createDatoEmbarazo({
      idUsuario,
      fechaUltimaRegla,
      fechaProbableParto,
      diasEmbarazo,
      idUsuarioCreador
    });
    res.status(201).json(dato);
  } catch (error) {
    console.error('Error al crear dato de embarazo:', error.message);
    res.status(500).json({ error: 'Error del servidor al crear dato de embarazo' });
  }
};

// Actualizar dato de embarazo
export const actualizarDatoEmbarazo = async (req, res) => {
  const { id } = req.params;
  const {
    fechaUltimaRegla,
    fechaProbableParto,
    numeroEmbarazo,
    tratamientoEspecial,
    idUsuarioEditor
  } = req.body;
  if (!fechaUltimaRegla || !idUsuarioEditor) {
    return res.status(400).json({ error: 'Faltan datos requeridos' });
  }
  try {
    const dato = await updateDatoEmbarazo(id, {
      fechaUltimaRegla,
      fechaProbableParto,
      numeroEmbarazo,
      tratamientoEspecial,
      idUsuarioEditor
    });
    res.status(200).json(dato);
  } catch (error) {
    console.error('Error al actualizar dato de embarazo:', error.message);
    res.status(500).json({ error: 'Error del servidor al actualizar dato de embarazo' });
  }
};

// Eliminar (desactivar) dato de embarazo
export const eliminarDatoEmbarazo = async (req, res) => {
  const { id } = req.params;
  try {
    await deleteDatoEmbarazo(id);
    res.status(200).json({ mensaje: 'Dato de embarazo eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar dato de embarazo:', error.message);
    res.status(500).json({ error: 'Error del servidor al eliminar dato de embarazo' });
  }
};