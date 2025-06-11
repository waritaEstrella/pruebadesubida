import { pool } from '../config/db.js';

// Crear control postnatal
export const createControlPostnatal = async ({
  idMedico,
  idHijo,
  nroControl,
  fecha,
  hora,
  notas,
  idUsuarioCreador
}) => {
  const res = await pool.query(
    `INSERT INTO control_postnatal (
      id_medico, id_hijo, nro_control, fecha, hora, notas, id_usuario_creador
    ) VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *`,
    [idMedico, idHijo, nroControl, fecha, hora, notas, idUsuarioCreador]
  );
  return res.rows[0];
};

// Obtener controles postnatales activos
export const getControlesPostnatales = async () => {
  const res = await pool.query(
    'SELECT * FROM control_postnatal WHERE estado = TRUE'
  );
  return res.rows;
};

// Obtener controles postnatales por hijo
export const getControlesPostnatalesPorHijo = async (idHijo) => {
  const res = await pool.query(
    'SELECT * FROM control_postnatal WHERE id_hijo = $1 AND estado = TRUE',
    [idHijo]
  );
  return res.rows;
};

// Actualizar control postnatal
export const updateControlPostnatal = async (id, {
  nroControl,
  fecha,
  hora,
  notas,
  idMedico,
  idUsuarioEditor
}) => {
  const res = await pool.query(
    `UPDATE control_postnatal
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

// Eliminar (desactivar) control postnatal
export const deleteControlPostnatal = async (id) => {
  await pool.query(
    'UPDATE control_postnatal SET estado = FALSE WHERE id = $1',
    [id]
  );
};