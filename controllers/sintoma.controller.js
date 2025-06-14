import { getSintomas, createSintoma, updateSintoma, deleteSintoma, getSintomasPorUsuarioCreador, deleteSintomaYRegistros } from '../models/sintoma.model.js';

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

//Obtener todos los sintomas por usuario
export const obtenerSintomasPorUsuarioCreador = async (req, res) => {
  const { idUsuarioCreador } = req.params;
  if (!idUsuarioCreador) {
    return res.status(400).json({ error: 'Falta el idUsuarioCreador' });
  }
  try {
    const sintomas = await getSintomasPorUsuarioCreador(idUsuarioCreador);
    res.status(200).json(sintomas);
  } catch (error) {
    console.error('Error al obtener síntomas por usuario creador:', error.message);
    res.status(500).json({ error: 'Error del servidor al obtener síntomas por usuario creador' });
  }
};


// Crear un nuevo síntoma
export const crearSintoma = async (req, res) => {
  const { nombreSintoma, idUsuarioCreador } = req.body;
  if (!nombreSintoma || !idUsuarioCreador) {
    return res.status(400).json({ error: 'Faltan datos requeridos' });
  }
  try {
    // Verificar si ya existe un síntoma con ese nombre
    const sintomasExistentes = await getSintomas();
    const existe = sintomasExistentes.some(
      s => s.nombre_sintoma.trim().toLowerCase() === nombreSintoma.trim().toLowerCase()
    );
    if (existe) {
      return res.status(409).json({ error: 'El síntoma ya existe' });
    }

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

// Eliminar (desactivar) sintoma y registro sintoma

export const eliminarSintomaYRegistros = async (req, res) => {
  const { id } = req.params;
  try {
    await deleteSintomaYRegistros(id);
    res.status(200).json({ message: 'Síntoma y registros eliminados correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar síntoma y registros' });
  }
};