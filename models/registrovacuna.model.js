import { pool } from '../config/db.js';

// Crear registro de vacuna
export const createRegistroVacuna = async ({
  idCatalogoVacuna,
  idHijo,
  dosisActual,
  fechaProgramada,
  fechaAdministracion = null,
  administrado = false,
  notificacionEnviada = false,
  idUsuarioCreador
}) => {
  const res = await pool.query(
    `INSERT INTO registro_vacuna (
      id_catalogo_vacuna, id_hijo, dosis_actual, fecha_programada, fecha_administracion,
      administrado, notificacion_enviada, id_usuario_creador
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    RETURNING *`,
    [
      idCatalogoVacuna, idHijo, dosisActual, fechaProgramada,
      fechaAdministracion, administrado, notificacionEnviada, idUsuarioCreador
    ]
  );
  return res.rows[0];
};

// Obtener registros de vacuna activos por hijo
export const getRegistrosVacunaPorHijo = async (idHijo) => {
  const res = await pool.query(
    'SELECT * FROM registro_vacuna WHERE id_hijo = $1 AND estado = TRUE ORDER BY fecha_programada ASC',
    [idHijo]
  );
  return res.rows;
};

// Actualizar registro de vacuna
export const updateRegistroVacuna = async (id, {
  fechaAdministracion = null,
  administrado,
  notificacionEnviada,
  idUsuarioEditor
}) => {
  const res = await pool.query(
    `UPDATE registro_vacuna
     SET fecha_administracion = $1,
         administrado = $2,
         notificacion_enviada = $3,
         id_usuario_editor = $4,
         editado_en = NOW()
     WHERE id = $5
     RETURNING *`,
    [fechaAdministracion, administrado, notificacionEnviada, idUsuarioEditor, id]
  );
  return res.rows[0];
};

// Eliminar (desactivar) registro de vacuna
export const deleteRegistroVacuna = async (id) => {
  await pool.query(
    'UPDATE registro_vacuna SET estado = FALSE WHERE id = $1',
    [id]
  );
};