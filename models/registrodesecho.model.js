import { pool } from '../config/db.js';

// Crear registro de desecho
export const createRegistroDesecho = async ({
  idHijo,
  fecha,
  hora,
  usaPañal,
  hizoPipi,
  cantidadPipi,
  hizoPopo,
  estadoPopo,
  notas,
  idUsuarioCreador
}) => {
  const res = await pool.query(
    `INSERT INTO registro_desecho (
      id_hijo, fecha, hora, usa_pañal, hizo_pipi, cantidad_pipi, hizo_popo, estado_popo, notas, id_usuario_creador
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
    RETURNING *`,
    [idHijo, fecha, hora, usaPañal, hizoPipi, cantidadPipi, hizoPopo, estadoPopo, notas, idUsuarioCreador]
  );
  return res.rows[0];
};

// Obtener registros de desecho por hijo
export const getRegistrosDesechoPorHijo = async (idHijo) => {
  const res = await pool.query(
    'SELECT * FROM registro_desecho WHERE id_hijo = $1 AND estado = TRUE ORDER BY fecha, hora',
    [idHijo]
  );
  return res.rows;
};

// Actualizar registro de desecho
export const updateRegistroDesecho = async (id, {
  fecha,
  hora,
  usaPañal,
  hizoPipi,
  cantidadPipi,
  hizoPopo,
  estadoPopo,
  notas,
  idUsuarioEditor
}) => {
  const res = await pool.query(
    `UPDATE registro_desecho
     SET fecha = $1,
         hora = $2,
         usa_pañal = $3,
         hizo_pipi = $4,
         cantidad_pipi = $5,
         hizo_popo = $6,
         estado_popo = $7,
         notas = $8,
         id_usuario_editor = $9,
         editado_en = NOW()
     WHERE id = $10
     RETURNING *`,
    [fecha, hora, usaPañal, hizoPipi, cantidadPipi, hizoPopo, estadoPopo, notas, idUsuarioEditor, id]
  );
  return res.rows[0];
};

// Eliminar (desactivar) registro de desecho
export const deleteRegistroDesecho = async (id) => {
  await pool.query(
    'UPDATE registro_desecho SET estado = FALSE WHERE id = $1',
    [id]
  );
};