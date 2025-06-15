import { pool } from '../config/db.js';

// Crear antojo
export const createAntojo = async ({
  tipoAntojo,
  idUsuarioCreador
}) => {
  const res = await pool.query(
    `INSERT INTO antojo (
      tipo_antojo, id_usuario_creador
    ) VALUES ($1, $2)
    RETURNING *`,
    [tipoAntojo, idUsuarioCreador]
  );
  return res.rows[0];
};

// Obtener todos los antojos activos
export const getAntojos = async () => {
  const res = await pool.query(
    'SELECT * FROM antojo WHERE estado = TRUE'
  );
  return res.rows;
};

//Obtener sintomas por usuario
export const getAntojosPorUsuarioCreador = async (idUsuarioCreador) => {
  const res = await pool.query(
    'SELECT * FROM antojo WHERE id_usuario_creador = $1 AND estado = TRUE',
    [idUsuarioCreador]
  );
  return res.rows;
};

// Actualizar antojo
export const updateAntojo = async (id, {
  tipoAntojo,
  idUsuarioEditor
}) => {
  const res = await pool.query(
    `UPDATE antojo
     SET tipo_antojo = $1,
         editado_en = NOW(),
         id_usuario_editor = $2
     WHERE id = $3
     RETURNING *`,
    [tipoAntojo, idUsuarioEditor, id]
  );
  return res.rows[0];
};

// Eliminar (desactivar) antojo
export const deleteAntojo = async (id) => {
  await pool.query(
    'UPDATE antojo SET estado = FALSE WHERE id = $1',
    [id]
  );
};

// Eliminar (desactivar) antojo y registro antojo
export const deleteAntojoYRegistros = async (id) => {
  await pool.query(
    'UPDATE REGISTRO_ANTOJO SET ESTADO = FALSE, EDITADO_EN = NOW() WHERE ID_ANTOJO = $1', [id]
  );

  await pool.query(
    'UPDATE ANTOJO SET ESTADO = FALSE, EDITADO_EN = NOW() WHERE ID = $1', [id]
  );
}