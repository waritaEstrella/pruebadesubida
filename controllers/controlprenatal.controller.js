import {
  createControlPrenatal,
  getControlesPrenatales,
  getControlesPrenatalesPorUsuario,
  updateControlPrenatal,
  deleteControlPrenatal
} from '../models/controlprenatal.model.js';

// Obtener controles prenatales activos
export const obtenerControlesPrenatales = async (req, res) => {
  try {
    const controles = await getControlesPrenatales();
    res.status(200).json(controles);
  } catch (error) {
    console.error('Error al obtener controles prenatales:', error.message);
    res.status(500).json({ error: 'Error del servidor al obtener controles prenatales' });
  }
};

// Obtener controles prenatales por usuaria
export const obtenerControlesPrenatalesPorUsuario = async (req, res) => {
  const { idUsuario } = req.params;
  if (!idUsuario) {
    return res.status(400).json({ error: 'Falta el idUsuario' });
  }
  try {
    const controles = await getControlesPrenatalesPorUsuario(idUsuario);
    res.status(200).json(controles);
  } catch (error) {
    console.error('Error al obtener controles prenatales por usuaria:', error.message);
    res.status(500).json({ error: 'Error del servidor al obtener controles prenatales por usuaria' });
  }
};

// Crear control prenatal
export const crearControlPrenatal = async (req, res) => {
  const {
    idMedico,
    nroControl,
    fecha,
    hora,
    notas,
    idUsuario,
    idUsuarioCreador
  } = req.body;
  if (!idMedico || !fecha || !hora || !idUsuario || !idUsuarioCreador) {
    return res.status(400).json({ error: 'Faltan datos requeridos' });
  }
  try {
    const control = await createControlPrenatal({
      idMedico,
      nroControl,
      fecha,
      hora,
      notas,
      idUsuario,
      idUsuarioCreador
    });
    res.status(201).json(control);
  } catch (error) {
    console.error('Error al crear control prenatal:', error.message);
    res.status(500).json({ error: 'Error del servidor al crear control prenatal' });
  }
};

// Actualizar control prenatal
export const actualizarControlPrenatal = async (req, res) => {
  const { id } = req.params;
  const {
    nroControl,
    fecha,
    hora,
    notas,
    idMedico,
    idUsuarioEditor
  } = req.body;
  if (!fecha || !hora || !idMedico || !idUsuarioEditor) {
    return res.status(400).json({ error: 'Faltan datos requeridos' });
  }
  try {
    const control = await updateControlPrenatal(id, {
      nroControl,
      fecha,
      hora,
      notas,
      idMedico,
      idUsuarioEditor
    });
    res.status(200).json(control);
  } catch (error) {
    console.error('Error al actualizar control prenatal:', error.message);
    res.status(500).json({ error: 'Error del servidor al actualizar control prenatal' });
  }
};

// Eliminar (desactivar) control prenatal
export const eliminarControlPrenatal = async (req, res) => {
  const { id } = req.params;
  try {
    await deleteControlPrenatal(id);
    res.status(200).json({ mensaje: 'Control prenatal eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar control prenatal:', error.message);
    res.status(500).json({ error: 'Error del servidor al eliminar control prenatal' });
  }
};