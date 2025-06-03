import { pool } from '../config/db.js';

export const getUserByEmail = async (correo) => {
  const res = await pool.query('SELECT * FROM usuarios WHERE correo=$1', [correo]);
  return res.rows[0];
};

export const createUser = async ({ nombre, ap_pat, ap_mat, correo, contrasena, fecha_nacimiento, tipo_usuario }) => {
  const res = await pool.query(
    `INSERT INTO usuarios (nombre, ap_pat, ap_mat, correo, contraseña, fecha_nacimiento, tipo_usuario, verificado, creado_en)
     VALUES ($1, $2, $3, $4, $5, $6, $7, FALSE, NOW())
     RETURNING *`,
    [nombre, ap_pat, ap_mat, correo, contrasena, fecha_nacimiento, tipo_usuario]
  );
  return res.rows[0];
};



export const updateLastLogin = async (id) => {
  await pool.query(
    'UPDATE usuarios SET ultimo_login = NOW() WHERE id = $1',
    [id]
  );
};

export const verifyEmail = async (correo) => {
  await pool.query(
    'UPDATE usuarios SET verificado = TRUE WHERE correo = $1',
    [correo]
  );
};

export const resetPassword = async (correo, newPass) => {
  await pool.query(
    'UPDATE usuarios SET contraseña = $1 WHERE correo = $2',
    [newPass, correo]
  );
};


// ✅ NUEVA FUNCIÓN para actualizar tipo_usuario
export const updateTipoUsuario = async (correo, tipo_usuario) => {
  await pool.query(
    'UPDATE usuarios SET tipo_usuario = $1 WHERE correo = $2',
    [tipo_usuario, correo]
  );
};
