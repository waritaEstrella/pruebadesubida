import { pool } from '../config/db.js';

// Crear control agendado
export const createControlAgendado = async ({
  idUsuario,
  idHijo = null,
  tipoControl,
  fecha,
  hora,
  motivo,
  idMedico = null,
  idUsuarioCreador
}) => {
  const res = await pool.query(
    `INSERT INTO control_agendado (
      id_usuario, id_hijo, tipo_control, fecha, hora, motivo, id_medico, id_usuario_creador
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    RETURNING *`,
    [idUsuario, idHijo, tipoControl, fecha, hora, motivo, idMedico, idUsuarioCreador]
  );
  return res.rows[0];
};

// Obtener controles agendados activos
export const getControlesAgendados = async () => {
  const res = await pool.query(
    'SELECT * FROM control_agendado WHERE estado = TRUE'
  );
  return res.rows;
};

// Obtener controles agendados por usuario
export const getControlesAgendadosPorUsuario = async (idUsuario) => {
  const res = await pool.query(
    'SELECT * FROM control_agendado WHERE id_usuario = $1 AND estado = TRUE',
    [idUsuario]
  );
  return res.rows;
};

// Actualizar control agendado
export const updateControlAgendado = async (id, {
  idHijo = null,
  tipoControl,
  fecha,
  hora,
  motivo,
  idMedico = null,
  notificado,
  idUsuarioEditor
}) => {
  const res = await pool.query(
    `UPDATE control_agendado
     SET id_hijo = $1,
         tipo_control = $2,
         fecha = $3,
         hora = $4,
         motivo = $5,
         id_medico = $6,
         notificado = $7,
         id_usuario_editor = $8,
         editado_en = NOW()
     WHERE id = $9
     RETURNING *`,
    [idHijo, tipoControl, fecha, hora, motivo, idMedico, notificado, idUsuarioEditor, id]
  );
  return res.rows[0];
};

// Marcar como notificado
export const marcarControlAgendadoNotificado = async (id) => {
  await pool.query(
    'UPDATE control_agendado SET notificado = TRUE WHERE id = $1',
    [id]
  );
};

// Eliminar (desactivar) control agendado
export const deleteControlAgendado = async (id) => {
  await pool.query(
    'UPDATE control_agendado SET estado = FALSE WHERE id = $1',
    [id]
  );
};