import { pool } from '../config/db.js';

// Crear alimento personalizado
export const createAlimentoPersonalizado = async ({
  idUsuario,
  idHijo = null,
  nombre,
  tipoAlimentacion,
  ingredientes,
  modoPreparacion
}) => {
  const res = await pool.query(
    `INSERT INTO alimento_personalizado (
      id_usuario, id_hijo, nombre, tipo_alimentacion, ingredientes, modo_preparacion
    ) VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *`,
    [idUsuario, idHijo, nombre, tipoAlimentacion, ingredientes, modoPreparacion]
  );
  return res.rows[0];
};

// Obtener alimentos personalizados por hijo
export const getAlimentosPersonalizadosPorHijo = async (idHijo) => {
  const res = await pool.query(
    'SELECT * FROM alimento_personalizado WHERE id_hijo = $1 AND estado = TRUE',
    [idHijo]
  );
  return res.rows;
};

// Actualizar alimento personalizado
export const updateAlimentoPersonalizado = async (id, {
  nombre,
  tipoAlimentacion,
  ingredientes,
  modoPreparacion
}) => {
  const res = await pool.query(
    `UPDATE alimento_personalizado
     SET nombre = $1,
         tipo_alimentacion = $2,
         ingredientes = $3,
         modo_preparacion = $4
     WHERE id = $5
     RETURNING *`,
    [nombre, tipoAlimentacion, ingredientes, modoPreparacion, id]
  );
  return res.rows[0];
};

// Eliminar (desactivar) alimento personalizado
export const deleteAlimentoPersonalizado = async (id) => {
  await pool.query(
    'UPDATE alimento_personalizado SET estado = FALSE WHERE id = $1',
    [id]
  );
};