import { pool } from '../config/db.js';

// Crear dato de embarazo
export const createDatoEmbarazo = async ({
  idUsuario,
  fechaUltimaRegla,
  fechaProbableParto,
  dias_embarazo,
  idUsuarioCreador
}) => {
  const res = await pool.query(
    `INSERT INTO dato_embarazo (
      id_usuario, fecha_ultima_regla, fecha_probable_parto, dias_embarazo, id_usuario_creador
    ) VALUES ($1, $2, $3, $4, $5)
    RETURNING *`,
    [idUsuario, fechaUltimaRegla, fechaProbableParto, dias_embarazo, idUsuarioCreador]
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
  diasEmbarazo,
  idUsuarioEditor
}) => {
  const res = await pool.query(
    `UPDATE dato_embarazo
     SET fecha_ultima_regla = $1,
         fecha_probable_parto = $2,
         dias_embarazo = $3,
         id_usuario_editor = $4,
         editado_en = NOW()
     WHERE id = $5
     RETURNING *`,
    [fechaUltimaRegla, fechaProbableParto, diasEmbarazo, idUsuarioEditor, id]
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