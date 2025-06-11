import { pool } from '../config/db.js';

// Crear registro de antojo
export const createRegistroAntojo = async ({
  idUsuario,
  idAntojo = null,
  descripcion,
  fecha,
  satisfecho = false,
  nota = null,
  idUsuarioCreador
}) => {
  const res = await pool.query(
    `INSERT INTO registro_antojo (
      id_usuario, id_antojo, descripcion, fecha, satisfecho, nota, id_usuario_creador
    ) VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *`,
    [idUsuario, idAntojo, descripcion, fecha, satisfecho, nota, idUsuarioCreador]
  );
  return res.rows[0];
};

// Obtener todos los registros de antojo activos por usuario
export const getRegistrosAntojoPorUsuario = async (idUsuario) => {
  const res = await pool.query(
    `SELECT * FROM registro_antojo
     WHERE id_usuario = $1 AND estado = TRUE
     ORDER BY fecha DESC`,
    [idUsuario]
  );
  return res.rows;
};

// Actualizar registro de antojo
export const updateRegistroAntojo = async (id, {
  idAntojo = null,
  descripcion,
  fecha,
  satisfecho,
  nota = null,
  idUsuarioEditor
}) => {
  const res = await pool.query(
    `UPDATE registro_antojo
     SET id_antojo = $1,
         descripcion = $2,
         fecha = $3,
         satisfecho = $4,
         nota = $5,
         editado_en = NOW(),
         id_usuario_editor = $6
     WHERE id = $7
     RETURNING *`,
    [idAntojo, descripcion, fecha, satisfecho, nota, idUsuarioEditor, id]
  );
  return res.rows[0];
};

// Eliminar (desactivar) registro de antojo
export const deleteRegistroAntojo = async (id) => {
  await pool.query(
    'UPDATE registro_antojo SET estado = FALSE WHERE id = $1',
    [id]
  );
};

//Obtener registros de antojos por usuario y fecha
export const getRegistrosAntojoPorUsuarioYFecha = async (idUsuario, fecha) => {
  const res = await pool.query(
    `SELECT * FROM registro_antojo
     WHERE id_usuario = $1 AND fecha = $2 AND estado = TRUE
     ORDER BY creado_en DESC`,
    [idUsuario, fecha]
  );
  return res.rows;
};

//Obtener registros de antojos por usuario y antojo
export const getRegistrosAntojoPorUsuarioYAntojo = async (idUsuario, idAntojo) => {
  const res = await pool.query(
    `SELECT * FROM registro_antojo
     WHERE id_usuario = $1 AND id_antojo = $2 AND estado = TRUE
     ORDER BY fecha DESC, creado_en DESC`,
    [idUsuario, idAntojo]
  );
  return res.rows;
};
