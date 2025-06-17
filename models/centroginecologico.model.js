import { pool } from '../config/db.js';

// Crear centro ginecológico
export const createCentroGinecologico = async ({
  nombreConsultorio,
  nombreEspecialista,
  direccion,
  telefono,
  latitud,
  longitud,
  idUsuarioCreador
}) => {
  const res = await pool.query(
    `INSERT INTO centro_ginecologico (
      nombre_consultorio, nombre_especialista, direccion, telefono, latitud, longitud, id_usuario_creador
    ) VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *`,
    [nombreConsultorio, nombreEspecialista, direccion, telefono, latitud, longitud, idUsuarioCreador]
  );
  return res.rows[0];
};

// Obtener todos los centros ginecológicos validados y activos
export const getCentrosGinecologicos = async () => {
  const res = await pool.query(
    `SELECT * FROM centro_ginecologico WHERE estado = TRUE AND validado = TRUE`
  );
  return res.rows;
};

//Obtener todos los centros ginecologicos creados por el usuario x sin ser validados
export const getCentrosGinecologicosNoValidadosPorUsuario = async ({idUsuarioCreador}) => {
  const res = await pool.query(
    `SELECT * FROM centro_ginecologico WHERE estado = TRUE AND id_usuario_creador = $1`, [idUsuarioCreador]
  );
  return res.rows;
}



// Actualizar centro ginecológico
export const updateCentroGinecologico = async (id, {
  nombreConsultorio,
  nombreEspecialista,
  direccion,
  telefono,
  latitud,
  longitud,
  idUsuarioEditor
}) => {
  const res = await pool.query(
    `UPDATE centro_ginecologico
     SET nombre_consultorio = $1,
         nombre_especialista = $2,
         direccion = $3,
         telefono = $4,
         latitud = $5,
         longitud = $6,
         id_usuario_editor = $7,
         editado_en = NOW()
     WHERE id = $8
     RETURNING *`,
    [nombreConsultorio, nombreEspecialista, direccion, telefono, latitud, longitud, idUsuarioEditor, id]
  );
  return res.rows[0];
};

// Validar centro ginecológico
export const validarCentroGinecologico = async (id, idUsuarioValidador) => {
  const res = await pool.query(
    `UPDATE centro_ginecologico
     SET validado = TRUE,
         id_usuario_validador = $1
     WHERE id = $2
     RETURNING *`,
    [idUsuarioValidador, id]
  );
  return res.rows[0];
};

// Desactivar centro ginecológico
export const deleteCentroGinecologico = async (id) => {
  await pool.query(
    'UPDATE centro_ginecologico SET estado = FALSE WHERE id = $1',
    [id]
  );
};