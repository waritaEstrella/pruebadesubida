import { pool } from '../config/db.js';

// Crear tipo de usuario
export const createTipoUsuario = async ({ tipoUsuario }) => {
  const res = await pool.query(
    `INSERT INTO tipo_usuario (tipo_usuario)
     VALUES ($1)
     RETURNING *`,
    [tipoUsuario]
  );
  return res.rows[0];
};

// Obtener todos los tipos de usuario activos
export const getTiposUsuario = async () => {
  const res = await pool.query(
    'SELECT * FROM tipo_usuario WHERE estado = TRUE'
  );
  return res.rows;
};

// Actualizar tipo de usuario
export const updateTipoUsuario = async (id, { tipoUsuario }) => {
  const res = await pool.query(
    `UPDATE tipo_usuario
     SET tipo_usuario = $1
     WHERE id = $2
     RETURNING *`,
    [tipoUsuario, id]
  );
  return res.rows[0];
};

// Eliminar (desactivar) tipo de usuario
export const deleteTipoUsuario = async (id) => {
  await pool.query(
    'UPDATE tipo_usuario SET estado = FALSE WHERE id = $1',
    [id]
  );
};