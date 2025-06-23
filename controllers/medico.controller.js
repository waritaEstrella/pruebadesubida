import {
  createMedico,
  getMedicos,
  updateMedico,
  deleteMedico,
  getMedicosPorUsuarioCreador
} from '../models/medico.model.js';

// Obtener médicos activos
export const obtenerMedicos = async (req, res) => {
  try {
    const medicos = await getMedicos();
    res.status(200).json(medicos);
  } catch (error) {
    console.error('Error al obtener médicos:', error.message);
    res.status(500).json({ error: 'Error del servidor al obtener médicos' });
  }
};

//Obtener medicos por usuario
export const obtenerMedicoPorUsuarioCreador = async (req, res) => {
  const { idUsuarioCreador } = req.params;
  if (!idUsuarioCreador) {
    return res.status(400).json({ error: 'Falta el idUsuarioCreador' });
  }
  try {
    const medicos = await getMedicosPorUsuarioCreador(idUsuarioCreador);
    res.status(200).json(medicos);
  } catch (error) {
    console.error('Error al obtener medicos por usuario creador:', error.message);
    res.status(500).json({ error: 'Error del servidor al obtener medicos por usuario creador' });
  }
};

// Crear médico
export const crearMedico = async (req, res) => {
  const {
    centroMedico,
    nombreEspecialista,
    direccion,
    telefono,
    especialidad,
    idUsuario,
    idUsuarioCreador
  } = req.body;
  if (!centroMedico || !nombreEspecialista || !idUsuario || !idUsuarioCreador) {
    return res.status(400).json({ error: 'Faltan datos requeridos' });
  }
  try {
    const medico = await createMedico({
      centroMedico,
      nombreEspecialista,
      direccion,
      telefono,
      especialidad,
      idUsuario,
      idUsuarioCreador
    });
    res.status(201).json(medico);
  } catch (error) {
    console.error('Error al crear médico:', error.message);
    res.status(500).json({ error: 'Error del servidor al crear médico' });
  }
};

// Actualizar médico
export const actualizarMedico = async (req, res) => {
  const { id } = req.params;
  const {
    centroMedico,
    nombreEspecialista,
    direccion,
    telefono,
    especialidad,
    idUsuarioEditor
  } = req.body;
  if (!centroMedico || !nombreEspecialista || !idUsuarioEditor) {
    return res.status(400).json({ error: 'Faltan datos requeridos' });
  }
  try {
    const medico = await updateMedico(id, {
      centroMedico,
      nombreEspecialista,
      direccion,
      telefono,
      especialidad,
      idUsuarioEditor
    });
    res.status(200).json(medico);
  } catch (error) {
    console.error('Error al actualizar médico:', error.message);
    res.status(500).json({ error: 'Error del servidor al actualizar médico' });
  }
};

// Eliminar (desactivar) médico
export const eliminarMedico = async (req, res) => {
  const { id } = req.params;
  try {
    await deleteMedico(id);
    res.status(200).json({ mensaje: 'Médico eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar médico:', error.message);
    res.status(500).json({ error: 'Error del servidor al eliminar médico' });
  }
};