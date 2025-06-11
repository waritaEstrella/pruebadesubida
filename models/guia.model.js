import { pool } from '../config/db.js';

// Crear guía
export const createGuia = async ({
  titulo,
  imagenPresentacion,
  tipoUsuario,
  edadMinimaMeses = null,
  edadMaximaMeses = null,
  idUsuarioCreador
}) => {
  const res = await pool.query(
    `INSERT INTO guia (
      titulo, imagen_presentacion, tipo_usuario, edad_minima_meses, edad_maxima_meses, id_usuario_creador
    ) VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *`,
    [titulo, imagenPresentacion, tipoUsuario, edadMinimaMeses, edadMaximaMeses, idUsuarioCreador]
  );
  return res.rows[0];
};

// Obtener todas las guías
export const getGuias = async () => {
  const res = await pool.query(
    'SELECT * FROM guia'
  );
  return res.rows;
};

// Actualizar guía
export const updateGuia = async (id, {
  titulo,
  imagenPresentacion,
  tipoUsuario,
  edadMinimaMeses = null,
  edadMaximaMeses = null
}) => {
  const res = await pool.query(
    `UPDATE guia
     SET titulo = $1,
         imagen_presentacion = $2,
         tipo_usuario = $3,
         edad_minima_meses = $4,
         edad_maxima_meses = $5,
         actualizado_en = NOW()
     WHERE id = $6
     RETURNING *`,
    [titulo, imagenPresentacion, tipoUsuario, edadMinimaMeses, edadMaximaMeses, id]
  );
  return res.rows[0];
};

// Eliminar guía (borrado físico)
export const deleteGuia = async (id) => {
  await pool.query(
    'DELETE FROM guia WHERE id = $1',
    [id]
  );
};