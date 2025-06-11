import {
  createControlPostnatal,
  getControlesPostnatales,
  getControlesPostnatalesPorHijo,
  updateControlPostnatal,
  deleteControlPostnatal
} from '../models/controlpostnatal.model.js';

// Obtener controles postnatales activos
export const obtenerControlesPostnatales = async (req, res) => {
  try {
    const controles = await getControlesPostnatales();
    res.status(200).json(controles);
  } catch (error) {
    console.error('Error al obtener controles postnatales:', error.message);
    res.status(500).json({ error: 'Error del servidor al obtener controles postnatales' });
  }
};

// Obtener controles postnatales por hijo
export const obtenerControlesPostnatalesPorHijo = async (req, res) => {
  const { idHijo } = req.params;
  if (!idHijo) {
    return res.status(400).json({ error: 'Falta el idHijo' });
  }
  try {
    const controles = await getControlesPostnatalesPorHijo(idHijo);
    res.status(200).json(controles);
  } catch (error) {
    console.error('Error al obtener controles postnatales por hijo:', error.message);
    res.status(500).json({ error: 'Error del servidor al obtener controles postnatales por hijo' });
  }
};

// Crear control postnatal
export const crearControlPostnatal = async (req, res) => {
  const {
    idMedico,
    idHijo,
    nroControl,
    fecha,
    hora,
    notas,
    idUsuarioCreador
  } = req.body;
  if (!idMedico || !idHijo || !fecha || !hora || !idUsuarioCreador) {
    return res.status(400).json({ error: 'Faltan datos requeridos' });
  }
  try {
    const control = await createControlPostnatal({
      idMedico,
      idHijo,
      nroControl,
      fecha,
      hora,
      notas,
      idUsuarioCreador
    });
    res.status(201).json(control);
  } catch (error) {
    console.error('Error al crear control postnatal:', error.message);
    res.status(500).json({ error: 'Error del servidor al crear control postnatal' });
  }
};

// Actualizar control postnatal
export const actualizarControlPostnatal = async (req, res) => {
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
    const control = await updateControlPostnatal(id, {
      nroControl,
      fecha,
      hora,
      notas,
      idMedico,
      idUsuarioEditor
    });
    res.status(200).json(control);
  } catch (error) {
    console.error('Error al actualizar control postnatal:', error.message);
    res.status(500).json({ error: 'Error del servidor al actualizar control postnatal' });
  }
};

// Eliminar (desactivar) control postnatal
export const eliminarControlPostnatal = async (req, res) => {
  const { id } = req.params;
  try {
    await deleteControlPostnatal(id);
    res.status(200).json({ mensaje: 'Control postnatal eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar control postnatal:', error.message);
    res.status(500).json({ error: 'Error del servidor al eliminar control postnatal' });
  }
};