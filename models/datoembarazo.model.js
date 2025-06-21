import { pool } from '../config/db.js';

// Crear un nuevo dato de embarazo
export const createDatoEmbarazo = async ({
  id_usuario,
  fecha_ultima_regla,
  fecha_probable_parto,
  dias_embarazo,
  id_usuario_creador
}) => {
  const res = await pool.query(
    `INSERT INTO dato_embarazo (
      id_usuario,
      fecha_ultima_regla,
      fecha_probable_parto,
      dias_embarazo,
      id_usuario_creador
    ) VALUES ($1, $2, $3, $4, $5)
    RETURNING *`,
    [
      id_usuario,
      fecha_ultima_regla,
      fecha_probable_parto,
      dias_embarazo,
      id_usuario_creador
    ]
  );
  return res.rows[0];
};

// Obtener todos los embarazos activos
export const getDatosEmbarazo = async () => {
  const res = await pool.query(
    'SELECT * FROM dato_embarazo WHERE estado = TRUE'
  );
  return res.rows;
};

// Obtener embarazos activos por usuaria
export const getDatosEmbarazoPorUsuario = async (id_usuario) => {
  const res = await pool.query(
    'SELECT * FROM dato_embarazo WHERE id_usuario = $1 AND estado = TRUE',
    [id_usuario]
  );
  return res.rows;
};

// Actualizar un dato de embarazo existente
export const updateDatoEmbarazo = async (
  id,
  {
    fecha_ultima_regla,
    fecha_probable_parto,
    dias_embarazo,
    id_usuario_editor
  }
) => {
  const res = await pool.query(
    `UPDATE dato_embarazo
     SET fecha_ultima_regla = $1,
         fecha_probable_parto = $2,
         dias_embarazo = $3,
         id_usuario_editor = $4,
         editado_en = NOW()
     WHERE id = $5
     RETURNING *`,
    [
      fecha_ultima_regla,
      fecha_probable_parto,
      dias_embarazo,
      id_usuario_editor,
      id
    ]
  );
  return res.rows[0];
};

// Eliminar (desactivar) un embarazo (soft delete)
export const deleteDatoEmbarazo = async (id) => {
  await pool.query(
    'UPDATE dato_embarazo SET estado = FALSE WHERE id = $1',
    [id]
  );
};
