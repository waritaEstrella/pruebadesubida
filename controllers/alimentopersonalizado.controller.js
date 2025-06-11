import {
  createAlimentoPersonalizado,
  getAlimentosPersonalizadosPorHijo,
  updateAlimentoPersonalizado,
  deleteAlimentoPersonalizado
} from '../models/alimentopersonalizado.model.js';

// Obtener alimentos personalizados por hijo
export const obtenerAlimentosPersonalizadosPorHijo = async (req, res) => {
  const { idHijo } = req.params;
  if (!idHijo) {
    return res.status(400).json({ error: 'Falta el idHijo' });
  }
  try {
    const alimentos = await getAlimentosPersonalizadosPorHijo(idHijo);
    res.status(200).json(alimentos);
  } catch (error) {
    console.error('Error al obtener alimentos personalizados:', error.message);
    res.status(500).json({ error: 'Error del servidor al obtener alimentos personalizados' });
  }
};

// Crear alimento personalizado
export const crearAlimentoPersonalizado = async (req, res) => {
  const {
    idUsuario,
    idHijo = null,
    nombre,
    tipoAlimentacion,
    ingredientes,
    modoPreparacion
  } = req.body;
  if (!idUsuario || !nombre) {
    return res.status(400).json({ error: 'Faltan datos requeridos' });
  }
  try {
    const alimento = await createAlimentoPersonalizado({
      idUsuario,
      idHijo,
      nombre,
      tipoAlimentacion,
      ingredientes,
      modoPreparacion
    });
    res.status(201).json(alimento);
  } catch (error) {
    console.error('Error al crear alimento personalizado:', error.message);
    res.status(500).json({ error: 'Error del servidor al crear alimento personalizado' });
  }
};

// Actualizar alimento personalizado
export const actualizarAlimentoPersonalizado = async (req, res) => {
  const { id } = req.params;
  const {
    nombre,
    tipoAlimentacion,
    ingredientes,
    modoPreparacion
  } = req.body;
  if (!nombre) {
    return res.status(400).json({ error: 'Faltan datos requeridos' });
  }
  try {
    const alimento = await updateAlimentoPersonalizado(id, {
      nombre,
      tipoAlimentacion,
      ingredientes,
      modoPreparacion
    });
    res.status(200).json(alimento);
  } catch (error) {
    console.error('Error al actualizar alimento personalizado:', error.message);
    res.status(500).json({ error: 'Error del servidor al actualizar alimento personalizado' });
  }
};

// Eliminar (desactivar) alimento personalizado
export const eliminarAlimentoPersonalizado = async (req, res) => {
  const { id } = req.params;
  try {
    await deleteAlimentoPersonalizado(id);
    res.status(200).json({ mensaje: 'Alimento personalizado eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar alimento personalizado:', error.message);
    res.status(500).json({ error: 'Error del servidor al eliminar alimento personalizado' });
  }
};