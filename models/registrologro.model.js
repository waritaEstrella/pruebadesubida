import { pool } from '../config/db.js';

// Crear registro de logro
export const createRegistroLogro = async ({
  idHijo,
  fecha,
  idLogro,
  imagenLogro,
  descripcionMomento,
  idUsuarioCreador
}) => {
  const res = await pool.query(
    `INSERT INTO registro_logro (
      id_hijo, fecha, id_logro, imagen_logro, descripcion_momento, id_usuario_creador
    ) VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *`,
    [idHijo, fecha, idLogro, imagenLogro, descripcionMomento, idUsuarioCreador]
  );
  return res.rows[0];
};

// Obtener registros de logros activos por hijo
export const getRegistrosLogroPorHijo = async (idHijo) => {
  const res = await pool.query(
    'SELECT * FROM registro_logro WHERE id_hijo = $1 AND estado = TRUE ORDER BY fecha ASC',
    [idHijo]
  );
  return res.rows;
};

// Actualizar registro de logro
export const updateRegistroLogro = async (id, {
  fecha,
  idLogro,
  imagenLogro,
  descripcionMomento,
  idUsuarioEditor
}) => {
  const res = await pool.query(
    `UPDATE registro_logro
     SET fecha = $1,
         id_logro = $2,
         imagen_logro = $3,
         descripcion_momento = $4,
         id_usuario_editor = $5,
         editado_en = NOW()
     WHERE id = $6
     RETURNING *`,
    [fecha, idLogro, imagenLogro, descripcionMomento, idUsuarioEditor, id]
  );
  return res.rows[0];
};

// Eliminar (desactivar) registro de logro
export const deleteRegistroLogro = async (id) => {
  await pool.query(
    'UPDATE registro_logro SET estado = FALSE WHERE id = $1',
    [id]
  );
};