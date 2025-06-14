import {
  createAntojo,
  getAntojos,
  updateAntojo,
  deleteAntojo,
  getAntojosPorUsuarioCreador,
} from '../models/antojo.model.js';

// Obtener todos los antojos activos
export const obtenerAntojos = async (req, res) => {
  try {
    const antojos = await getAntojos();
    res.status(200).json(antojos);
  } catch (error) {
    console.error('Error al obtener antojos:', error.message);
    res.status(500).json({ error: 'Error del servidor al obtener antojos' });
  }
};

//Obtener todos los antojos de un usuario
export const obtenerAntojoPorUsuarioCreador = async (req, res) => {
  const { idUsuarioCreador } = req.params;
  if (!idUsuarioCreador) {
    return res.status(400).json({ error: 'Falta el idUsuarioCreador' });
  }
  try {
    const antojos = await getAntojosPorUsuarioCreador(idUsuarioCreador);
    res.status(200).json(antojos);
  } catch (error) {
    console.error('Error al obtener antojos por usuario creador:', error.message);
    res.status(500).json({ error: 'Error del servidor al obtener antojos por usuario creador' });
  }
};

// Crear antojo
export const crearAntojo = async (req, res) => {
  const { tipoAntojo, idUsuarioCreador } = req.body;
  if (!tipoAntojo || !idUsuarioCreador) {
    return res.status(400).json({ error: 'Faltan datos requeridos' });
  }
  try {
    const antojo = await createAntojo({ tipoAntojo, idUsuarioCreador });
    res.status(201).json(antojo);
  } catch (error) {
    console.error('Error al crear antojo:', error.message);
    res.status(500).json({ error: 'Error del servidor al crear antojo' });
  }
};

// Actualizar antojo
export const actualizarAntojo = async (req, res) => {
  const { id } = req.params;
  const { tipoAntojo, idUsuarioEditor } = req.body;
  if (!tipoAntojo || !idUsuarioEditor) {
    return res.status(400).json({ error: 'Faltan datos requeridos' });
  }
  try {
    const antojo = await updateAntojo(id, { tipoAntojo, idUsuarioEditor });
    res.status(200).json(antojo);
  } catch (error) {
    console.error('Error al actualizar antojo:', error.message);
    res.status(500).json({ error: 'Error del servidor al actualizar antojo' });
  }
};

// Eliminar (desactivar) antojo
export const eliminarAntojo = async (req, res) => {
  const { id } = req.params;
  try {
    await deleteAntojo(id);
    res.status(200).json({ mensaje: 'Antojo eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar antojo:', error.message);
    res.status(500).json({ error: 'Error del servidor al eliminar antojo' });
  }
};