import { pool } from '../config/db.js';

// Crear hijo
export const createHijo = async ({
  fechaNacimiento,
  horaNacimiento,
  nombres,
  apPaterno,
  apMaterno,
  ci,
  sexo,
  grupoSanguineo,
  pesoNacimiento,
  tallaNacimiento,
  perimetroCefalico,
  apgar1min,
  apgar5min,
  tipoParto,
  idDatosEmbarazo,
  idUsuario,
  idUsuarioCreador
}) => {
  const res = await pool.query(
    `INSERT INTO hijo (
      fecha_nacimiento, hora_nacimiento, nombres, ap_paterno, ap_materno, ci, sexo, grupo_sanguineo,
      peso_nacimiento, talla_nacimiento, perimetro_cefalico, apgar_1min, apgar_5min, tipo_parto,
      id_datos_embarazo, id_usuario, id_usuario_creador
    ) VALUES (
      $1, $2, $3, $4, $5, $6, $7, $8,
      $9, $10, $11, $12, $13, $14,
      $15, $16, $17
    )
    RETURNING *`,
    [
      fechaNacimiento, horaNacimiento, nombres, apPaterno, apMaterno, ci, sexo, grupoSanguineo,
      pesoNacimiento, tallaNacimiento, perimetroCefalico, apgar1min, apgar5min, tipoParto,
      idDatosEmbarazo, idUsuario, idUsuarioCreador
    ]
  );
  return res.rows[0];
};

// Obtener hijos activos
export const getHijos = async () => {
  const res = await pool.query(
    'SELECT * FROM hijo WHERE estado = TRUE'
  );
  return res.rows;
};

// Obtener hijos por usuario
export const getHijosPorUsuario = async (idUsuario) => {
  const res = await pool.query(
    'SELECT * FROM hijo WHERE id_usuario = $1 AND estado = TRUE',
    [idUsuario]
  );
  return res.rows;
};

// Actualizar hijo
export const updateHijo = async (id, {
  fechaNacimiento,
  horaNacimiento,
  nombres,
  apPaterno,
  apMaterno,
  ci,
  sexo,
  grupoSanguineo,
  pesoNacimiento,
  tallaNacimiento,
  perimetroCefalico,
  apgar1min,
  apgar5min,
  tipoParto,
  idDatosEmbarazo,
  idUsuarioEditor
}) => {
  const res = await pool.query(
    `UPDATE hijo
     SET fecha_nacimiento = $1,
         hora_nacimiento = $2,
         nombres = $3,
         ap_paterno = $4,
         ap_materno = $5,
         ci = $6,
         sexo = $7,
         grupo_sanguineo = $8,
         peso_nacimiento = $9,
         talla_nacimiento = $10,
         perimetro_cefalico = $11,
         apgar_1min = $12,
         apgar_5min = $13,
         tipo_parto = $14,
         id_datos_embarazo = $15,
         id_usuario_editor = $16,
         editado_en = NOW()
     WHERE id = $17
     RETURNING *`,
    [
      fechaNacimiento, horaNacimiento, nombres, apPaterno, apMaterno, ci, sexo, grupoSanguineo,
      pesoNacimiento, tallaNacimiento, perimetroCefalico, apgar1min, apgar5min, tipoParto,
      idDatosEmbarazo, idUsuarioEditor, id
    ]
  );
  return res.rows[0];
};

// Eliminar (desactivar) hijo
export const deleteHijo = async (id) => {
  await pool.query(
    'UPDATE hijo SET estado = FALSE WHERE id = $1',
    [id]
  );
};