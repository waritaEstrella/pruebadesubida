import { pool } from '../config/db.js';

// Crear relación usuario-tipo_usuario
export const createUsuarioTipoUsuario = async ({ idUsuario, idTipoUsuario }) => {
  const res = await pool.query(
    `INSERT INTO usuarios_tipo_usuario (id_usuario, id_tipo_usuario)
     VALUES ($1, $2)
     ON CONFLICT (id_usuario, id_tipo_usuario) DO NOTHING
     RETURNING *`,
    [idUsuario, idTipoUsuario]
  );
  return res.rows[0];
};

// Obtener tipos de usuario activos por usuario
export const getTiposUsuarioPorUsuario = async (idUsuario) => {
  const res = await pool.query(
    `SELECT tu.*
     FROM usuarios_tipo_usuario utu
     JOIN tipo_usuario tu ON tu.id = utu.id_tipo_usuario
     WHERE utu.id_usuario = $1 AND utu.activo = TRUE`,
    [idUsuario]
  );
  return res.rows;
};

// Desactivar relación usuario-tipo_usuario
export const deactivateUsuarioTipoUsuario = async ({ idUsuario, idTipoUsuario }) => {
  await pool.query(
    `UPDATE usuarios_tipo_usuario
     SET activo = FALSE
     WHERE id_usuario = $1 AND id_tipo_usuario = $2`,
    [idUsuario, idTipoUsuario]
  );
};