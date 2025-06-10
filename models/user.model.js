import { pool } from '../config/db.js';

// ✅ Obtener usuario completo por correo
export const getUserByEmail = async (correo) => {
  const res = await pool.query('SELECT * FROM usuario WHERE correo = $1', [correo]);
  return res.rows[0];
};

// ✅ Crear usuario (ya no incluye tipo_usuario porque es otra tabla ahora)
export const createUser = async ({ nombre, ap_pat, ap_mat, correo, contrasena, fecha_nacimiento }) => {
  const res = await pool.query(
    `INSERT INTO usuario (nombre, ap_pat, ap_mat, correo, contrasena, fecha_nacimiento, verificado, creado_en)
     VALUES ($1, $2, $3, $4, $5, $6, FALSE, NOW())
     RETURNING *`,
    [nombre, ap_pat, ap_mat, correo, contrasena, fecha_nacimiento]
  );
  return res.rows[0];
};

// ✅ Insertar relación usuario - tipo_usuario
export const insertarTipoUsuario = async (idUsuario, idTipoUsuario) => {
  const res = await pool.query(
    `INSERT INTO usuarios_tipo_usuario (id_usuario, id_tipo_usuario)
     VALUES ($1, $2)
     ON CONFLICT (id_usuario, id_tipo_usuario) DO NOTHING`,
    [idUsuario, idTipoUsuario]
  );
  return res;
};

// ✅ Obtener tipos de usuario por ID de usuario
export const getTiposUsuarioPorId = async (idUsuario) => {
  const result = await pool.query(
    `SELECT tu.tipo_usuario 
     FROM usuarios_tipo_usuario utu
     JOIN tipo_usuario tu ON tu.id = utu.id_tipo_usuario
     WHERE utu.id_usuario = $1 AND utu.activo = true`,
    [idUsuario]
  );
  return result.rows.map(row => row.tipo_usuario);
};

// ✅ Actualizar último inicio de sesión
export const updateLastLogin = async (id) => {
  await pool.query(
    'UPDATE usuario SET ultimo_login = NOW() WHERE id = $1',
    [id]
  );
};

// ✅ Verificar correo
export const verifyEmail = async (correo) => {
  await pool.query(
    'UPDATE usuario SET verificado = TRUE WHERE correo = $1',
    [correo]
  );
};

// ✅ Restablecer contraseña
export const resetPassword = async (correo, newPass) => {
  await pool.query(
    'UPDATE usuario SET contrasena = $1 WHERE correo = $2',
    [newPass, correo]
  );
};

// Para obtener los IDs desde los nombres de tipo de usuario:
export const getTipoUsuarioIdsByNombres = async (tipos) => {
  const result = await pool.query(
    `SELECT id FROM tipo_usuario WHERE tipo_usuario = ANY($1::text[])`,
    [tipos]
  );
  return result.rows.map(row => row.id); // Devuelve [1, 2, ...]
};

// Marcar es_nuevo en falso
export const marcarUsuarioComoNoNuevo = async (idUsuario) => {
  await pool.query(
    `UPDATE usuario SET es_nuevo = FALSE WHERE id = $1`,
    [idUsuario]
  );
};



