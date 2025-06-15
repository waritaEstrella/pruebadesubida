// filepath: backend/models/sintoma.model.js
import { pool } from '../config/db.js';

// Crear síntoma
export const createSintoma = async ({ nombreSintoma, idUsuarioCreador }) => {
  const res = await pool.query(
    `INSERT INTO SINTOMA (NOMBRE_SINTOMA, ID_USUARIO_CREADOR)
     VALUES ($1, $2)
     RETURNING *`,
    [nombreSintoma, idUsuarioCreador]
  );
  return res.rows[0];
};

// Obtener síntomas
export const getSintomas = async () => {
  const res = await pool.query('SELECT * FROM SINTOMA WHERE ESTADO = TRUE');
  return res.rows;
};

//Obtener sintomas por usuario
export const getSintomasPorUsuarioCreador = async (idUsuarioCreador) => {
  const res = await pool.query(
    'SELECT * FROM sintoma WHERE id_usuario_creador = $1 AND estado = TRUE',
    [idUsuarioCreador]
  );
  return res.rows;
};

// Actualizar síntoma
export const updateSintoma = async (id, { nombreSintoma, idUsuarioEditor }) => {
  const res = await pool.query(
    `UPDATE SINTOMA SET NOMBRE_SINTOMA = $1, ID_USUARIO_EDITOR = $2, EDITADO_EN = NOW()
     WHERE ID = $3 RETURNING *`,
    [nombreSintoma, idUsuarioEditor, id]
  );
  return res.rows[0];
};

// Eliminar síntoma
export const deleteSintoma = async (id) => {
  await pool.query('UPDATE SINTOMA SET ESTADO = FALSE WHERE ID = $1', [id]);
};

// Eliminar sintoma y sus registros
export const deleteSintomaYRegistros = async (id) => {
  await pool.query(
    'UPDATE REGISTRO_SINTOMA SET ESTADO = FALSE, EDITADO_EN = NOW() WHERE ID_SINTOMA = $1', [id]
  );

  await pool.query(
    'UPDATE SINTOMA SET ESTADO = FALSE, EDITADO_EN = NOW() WHERE ID = $1', [id]
  );
} 