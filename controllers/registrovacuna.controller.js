import {
  createRegistroVacuna,
  getRegistrosVacunaPorHijo,
  updateRegistroVacuna,
  deleteRegistroVacuna
} from '../models/registrovacuna.model.js';

// Obtener registros de vacuna activos por hijo
export const obtenerRegistrosVacunaPorHijo = async (req, res) => {
  const { idHijo } = req.params;
  if (!idHijo) {
    return res.status(400).json({ error: 'Falta el idHijo' });
  }
  try {
    const registros = await getRegistrosVacunaPorHijo(idHijo);
    res.status(200).json(registros);
  } catch (error) {
    console.error('Error al obtener registros de vacuna:', error.message);
    res.status(500).json({ error: 'Error del servidor al obtener registros de vacuna' });
  }
};

// Crear registro de vacuna
export const crearRegistroVacuna = async (req, res) => {
  const {
    idCatalogoVacuna,
    idHijo,
    dosisActual,
    fechaProgramada,
    fechaAdministracion = null,
    administrado = false,
    notificacionEnviada = false,
    idUsuarioCreador
  } = req.body;
  if (!idCatalogoVacuna || !idHijo || !dosisActual || !fechaProgramada || !idUsuarioCreador) {
    return res.status(400).json({ error: 'Faltan datos requeridos' });
  }
  try {
    const registro = await createRegistroVacuna({
      idCatalogoVacuna,
      idHijo,
      dosisActual,
      fechaProgramada,
      fechaAdministracion,
      administrado,
      notificacionEnviada,
      idUsuarioCreador
    });
    res.status(201).json(registro);
  } catch (error) {
    console.error('Error al crear registro de vacuna:', error.message);
    res.status(500).json({ error: 'Error del servidor al crear registro de vacuna' });
  }
};

// Actualizar registro de vacuna
export const actualizarRegistroVacuna = async (req, res) => {
  const { id } = req.params;
  const {
    fechaAdministracion = null,
    administrado,
    notificacionEnviada,
    idUsuarioEditor
  } = req.body;
  if (typeof administrado === 'undefined' || typeof notificacionEnviada === 'undefined' || !idUsuarioEditor) {
    return res.status(400).json({ error: 'Faltan datos requeridos' });
  }
  try {
    const registro = await updateRegistroVacuna(id, {
      fechaAdministracion,
      administrado,
      notificacionEnviada,
      idUsuarioEditor
    });
    res.status(200).json(registro);
  } catch (error) {
    console.error('Error al actualizar registro de vacuna:', error.message);
    res.status(500).json({ error: 'Error del servidor al actualizar registro de vacuna' });
  }
};

// Eliminar (desactivar) registro de vacuna
export const eliminarRegistroVacuna = async (req, res) => {
  const { id } = req.params;
  try {
    await deleteRegistroVacuna(id);
    res.status(200).json({ mensaje: 'Registro de vacuna eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar registro de vacuna:', error.message);
    res.status(500).json({ error: 'Error del servidor al eliminar registro de vacuna' });
  }
};