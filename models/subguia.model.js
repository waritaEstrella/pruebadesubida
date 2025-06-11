import { pool } from '../config/db.js';

// Crear subguía
export const createSubguia = async ({
  idGuia,
  subtitulo,
  descripcion
}) => {
  const res = await pool.query(
    `INSERT INTO subguia (
      id_guia, subtitulo, descripcion
    ) VALUES ($1, $2, $3)
    RETURNING *`,
    [idGuia, subtitulo, descripcion]
  );
  return res.rows[0];
};

// Obtener subguías por guía
export const getSubguiasPorGuia = async (idGuia) => {
  const res = await pool.query(
    'SELECT * FROM subguia WHERE id_guia = $1',
    [idGuia]
  );
  return res.rows;
};

// Actualizar subguía
export const updateSubguia = async (id, {
  subtitulo,
  descripcion
}) => {
  const res = await pool.query(
    `UPDATE subguia
     SET subtitulo = $1,
         descripcion = $2
     WHERE id = $3
     RETURNING *`,
    [subtitulo, descripcion, id]
  );
  return res.rows[0];
};

// Eliminar subguía (borrado físico)
export const deleteSubguia = async (id) => {
  await pool.query(
    'DELETE FROM subguia WHERE id = $1',
    [id]
  );
};