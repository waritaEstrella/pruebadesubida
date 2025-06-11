import { pool } from '../config/db.js';

// Crear logro
export const createLogro = async ({
  nombreLogro,
  descripcion,
  edadRecomendadaMeses,
  idUsuarioCreador
}) => {
  const res = await pool.query(
    `INSERT INTO logro (
      nombre_logro, descripcion, edad_recomendada_meses, id_usuario_creador
    ) VALUES ($1, $2, $3, $4)
    RETURNING *`,
    [nombreLogro, descripcion, edadRecomendadaMeses, idUsuarioCreador]
  );
  return res.rows[0];
};

// Obtener logros activos
export const getLogros = async () => {
  const res = await pool.query(
    'SELECT * FROM logro WHERE estado = TRUE'
  );
  return res.rows;
};

// Actualizar logro
export const updateLogro = async (id, {
  nombreLogro,
  descripcion,
  edadRecomendadaMeses,
  idUsuarioEditor
}) => {
  const res = await pool.query(
    `UPDATE logro
     SET nombre_logro = $1,
         descripcion = $2,
         edad_recomendada_meses = $3,
         id_usuario_editor = $4,
         editado_en = NOW()
     WHERE id = $5
     RETURNING *`,
    [nombreLogro, descripcion, edadRecomendadaMeses, idUsuarioEditor, id]
  );
  return res.rows[0];
};

// Eliminar (desactivar) logro
export const deleteLogro = async (id) => {
  await pool.query(
    'UPDATE logro SET estado = FALSE WHERE id = $1',
    [id]
  );
};