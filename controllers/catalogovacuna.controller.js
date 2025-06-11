import {
  createRegistroEnfermedad,
  getRegistrosEnfermedadPorHijo,
  updateRegistroEnfermedad,
  deleteRegistroEnfermedad
} from '../models/registroenfermedad.model.js';

// Obtener registros de enfermedad activos por hijo
export const obtenerRegistrosEnfermedadPorHijo = async (req, res) => {
  const { idHijo } = req.params;
  if (!idHijo) {
    return res.status(400).json({ error: 'Falta el idHijo' });
  }
  try {
    const registros = await getRegistrosEnfermedadPorHijo(idHijo);
    res.status(200).json(registros);
  } catch (error) {
    console.error('Error al obtener registros de enfermedad:', error.message);
    res.status(500).json({ error: 'Error del servidor al obtener registros de enfermedad' });
  }
};

// Crear registro de enfermedad
export const crearRegistroEnfermedad = async (req, res) => {
  const {
    idHijo,
    fecha,
    diagnostico,
    tratamiento,
    idMedico = null,
    idUsuarioCreador
  } = req.body;
  if (!idHijo || !fecha || !diagnostico || !idUsuarioCreador) {
    return res.status(400).json({ error: 'Faltan datos requeridos' });
  }
  try {
    const registro = await createRegistroEnfermedad({
      idHijo,
      fecha,
      diagnostico,
      tratamiento,
      idMedico,
      idUsuarioCreador
    });
    res.status(201).json(registro);
  } catch (error) {
    console.error('Error al crear registro de enfermedad:', error.message);
    res.status(500).json({ error: 'Error del servidor al crear registro de enfermedad' });
  }
};

// Actualizar registro de enfermedad
export const actualizarRegistroEnfermedad = async (req, res) => {
  const { id } = req.params;
  const {
    fecha,
    diagnostico,
    tratamiento,
    idMedico = null,
    idUsuarioEditor
  } = req.body;
  if (!fecha || !diagnostico || !idUsuarioEditor) {
    return res.status(400).json({ error: 'Faltan datos requeridos' });
  }
  try {
    const registro = await updateRegistroEnfermedad(id, {
      fecha,
      diagnostico,
      tratamiento,
      idMedico,
      idUsuarioEditor
    });
    res.status(200).json(registro);
  } catch (error) {
    console.error('Error al actualizar registro de enfermedad:', error.message);
    res.status(500).json({ error: 'Error del servidor al actualizar registro de enfermedad' });
  }
};

// Eliminar (desactivar) registro de enfermedad
export const eliminarRegistroEnfermedad = async (req, res) => {
  const { id } = req.params;
  try {
    await deleteRegistroEnfermedad(id);
    res.status(200).json({ mensaje: 'Registro de enfermedad eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar registro de enfermedad:', error.message);
    res.status(500).json({ error: 'Error del servidor al eliminar registro de enfermedad' });
  }
};