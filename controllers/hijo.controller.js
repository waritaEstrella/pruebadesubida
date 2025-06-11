import {
  createHijo,
  getHijos,
  getHijosPorUsuario,
  updateHijo,
  deleteHijo
} from '../models/hijo.model.js';

// Obtener hijos activos
export const obtenerHijos = async (req, res) => {
  try {
    const hijos = await getHijos();
    res.status(200).json(hijos);
  } catch (error) {
    console.error('Error al obtener hijos:', error.message);
    res.status(500).json({ error: 'Error del servidor al obtener hijos' });
  }
};

// Obtener hijos por usuario
export const obtenerHijosPorUsuario = async (req, res) => {
  const { idUsuario } = req.params;
  if (!idUsuario) {
    return res.status(400).json({ error: 'Falta el idUsuario' });
  }
  try {
    const hijos = await getHijosPorUsuario(idUsuario);
    res.status(200).json(hijos);
  } catch (error) {
    console.error('Error al obtener hijos por usuario:', error.message);
    res.status(500).json({ error: 'Error del servidor al obtener hijos por usuario' });
  }
};

// Crear hijo
export const crearHijo = async (req, res) => {
  const {
    fechaNacimiento,
    horaNacimiento,
    nombres,
    apPaterno,
    apMaterno,
    ci,
    sexo,
    grupoSanguineo,
    pesoNacimiento,
    tallaNacimiento,
    perimetroCefalico,
    apgar1min,
    apgar5min,
    tipoParto,
    idDatosEmbarazo,
    idUsuario,
    idUsuarioCreador
  } = req.body;
  if (!nombres || !idUsuario || !idUsuarioCreador) {
    return res.status(400).json({ error: 'Faltan datos requeridos' });
  }
  try {
    const hijo = await createHijo({
      fechaNacimiento,
      horaNacimiento,
      nombres,
      apPaterno,
      apMaterno,
      ci,
      sexo,
      grupoSanguineo,
      pesoNacimiento,
      tallaNacimiento,
      perimetroCefalico,
      apgar1min,
      apgar5min,
      tipoParto,
      idDatosEmbarazo,
      idUsuario,
      idUsuarioCreador
    });
    res.status(201).json(hijo);
  } catch (error) {
    console.error('Error al crear hijo:', error.message);
    res.status(500).json({ error: 'Error del servidor al crear hijo' });
  }
};

// Actualizar hijo
export const actualizarHijo = async (req, res) => {
  const { id } = req.params;
  const {
    fechaNacimiento,
    horaNacimiento,
    nombres,
    apPaterno,
    apMaterno,
    ci,
    sexo,
    grupoSanguineo,
    pesoNacimiento,
    tallaNacimiento,
    perimetroCefalico,
    apgar1min,
    apgar5min,
    tipoParto,
    idDatosEmbarazo,
    idUsuarioEditor
  } = req.body;
  if (!nombres || !idUsuarioEditor) {
    return res.status(400).json({ error: 'Faltan datos requeridos' });
  }
  try {
    const hijo = await updateHijo(id, {
      fechaNacimiento,
      horaNacimiento,
      nombres,
      apPaterno,
      apMaterno,
      ci,
      sexo,
      grupoSanguineo,
      pesoNacimiento,
      tallaNacimiento,
      perimetroCefalico,
      apgar1min,
      apgar5min,
      tipoParto,
      idDatosEmbarazo,
      idUsuarioEditor
    });
    res.status(200).json(hijo);
  } catch (error) {
    console.error('Error al actualizar hijo:', error.message);
    res.status(500).json({ error: 'Error del servidor al actualizar hijo' });
  }
};

// Eliminar (desactivar) hijo
export const eliminarHijo = async (req, res) => {
  const { id } = req.params;
  try {
    await deleteHijo(id);
    res.status(200).json({ mensaje: 'Hijo eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar hijo:', error.message);
    res.status(500).json({ error: 'Error del servidor al eliminar hijo' });
  }
};