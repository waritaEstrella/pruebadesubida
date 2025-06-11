import {
  createRegistroAlimentacion,
  getRegistrosAlimentacionPorHijo,
  updateRegistroAlimentacion,
  deleteRegistroAlimentacion
} from '../models/registroalimentacion.model.js';

// Obtener registros de alimentación por hijo
export const obtenerRegistrosAlimentacionPorHijo = async (req, res) => {
  const { idHijo } = req.params;
  if (!idHijo) {
    return res.status(400).json({ error: 'Falta el idHijo' });
  }
  try {
    const registros = await getRegistrosAlimentacionPorHijo(idHijo);
    res.status(200).json(registros);
  } catch (error) {
    console.error('Error al obtener registros de alimentación:', error.message);
    res.status(500).json({ error: 'Error del servidor al obtener registros de alimentación' });
  }
};

// Crear registro de alimentación
export const crearRegistroAlimentacion = async (req, res) => {
  const {
    idHijo,
    idAlimento = null,
    tipoAlimentacion,
    cantidad,
    tiempoEstimadoLactancia,
    cantidadAguaMl = null,
    cucharadasFormula = null,
    fecha,
    hora,
    idUsuarioCreador
  } = req.body;
  if (!idHijo || !tipoAlimentacion || !fecha || !hora || !idUsuarioCreador) {
    return res.status(400).json({ error: 'Faltan datos requeridos' });
  }
  try {
    const registro = await createRegistroAlimentacion({
      idHijo,
      idAlimento,
      tipoAlimentacion,
      cantidad,
      tiempoEstimadoLactancia,
      cantidadAguaMl,
      cucharadasFormula,
      fecha,
      hora,
      idUsuarioCreador
    });
    res.status(201).json(registro);
  } catch (error) {
    console.error('Error al crear registro de alimentación:', error.message);
    res.status(500).json({ error: 'Error del servidor al crear registro de alimentación' });
  }
};

// Actualizar registro de alimentación
export const actualizarRegistroAlimentacion = async (req, res) => {
  const { id } = req.params;
  const {
    idAlimento = null,
    tipoAlimentacion,
    cantidad,
    tiempoEstimadoLactancia,
    cantidadAguaMl = null,
    cucharadasFormula = null,
    fecha,
    hora,
    idUsuarioEditor
  } = req.body;
  if (!tipoAlimentacion || !fecha || !hora || !idUsuarioEditor) {
    return res.status(400).json({ error: 'Faltan datos requeridos' });
  }
  try {
    const registro = await updateRegistroAlimentacion(id, {
      idAlimento,
      tipoAlimentacion,
      cantidad,
      tiempoEstimadoLactancia,
      cantidadAguaMl,
      cucharadasFormula,
      fecha,
      hora,
      idUsuarioEditor
    });
    res.status(200).json(registro);
  } catch (error) {
    console.error('Error al actualizar registro de alimentación:', error.message);
    res.status(500).json({ error: 'Error del servidor al actualizar registro de alimentación' });
  }
};

// Eliminar (desactivar) registro de alimentación
export const eliminarRegistroAlimentacion = async (req, res) => {
  const { id } = req.params;
  try {
    await deleteRegistroAlimentacion(id);
    res.status(200).json({ mensaje: 'Registro de alimentación eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar registro de alimentación:', error.message);
    res.status(500).json({ error: 'Error del servidor al eliminar registro de alimentación' });
  }
};