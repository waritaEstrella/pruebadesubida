import {
  createRegistroSintoma,
  getRegistrosSintoma,
  getRegistrosSintomaPorUsuario,
  updateRegistroSintoma,
  deleteRegistroSintoma
} from '../models/registrosintoma.model.js';

// Obtener todos los registros de síntoma activos
export const obtenerRegistrosSintoma = async (req, res) => {
  try {
    const registros = await getRegistrosSintoma();
    res.status(200).json(registros);
  } catch (error) {
    console.error('Error al obtener registros de síntoma:', error.message);
    res.status(500).json({ error: 'Error del servidor al obtener registros de síntoma' });
  }
};

// Obtener registros de síntoma por usuario
export const obtenerRegistrosSintomaPorUsuario = async (req, res) => {
  const { idUsuario } = req.params;
  if (!idUsuario) {
    return res.status(400).json({ error: 'Falta el idUsuario' });
  }
  try {
    const registros = await getRegistrosSintomaPorUsuario(idUsuario);
    res.status(200).json(registros);
  } catch (error) {
    console.error('Error al obtener registros de síntoma por usuario:', error.message);
    res.status(500).json({ error: 'Error del servidor al obtener registros de síntoma por usuario' });
  }
};

// Crear registro de síntoma
export const crearRegistroSintoma = async (req, res) => {
  const { idUsuario, idSintoma, descripcion, fecha, hora, duracionMin, idUsuarioCreador } = req.body;
  if (!idUsuario || !idSintoma || !fecha || !hora || !idUsuarioCreador) {
    return res.status(400).json({ error: 'Faltan datos requeridos' });
  }
  try {
    const registro = await createRegistroSintoma({
      idUsuario,
      idSintoma,
      descripcion,
      fecha,
      hora,
      duracionMin,
      idUsuarioCreador
    });
    res.status(201).json(registro);
  } catch (error) {
    console.error('Error al crear registro de síntoma:', error.message);
    res.status(500).json({ error: 'Error del servidor al crear registro de síntoma' });
  }
};

// Actualizar registro de síntoma
export const actualizarRegistroSintoma = async (req, res) => {
  const { id } = req.params;
  const { descripcion, fecha, hora, duracionMin, idUsuarioEditor } = req.body;
  if (!descripcion || !fecha || !hora || !idUsuarioEditor) {
    return res.status(400).json({ error: 'Faltan datos requeridos' });
  }
  try {
    const registro = await updateRegistroSintoma(id, {
      descripcion,
      fecha,
      hora,
      duracionMin,
      idUsuarioEditor
    });
    res.status(200).json(registro);
  } catch (error) {
    console.error('Error al actualizar registro de síntoma:', error.message);
    res.status(500).json({ error: 'Error del servidor al actualizar registro de síntoma' });
  }
};

// Eliminar (desactivar) registro de síntoma
export const eliminarRegistroSintoma = async (req, res) => {
  const { id } = req.params;
  try {
    await deleteRegistroSintoma(id);
    res.status(200).json({ mensaje: 'Registro de síntoma eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar registro de síntoma:', error.message);
    res.status(500).json({ error: 'Error del servidor al eliminar registro de síntoma' });
  }
};