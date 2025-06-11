import { pool } from '../config/db.js';

// Crear registro de alimentación
export const createRegistroAlimentacion = async ({
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
}) => {
  const res = await pool.query(
    `INSERT INTO registro_alimentacion (
      id_hijo, id_alimento, tipo_alimentacion, cantidad, tiempo_estimado_lactancia,
      cantidad_agua_ml, cucharadas_formula, fecha, hora, id_usuario_creador
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
    RETURNING *`,
    [
      idHijo, idAlimento, tipoAlimentacion, cantidad, tiempoEstimadoLactancia,
      cantidadAguaMl, cucharadasFormula, fecha, hora, idUsuarioCreador
    ]
  );
  return res.rows[0];
};

// Obtener registros de alimentación por hijo
export const getRegistrosAlimentacionPorHijo = async (idHijo) => {
  const res = await pool.query(
    'SELECT * FROM registro_alimentacion WHERE id_hijo = $1 AND estado = TRUE ORDER BY fecha, hora',
    [idHijo]
  );
  return res.rows;
};

// Actualizar registro de alimentación
export const updateRegistroAlimentacion = async (id, {
  idAlimento = null,
  tipoAlimentacion,
  cantidad,
  tiempoEstimadoLactancia,
  cantidadAguaMl = null,
  cucharadasFormula = null,
  fecha,
  hora,
  idUsuarioEditor
}) => {
  const res = await pool.query(
    `UPDATE registro_alimentacion
     SET id_alimento = $1,
         tipo_alimentacion = $2,
         cantidad = $3,
         tiempo_estimado_lactancia = $4,
         cantidad_agua_ml = $5,
         cucharadas_formula = $6,
         fecha = $7,
         hora = $8,
         id_usuario_editor = $9,
         editado_en = NOW()
     WHERE id = $10
     RETURNING *`,
    [
      idAlimento, tipoAlimentacion, cantidad, tiempoEstimadoLactancia,
      cantidadAguaMl, cucharadasFormula, fecha, hora, idUsuarioEditor, id
    ]
  );
  return res.rows[0];
};

// Eliminar (desactivar) registro de alimentación
export const deleteRegistroAlimentacion = async (id) => {
  await pool.query(
    'UPDATE registro_alimentacion SET estado = FALSE WHERE id = $1',
    [id]
  );
};