import { pool } from '../config/db.js';

// Crear dato de embarazo
export const createDatoEmbarazo = async ({
  idUsuario,
  fechaUltimaRegla,
  fechaProbableParto,
  numeroEmbarazo = 1,
  tratamientoEspecial = false,
  idUsuarioCreador
}) => {
  const res = await pool.query(
    `INSERT INTO dato_embarazo (
      id_usuario, fecha_ultima_regla, fecha_probable_parto, numero_embarazo, tratamiento_especial, id_usuario_creador
    ) VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *`,
    [idUsuario, fechaUltimaRegla, fechaProbableParto, numeroEmbarazo, tratamientoEspecial, idUsuarioCreador]
  );
  return res.rows[0];
};

// Obtener datos de embarazo activos
export const getDatosEmbarazo = async () => {
  const res = await pool.query(
    'SELECT * FROM dato_embarazo WHERE estado = TRUE'
  );
  return res.rows;
};

// Obtener datos de embarazo por usuaria
export const getDatosEmbarazoPorUsuario = async (idUsuario) => {
  const res = await pool.query(
    'SELECT * FROM dato_embarazo WHERE id_usuario = $1 AND estado = TRUE',
    [idUsuario]
  );
  return res.rows;
};

// Actualizar dato de embarazo
export const updateDatoEmbarazo = async (id, {
  fechaUltimaRegla,
  fechaProbableParto,
  numeroEmbarazo,
  tratamientoEspecial,
  idUsuarioEditor
}) => {
  const res = await pool.query(
    `UPDATE dato_embarazo
     SET fecha_ultima_regla = $1,
         fecha_probable_parto = $2,
         numero_embarazo = $3,
         tratamiento_especial = $4,
         id_usuario_editor = $5,
         editado_en = NOW()
     WHERE id = $6
     RETURNING *`,
    [fechaUltimaRegla, fechaProbableParto, numeroEmbarazo, tratamientoEspecial, idUsuarioEditor, id]
  );
  return res.rows[0];
};

// Eliminar (desactivar) dato de embarazo
export const deleteDatoEmbarazo = async (id) => {
  await pool.query(
    'UPDATE dato_embarazo SET estado = FALSE WHERE id = $1',
    [id]
  );
};