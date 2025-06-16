import { pool } from '../config/db.js';

// Crear centro de salud
export const createCentroSalud = async ({
  nombre,
  municipio,
  latitud,
  longitud,
  idUsuarioCreador
}) => {
  const res = await pool.query(
    `INSERT INTO centro_salud (
      nombre, municipio, latitud, longitud, id_usuario_creador
    ) VALUES ($1, $2, $3, $4, $5)
    RETURNING *`,
    [nombre, municipio, latitud, longitud, idUsuarioCreador]
  );
  return res.rows[0];
};

// Obtener centros de salud activos y validados
export const getCentrosSalud = async () => {
  const res = await pool.query(
    'SELECT * FROM centro_salud WHERE estado = TRUE AND validado = TRUE'
  );
  return res.rows;
};

// Actualizar centro de salud
export const updateCentroSalud = async (id, {
  nombre,
  municipio,
  latitud,
  longitud,
  idUsuarioEditor
}) => {
  const res = await pool.query(
    `UPDATE centro_salud
     SET nombre = $1,
         municipio = $2,
         latitud = $3,
         longitud = $4,
         id_usuario_editor = $5,
         editado_en = NOW()
     WHERE id = $6
     RETURNING *`,
    [nombre, municipio, latitud, longitud, idUsuarioEditor, id]
  );
  return res.rows[0];
};

// Validar centro de salud
export const validarCentroSalud = async (id) => {
  const res = await pool.query(
    `UPDATE centro_salud
     SET validado = TRUE
     WHERE id = $1
     RETURNING *`,
    [id]
  );
  return res.rows[0];
};

// Eliminar (desactivar) centro de salud
export const deleteCentroSalud = async (id) => {
  await pool.query(
    'UPDATE centro_salud SET estado = FALSE WHERE id = $1',
    [id]
  );
};

//obtener por centro de salud por municipio
export const getCentrosSaludPorMunicipio = async (municipio) => {
  const res = await pool.query(
    'SELECT * FROM centro_salud WHERE estado = TRUE AND validado = TRUE AND municipio = $1',
    [municipio]
  );
  return res.rows;
};
