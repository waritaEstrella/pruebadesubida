import { pool } from '../config/db.js';

// Crear registro de enfermedad
export const createRegistroEnfermedad = async ({
  idHijo,
  fecha,
  diagnostico,
  tratamiento,
  idMedico = null,
  idUsuarioCreador
}) => {
  const res = await pool.query(
    `INSERT INTO registro_enfermedad (
      id_hijo, fecha, diagnostico, tratamiento, id_medico, id_usuario_creador
    ) VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *`,
    [idHijo, fecha, diagnostico, tratamiento, idMedico, idUsuarioCreador]
  );
  return res.rows[0];
};

// Obtener registros de enfermedad activos por hijo
export const getRegistrosEnfermedadPorHijo = async (idHijo) => {
  const res = await pool.query(
    'SELECT * FROM registro_enfermedad WHERE id_hijo = $1 AND estado = TRUE ORDER BY fecha ASC',
    [idHijo]
  );
  return res.rows;
};

// Actualizar registro de enfermedad
export const updateRegistroEnfermedad = async (id, {
  fecha,
  diagnostico,
  tratamiento,
  idMedico = null,
  idUsuarioEditor
}) => {
  const res = await pool.query(
    `UPDATE registro_enfermedad
     SET fecha = $1,
         diagnostico = $2,
         tratamiento = $3,
         id_medico = $4,
         id_usuario_editor = $5,
         editado_en = NOW()
     WHERE id = $6
     RETURNING *`,
    [fecha, diagnostico, tratamiento, idMedico, idUsuarioEditor, id]
  );
  return res.rows[0];
};

// Eliminar (desactivar) registro de enfermedad
export const deleteRegistroEnfermedad = async (id) => {
  await pool.query(
    'UPDATE registro_enfermedad SET estado = FALSE WHERE id = $1',
    [id]
  );
};