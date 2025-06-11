import { pool } from '../config/db.js';

// Crear imagen de subguía
export const createImagenSubguia = async ({
  idSubguia,
  urlImagen,
  descripcion
}) => {
  const res = await pool.query(
    `INSERT INTO imagenes_subguia (
      id_subguia, url_imagen, descripcion
    ) VALUES ($1, $2, $3)
    RETURNING *`,
    [idSubguia, urlImagen, descripcion]
  );
  return res.rows[0];
};

// Obtener imágenes por subguía
export const getImagenesPorSubguia = async (idSubguia) => {
  const res = await pool.query(
    'SELECT * FROM imagenes_subguia WHERE id_subguia = $1',
    [idSubguia]
  );
  return res.rows;
};

// Actualizar imagen de subguía
export const updateImagenSubguia = async (id, {
  urlImagen,
  descripcion
}) => {
  const res = await pool.query(
    `UPDATE imagenes_subguia
     SET url_imagen = $1,
         descripcion = $2
     WHERE id = $3
     RETURNING *`,
    [urlImagen, descripcion, id]
  );
  return res.rows[0];
};

// Eliminar imagen de subguía (borrado físico)
export const deleteImagenSubguia = async (id) => {
  await pool.query(
    'DELETE FROM imagenes_subguia WHERE id = $1',
    [id]
  );
};