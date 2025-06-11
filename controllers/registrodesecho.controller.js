import {
  createRegistroDesecho,
  getRegistrosDesechoPorHijo,
  updateRegistroDesecho,
  deleteRegistroDesecho
} from '../models/registrodesecho.model.js';

// Obtener registros de desecho por hijo
export const obtenerRegistrosDesechoPorHijo = async (req, res) => {
  const { idHijo } = req.params;
  if (!idHijo) {
    return res.status(400).json({ error: 'Falta el idHijo' });
  }
  try {
    const registros = await getRegistrosDesechoPorHijo(idHijo);
    res.status(200).json(registros);
  } catch (error) {
    console.error('Error al obtener registros de desecho:', error.message);
    res.status(500).json({ error: 'Error del servidor al obtener registros de desecho' });
  }
};

// Crear registro de desecho
export const crearRegistroDesecho = async (req, res) => {
  const {
    idHijo,
    fecha,
    hora,
    usaPañal,
    hizoPipi,
    cantidadPipi,
    hizoPopo,
    estadoPopo,
    notas,
    idUsuarioCreador
  } = req.body;
  if (!idHijo || !fecha || !hora || !idUsuarioCreador) {
    return res.status(400).json({ error: 'Faltan datos requeridos' });
  }
  try {
    const registro = await createRegistroDesecho({
      idHijo,
      fecha,
      hora,
      usaPañal,
      hizoPipi,
      cantidadPipi,
      hizoPopo,
      estadoPopo,
      notas,
      idUsuarioCreador
    });
    res.status(201).json(registro);
  } catch (error) {
    console.error('Error al crear registro de desecho:', error.message);
    res.status(500).json({ error: 'Error del servidor al crear registro de desecho' });
  }
};

// Actualizar registro de desecho
export const actualizarRegistroDesecho = async (req, res) => {
  const { id } = req.params;
  const {
    fecha,
    hora,
    usaPañal,
    hizoPipi,
    cantidadPipi,
    hizoPopo,
    estadoPopo,
    notas,
    idUsuarioEditor
  } = req.body;
  if (!fecha || !hora || !idUsuarioEditor) {
    return res.status(400).json({ error: 'Faltan datos requeridos' });
  }
  try {
    const registro = await updateRegistroDesecho(id, {
      fecha,
      hora,
      usaPañal,
      hizoPipi,
      cantidadPipi,
      hizoPopo,
      estadoPopo,
      notas,
      idUsuarioEditor
    });
    res.status(200).json(registro);
  } catch (error) {
    console.error('Error al actualizar registro de desecho:', error.message);
    res.status(500).json({ error: 'Error del servidor al actualizar registro de desecho' });
  }
};

// Eliminar (desactivar) registro de desecho
export const eliminarRegistroDesecho = async (req, res) => {
  const { id } = req.params;
  try {
    await deleteRegistroDesecho(id);
    res.status(200).json({ mensaje: 'Registro de desecho eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar registro de desecho:', error.message);
    res.status(500).json({ error: 'Error del servidor al eliminar registro de desecho' });
  }
};