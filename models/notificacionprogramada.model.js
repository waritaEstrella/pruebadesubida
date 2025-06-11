import { pool } from '../config/db.js';

// Crear notificación programada
export const createNotificacionProgramada = async ({
  idUsuario,
  idHijo = null,
  idRegistroVacuna = null,
  tipo,
  titulo,
  mensaje,
  fechaHora,
  idUsuarioCreador
}) => {
  const res = await pool.query(
    `INSERT INTO notificacion_programada (
      id_usuario, id_hijo, id_registro_vacuna, tipo, titulo, mensaje, fecha_hora, id_usuario_creador
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    RETURNING *`,
    [idUsuario, idHijo, idRegistroVacuna, tipo, titulo, mensaje, fechaHora, idUsuarioCreador]
  );
  return res.rows[0];
};

// Obtener notificaciones programadas activas por usuario
export const getNotificacionesProgramadasPorUsuario = async (idUsuario) => {
  const res = await pool.query(
    `SELECT * FROM notificacion_programada
     WHERE id_usuario = $1 AND cancelada = FALSE
     ORDER BY fecha_hora ASC`,
    [idUsuario]
  );
  return res.rows;
};

// Actualizar notificación programada
export const updateNotificacionProgramada = async (id, {
  tipo,
  titulo,
  mensaje,
  fechaHora,
  enviada,
  cancelada,
  idUsuarioEditor
}) => {
  const res = await pool.query(
    `UPDATE notificacion_programada
     SET tipo = $1,
         titulo = $2,
         mensaje = $3,
         fecha_hora = $4,
         enviada = $5,
         cancelada = $6,
         id_usuario_editor = $7,
         editado_en = NOW()
     WHERE id = $8
     RETURNING *`,
    [tipo, titulo, mensaje, fechaHora, enviada, cancelada, idUsuarioEditor, id]
  );
  return res.rows[0];
};

// Marcar notificación como enviada
export const marcarNotificacionEnviada = async (id) => {
  await pool.query(
    'UPDATE notificacion_programada SET enviada = TRUE WHERE id = $1',
    [id]
  );
};

// Cancelar notificación programada
export const cancelarNotificacionProgramada = async (id, idUsuarioEditor) => {
  await pool.query(
    `UPDATE notificacion_programada
     SET cancelada = TRUE,
         id_usuario_editor = $1,
         editado_en = NOW()
     WHERE id = $2`,
    [idUsuarioEditor, id]
  );
};