import {
  createRegistroAntojo,
  getRegistrosAntojoPorUsuario,
  updateRegistroAntojo,
  deleteRegistroAntojo,
  getRegistrosAntojoPorUsuarioYFecha,
  getRegistrosAntojoPorUsuarioYAntojo
} from '../models/registroantojo.model.js';

// Obtener registros de antojo activos por usuario
export const obtenerRegistrosAntojoPorUsuario = async (req, res) => {
  const { idUsuario } = req.params;
  if (!idUsuario) {
    return res.status(400).json({ error: 'Falta el idUsuario' });
  }
  try {
    const registros = await getRegistrosAntojoPorUsuario(idUsuario);
    res.status(200).json(registros);
  } catch (error) {
    console.error('Error al obtener registros de antojo:', error.message);
    res.status(500).json({ error: 'Error del servidor al obtener registros de antojo' });
  }
};

// Crear registro de antojo
export const crearRegistroAntojo = async (req, res) => {
  const {
    idUsuario,
    idAntojo,
    descripcion,
    fecha,
    satisfecho,
    nota,
    idUsuarioCreador
  } = req.body;
  if (!idUsuario || !idAntojo || !descripcion || !fecha || !idUsuarioCreador) {
    return res.status(400).json({ error: 'Faltan datos requeridos' });
  }
  try {
    const registro = await createRegistroAntojo({
      idUsuario,
      idAntojo,
      descripcion,
      fecha,
      satisfecho,
      nota,
      idUsuarioCreador
    });
    res.status(201).json(registro);
  } catch (error) {
    console.error('Error al crear registro de antojo:', error.message);
    res.status(500).json({ error: 'Error del servidor al crear registro de antojo' });
  }
};

// Actualizar registro de antojo
export const actualizarRegistroAntojo = async (req, res) => {
  const { id } = req.params;
  const {
    idAntojo = null,
    descripcion,
    fecha,
    satisfecho,
    nota = null,
    idUsuarioEditor
  } = req.body;
  if (!descripcion || !fecha || typeof satisfecho === 'undefined' || !idUsuarioEditor) {
    return res.status(400).json({ error: 'Faltan datos requeridos' });
  }
  try {
    const registro = await updateRegistroAntojo(id, {
      idAntojo,
      descripcion,
      fecha,
      satisfecho,
      nota,
      idUsuarioEditor
    });
    res.status(200).json(registro);
  } catch (error) {
    console.error('Error al actualizar registro de antojo:', error.message);
    res.status(500).json({ error: 'Error del servidor al actualizar registro de antojo' });
  }
};

// Eliminar (desactivar) registro de antojo
export const eliminarRegistroAntojo = async (req, res) => {
  const { id } = req.params;
  try {
    await deleteRegistroAntojo(id);
    res.status(200).json({ mensaje: 'Registro de antojo eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar registro de antojo:', error.message);
    res.status(500).json({ error: 'Error del servidor al eliminar registro de antojo' });
  }
};

//Obtener registros de antojos por usuario y fecha
export const obtenerRegistrosAntojoPorUsuarioYFecha = async (req, res) => {
  const { idUsuario, fecha } = req.params;
  if (!idUsuario || !fecha) {
    return res.status(400).json({ error: 'Faltan datos requeridos' });
  }
  try {
    const registros = await getRegistrosAntojoPorUsuarioYFecha(idUsuario, fecha);
    res.status(200).json(registros);
  } catch (error) {
    console.error('Error al obtener registros de antojo por usuario y fecha:', error.message);
    res.status(500).json({ error: 'Error del servidor al obtener registros de antojo por usuario y fecha' });
  }
};

//Obtener registros de antojos por tipo de antojo
export const obtenerRegistrosAntojoPorUsuarioYAntojo = async (req, res) => {
  const { idUsuario, idAntojo } = req.params;
  if (!idUsuario || !idAntojo) {
    return res.status(400).json({ error: 'Faltan datos requeridos' });
  }
  try {
    const registros = await getRegistrosAntojoPorUsuarioYAntojo(idUsuario, idAntojo);
    res.status(200).json(registros);
  } catch (error) {
    console.error('Error al obtener registros de antojo por usuario y antojo:', error.message);
    res.status(500).json({ error: 'Error del servidor al obtener registros de antojo por usuario y antojo' });
  }
};




