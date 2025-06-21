import {
  createDatoEmbarazo,
  getDatosEmbarazo,
  getDatosEmbarazoPorUsuario,
  updateDatoEmbarazo,
  deleteDatoEmbarazo
} from '../models/datoembarazo.model.js';

import { pool } from '../config/db.js'; // Para la consulta directa en embarazo activo

// Obtener todos los embarazos activos (de todas las usuarias)
export const obtenerDatosEmbarazo = async (req, res) => {
  try {
    const datos = await getDatosEmbarazo();
    res.status(200).json(datos);
  } catch (error) {
    console.error('Error al obtener datos de embarazo:', error.message);
    res.status(500).json({ error: 'Error del servidor al obtener datos de embarazo' });
  }
};

// Obtener todos los embarazos activos por usuaria
export const obtenerDatosEmbarazoPorUsuario = async (req, res) => {
  const { idUsuario } = req.params;

  if (!idUsuario) {
    return res.status(400).json({ error: 'Falta el idUsuario' });
  }

  try {
    const datos = await getDatosEmbarazoPorUsuario(idUsuario);
    res.status(200).json(datos);
  } catch (error) {
    console.error('Error al obtener datos de embarazo por usuaria:', error.message);
    res.status(500).json({ error: 'Error del servidor al obtener datos de embarazo por usuaria' });
  }
};

// Obtener el embarazo activo de una usuaria
export const obtenerEmbarazoActivoPorUsuario = async (req, res) => {
  const { idUsuario } = req.params;

  if (!idUsuario) {
    return res.status(400).json({ error: 'Falta el idUsuario' });
  }

  try {
    const result = await pool.query(
      'SELECT * FROM dato_embarazo WHERE id_usuario = $1 AND estado = TRUE ORDER BY creado_en DESC LIMIT 1',
      [idUsuario]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'No se encontró un embarazo activo' });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error('Error al obtener embarazo activo:', error.message);
    res.status(500).json({ error: 'Error del servidor al obtener embarazo activo' });
  }
};

// Crear un nuevo dato de embarazo
export const crearDatoEmbarazo = async (req, res) => {
  const {
    id_usuario,
    fecha_ultima_regla,
    fecha_probable_parto,
    dias_embarazo,
    id_usuario_creador
  } = req.body;

  if (!id_usuario || !id_usuario_creador || !fecha_ultima_regla) {
    return res.status(400).json({ error: 'Faltan datos requeridos' });
  }

  try {
    // Verificamos si ya tiene un embarazo activo
    const activo = await pool.query(
      'SELECT * FROM dato_embarazo WHERE id_usuario = $1 AND estado = TRUE',
      [id_usuario]
    );

    if (activo.rows.length > 0) {
      return res.status(409).json({ error: 'Ya existe un embarazo activo para esta usuaria' });
    }

    const dato = await createDatoEmbarazo({
      id_usuario,
      fecha_ultima_regla,
      fecha_probable_parto,
      dias_embarazo,
      id_usuario_creador
    });

    res.status(201).json(dato);
  } catch (error) {
    console.error('Error al crear dato de embarazo:', error.message);
    res.status(500).json({ error: 'Error del servidor al crear dato de embarazo' });
  }
};

// Actualizar un dato de embarazo existente
export const actualizarDatoEmbarazo = async (req, res) => {
  const { id } = req.params;
  const {
    fecha_ultima_regla,
    fecha_probable_parto,
    dias_embarazo,
    id_usuario_editor
  } = req.body;

  if (!fecha_ultima_regla || !id_usuario_editor) {
    return res.status(400).json({ error: 'Faltan datos requeridos' });
  }

  try {
    const dato = await updateDatoEmbarazo(id, {
      fecha_ultima_regla,
      fecha_probable_parto,
      dias_embarazo,
      id_usuario_editor
    });

    res.status(200).json(dato);
  } catch (error) {
    console.error('Error al actualizar dato de embarazo:', error.message);
    res.status(500).json({ error: 'Error del servidor al actualizar dato de embarazo' });
  }
};

// Eliminar (desactivar) un dato de embarazo
export const eliminarDatoEmbarazo = async (req, res) => {
  const { id } = req.params;

  try {
    await deleteDatoEmbarazo(id);
    res.status(200).json({ mensaje: 'Dato de embarazo eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar dato de embarazo:', error.message);
    res.status(500).json({ error: 'Error del servidor al eliminar dato de embarazo' });
  }
};
