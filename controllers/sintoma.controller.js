import { getSintomas, createSintoma, updateSintoma, deleteSintoma } from '../models/sintoma.model.js';

// Obtener todos los síntomas activos
export const obtenerSintomas = async (req, res) => {
  try {
    const sintomas = await getSintomas();
    res.status(200).json(sintomas);
  } catch (error) {
    console.error('Error al obtener síntomas:', error.message);
    res.status(500).json({ error: 'Error del servidor al obtener síntomas' });
  }
};

// Crear un nuevo síntoma
export const crearSintoma = async (req, res) => {
  const { nombreSintoma, idUsuarioCreador } = req.body;
  if (!nombreSintoma) {
    return res.status(400).json({ error: 'Faltan datos requeridos' });
  }
  try {
    const sintoma = await createSintoma({ nombreSintoma, idUsuarioCreador });
    res.status(201).json(sintoma);
  } catch (error) {
    console.error('Error al crear síntoma:', error.message);
    res.status(500).json({ error: 'Error del servidor al crear síntoma' });
  }
};

// Actualizar síntoma
export const actualizarSintoma = async (req, res) => {
  const { id } = req.params;
  const { nombreSintoma, idUsuarioEditor } = req.body;
  if (!nombreSintoma || !idUsuarioEditor) {
    return res.status(400).json({ error: 'Faltan datos requeridos' });
  }
  try {
    const sintoma = await updateSintoma(id, { nombreSintoma, idUsuarioEditor });
    res.status(200).json(sintoma);
  } catch (error) {
    console.error('Error al actualizar síntoma:', error.message);
    res.status(500).json({ error: 'Error del servidor al actualizar síntoma' });
  }
};

// Eliminar (desactivar) síntoma
export const eliminarSintoma = async (req, res) => {
  const { id } = req.params;
  try {
    await deleteSintoma(id);
    res.status(200).json({ mensaje: 'Síntoma eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar síntoma:', error.message);
    res.status(500).json({ error: 'Error del servidor al eliminar síntoma' });
  }
};