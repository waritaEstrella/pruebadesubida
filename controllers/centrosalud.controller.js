import {
  createCentroSalud,
  getCentrosSalud,
  updateCentroSalud,
  validarCentroSalud,
  deleteCentroSalud
} from '../models/centrosalud.model.js';

// Obtener centros de salud activos y validados
export const obtenerCentrosSalud = async (req, res) => {
  try {
    const centros = await getCentrosSalud();
    res.status(200).json(centros);
  } catch (error) {
    console.error('Error al obtener centros de salud:', error.message);
    res.status(500).json({ error: 'Error del servidor al obtener centros de salud' });
  }
};

// Crear centro de salud
export const crearCentroSalud = async (req, res) => {
  const {
    nombre,
    municipio,
    latitud,
    longitud,
    idUsuarioCreador
  } = req.body;
  if (!nombre || !municipio || !latitud || !longitud || !idUsuarioCreador) {
    return res.status(400).json({ error: 'Faltan datos requeridos' });
  }
  try {
    const centro = await createCentroSalud({
      nombre,
      municipio,
      latitud,
      longitud,
      idUsuarioCreador
    });
    res.status(201).json(centro);
  } catch (error) {
    console.error('Error al crear centro de salud:', error.message);
    res.status(500).json({ error: 'Error del servidor al crear centro de salud' });
  }
};

// Actualizar centro de salud
export const actualizarCentroSalud = async (req, res) => {
  const { id } = req.params;
  const {
    nombre,
    municipio,
    latitud,
    longitud,
    idUsuarioEditor
  } = req.body;
  if (!nombre || !municipio || !latitud || !longitud || !idUsuarioEditor) {
    return res.status(400).json({ error: 'Faltan datos requeridos' });
  }
  try {
    const centro = await updateCentroSalud(id, {
      nombre,
      municipio,
      latitud,
      longitud,
      idUsuarioEditor
    });
    res.status(200).json(centro);
  } catch (error) {
    console.error('Error al actualizar centro de salud:', error.message);
    res.status(500).json({ error: 'Error del servidor al actualizar centro de salud' });
  }
};

// Validar centro de salud
export const validarCentroSaludController = async (req, res) => {
  const { id } = req.params;
  try {
    const centro = await validarCentroSalud(id);
    res.status(200).json(centro);
  } catch (error) {
    console.error('Error al validar centro de salud:', error.message);
    res.status(500).json({ error: 'Error del servidor al validar centro de salud' });
  }
};

// Eliminar (desactivar) centro de salud
export const eliminarCentroSalud = async (req, res) => {
  const { id } = req.params;
  try {
    await deleteCentroSalud(id);
    res.status(200).json({ mensaje: 'Centro de salud eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar centro de salud:', error.message);
    res.status(500).json({ error: 'Error del servidor al eliminar centro de salud' });
  }
};