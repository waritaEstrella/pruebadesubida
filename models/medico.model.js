import { pool } from '../config/db.js';

// Crear médico
export const createMedico = async ({
  centroMedico,
  nombreEspecialista,
  direccion,
  telefono,
  especialidad,
  idUsuario,
  idUsuarioCreador
}) => {
  const res = await pool.query(
    `INSERT INTO medico (
      centro_medico, nombre_especialista, direccion, telefono, especialidad, id_usuario, id_usuario_creador
    ) VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *`,
    [centroMedico, nombreEspecialista, direccion, telefono, especialidad, idUsuario, idUsuarioCreador]
  );
  return res.rows[0];
};

// Obtener médicos activos
export const getMedicos = async () => {
  const res = await pool.query(
    'SELECT * FROM medico WHERE estado = TRUE'
  );
  return res.rows;
};

// Actualizar médico
export const updateMedico = async (id, {
  centroMedico,
  nombreEspecialista,
  direccion,
  telefono,
  especialidad,
  idUsuarioEditor
}) => {
  const res = await pool.query(
    `UPDATE medico
     SET centro_medico = $1,
         nombre_especialista = $2,
         direccion = $3,
         telefono = $4,
         especialidad = $5,
         id_usuario_editor = $6,
         editado_en = NOW()
     WHERE id = $7
     RETURNING *`,
    [centroMedico, nombreEspecialista, direccion, telefono, especialidad, idUsuarioEditor, id]
  );
  return res.rows[0];
};

// Eliminar (desactivar) médico
export const deleteMedico = async (id) => {
  await pool.query(
    'UPDATE medico SET estado = FALSE WHERE id = $1',
    [id]
  );
};