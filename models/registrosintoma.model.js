import { pool } from '../config/db.js';

// Crear registro de síntoma
export const createRegistroSintoma = async ({
  idUsuario,
  idSintoma,
  descripcion,
  fecha,
  hora,
  duracionMin,
  idUsuarioCreador
}) => {
  const res = await pool.query(
    `INSERT INTO REGISTRO_SINTOMA (
      ID_USUARIO, ID_SINTOMA, DESCRIPCION, FECHA, HORA, DURACION_MIN, ID_USUARIO_CREADOR
    ) VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *`,
    [idUsuario, idSintoma, descripcion, fecha, hora, duracionMin, idUsuarioCreador]
  );
  return res.rows[0];
};

// Obtener registros de síntoma (solo activos)
export const getRegistrosSintoma = async () => {
  const res = await pool.query('SELECT * FROM REGISTRO_SINTOMA WHERE ESTADO = TRUE');
  return res.rows;
};

// Obtener registros de síntoma por usuario
export const getRegistrosSintomaPorUsuario = async (idUsuario) => {
  const res = await pool.query(
    'SELECT * FROM REGISTRO_SINTOMA WHERE ID_USUARIO = $1 AND ESTADO = TRUE',
    [idUsuario]
  );
  return res.rows;
};

// Actualizar registro de síntoma
export const updateRegistroSintoma = async (id, {
  descripcion,
  fecha,
  hora,
  duracionMin,
  idUsuarioEditor
}) => {
  const res = await pool.query(
    `UPDATE REGISTRO_SINTOMA
     SET DESCRIPCION = $1,
         FECHA = $2,
         HORA = $3,
         DURACION_MIN = $4,
         ID_USUARIO_EDITOR = $5,
         EDITADO_EN = NOW()
     WHERE ID = $6
     RETURNING *`,
    [descripcion, fecha, hora, duracionMin, idUsuarioEditor, id]
  );
  return res.rows[0];
};

// Eliminar (desactivar) registro de síntoma
export const deleteRegistroSintoma = async (id) => {
  await pool.query(
    'UPDATE REGISTRO_SINTOMA SET ESTADO = FALSE WHERE ID = $1',
    [id]
  );
};