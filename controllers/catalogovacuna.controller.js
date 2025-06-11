import {
  createCatalogoVacuna,
  getCatalogoVacunas,
  updateCatalogoVacuna,
  deleteCatalogoVacuna
} from '../models/catalogovacuna.model.js';

// Obtener todas las vacunas del catálogo
export const obtenerCatalogoVacunas = async (req, res) => {
  try {
    const vacunas = await getCatalogoVacunas();
    res.status(200).json(vacunas);
  } catch (error) {
    console.error('Error al obtener catálogo de vacunas:', error.message);
    res.status(500).json({ error: 'Error del servidor al obtener catálogo de vacunas' });
  }
};

// Crear vacuna en el catálogo
export const crearCatalogoVacuna = async (req, res) => {
  const {
    nombre,
    nroDosis,
    edadRecomendadaMeses,
    utilidad,
    intervaloDosisMeses
  } = req.body;
  if (!nombre || !nroDosis || !edadRecomendadaMeses || !intervaloDosisMeses) {
    return res.status(400).json({ error: 'Faltan datos requeridos' });
  }
  try {
    const vacuna = await createCatalogoVacuna({
      nombre,
      nroDosis,
      edadRecomendadaMeses,
      utilidad,
      intervaloDosisMeses
    });
    res.status(201).json(vacuna);
  } catch (error) {
    console.error('Error al crear vacuna en el catálogo:', error.message);
    res.status(500).json({ error: 'Error del servidor al crear vacuna en el catálogo' });
  }
};

// Actualizar vacuna del catálogo
export const actualizarCatalogoVacuna = async (req, res) => {
  const { id } = req.params;
  const {
    nombre,
    nroDosis,
    edadRecomendadaMeses,
    utilidad,
    intervaloDosisMeses
  } = req.body;
  if (!nombre || !nroDosis || !edadRecomendadaMeses || !intervaloDosisMeses) {
    return res.status(400).json({ error: 'Faltan datos requeridos' });
  }
  try {
    const vacuna = await updateCatalogoVacuna(id, {
      nombre,
      nroDosis,
      edadRecomendadaMeses,
      utilidad,
      intervaloDosisMeses
    });
    res.status(200).json(vacuna);
  } catch (error) {
    console.error('Error al actualizar vacuna del catálogo:', error.message);
    res.status(500).json({ error: 'Error del servidor al actualizar vacuna del catálogo' });
  }
};

// Eliminar vacuna del catálogo (borrado físico)
export const eliminarCatalogoVacuna = async (req, res) => {
  const { id } = req.params;
  try {
    await deleteCatalogoVacuna(id);
    res.status(200).json({ mensaje: 'Vacuna eliminada correctamente' });
  } catch (error) {
    console.error('Error al eliminar vacuna del catálogo:', error.message);
    res.status(500).json({ error: 'Error del servidor al eliminar vacuna del catálogo' });
  }
};