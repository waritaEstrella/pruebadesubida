import { pool } from '../config/db.js';

// Crear registro de crecimiento de hijo
export const createCrecimientoHijo = async ({
  idHijo,
  fecha,
  peso,
  talla,
  observaciones,
  idControlPostnatal = null,
  idUsuarioRegistrador
}) => {
  const res = await pool.query(
    `INSERT INTO crecimiento_hijo (
      id_hijo, fecha, peso, talla, observaciones, id_control_postnatal, id_usuario_registrador
    ) VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *`,
    [idHijo, fecha, peso, talla, observaciones, idControlPostnatal, idUsuarioRegistrador]
  );
  return res.rows[0];
};

// Obtener registros de crecimiento por hijo
export const getCrecimientoHijoPorHijo = async (idHijo) => {
  const res = await pool.query(
    'SELECT * FROM crecimiento_hijo WHERE id_hijo = $1 ORDER BY fecha ASC',
    [idHijo]
  );
  return res.rows;
};

// Actualizar registro de crecimiento
export const updateCrecimientoHijo = async (id, {
  fecha,
  peso,
  talla,
  observaciones,
  idControlPostnatal
}) => {
  const res = await pool.query(
    `UPDATE crecimiento_hijo
     SET fecha = $1,
         peso = $2,
         talla = $3,
         observaciones = $4,
         id_control_postnatal = $5
     WHERE id = $6
     RETURNING *`,
    [fecha, peso, talla, observaciones, idControlPostnatal, id]
  );
  return res.rows[0];
};

// Eliminar registro de crecimiento (borrado físico)
export const deleteCrecimientoHijo = async (id) => {
  await pool.query(
    'DELETE FROM crecimiento_hijo WHERE id = $1',
    [id]
  );
};