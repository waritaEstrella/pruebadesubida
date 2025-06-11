import { pool } from '../config/db.js';

// Crear control prenatal
export const createControlPrenatal = async ({
  idMedico,
  nroControl,
  fecha,
  hora,
  notas,
  idUsuario,
  idUsuarioCreador
}) => {
  const res = await pool.query(
    `INSERT INTO control_prenatal (
      id_medico, nro_control, fecha, hora, notas, id_usuario, id_usuario_creador
    ) VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *`,
    [idMedico, nroControl, fecha, hora, notas, idUsuario, idUsuarioCreador]
  );
  return res.rows[0];
};

// Obtener controles prenatales activos
export const getControlesPrenatales = async () => {
  const res = await pool.query(
    'SELECT * FROM control_prenatal WHERE estado = TRUE'
  );
  return res.rows;
};

// Obtener controles prenatales por usuaria
export const getControlesPrenatalesPorUsuario = async (idUsuario) => {
  const res = await pool.query(
    'SELECT * FROM control_prenatal WHERE id_usuario = $1 AND estado = TRUE',
    [idUsuario]
  );
  return res.rows;
};

// Actualizar control prenatal
export const updateControlPrenatal = async (id, {
  nroControl,
  fecha,
  hora,
  notas,
  idMedico,
  idUsuarioEditor
}) => {
  const res = await pool.query(
    `UPDATE control_prenatal
     SET nro_control = $1,
         fecha = $2,
         hora = $3,
         notas = $4,
         id_medico = $5,
         id_usuario_editor = $6,
         editado_en = NOW()
     WHERE id = $7
     RETURNING *`,
    [nroControl, fecha, hora, notas, idMedico, idUsuarioEditor, id]
  );
  return res.rows[0];
};

// Eliminar (desactivar) control prenatal
export const deleteControlPrenatal = async (id) => {
  await pool.query(
    'UPDATE control_prenatal SET estado = FALSE WHERE id = $1',
    [id]
  );
};