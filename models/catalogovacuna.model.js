import { pool } from '../config/db.js';

// Crear vacuna en el catálogo
export const createCatalogoVacuna = async ({
  nombre,
  nroDosis,
  edadRecomendadaMeses,
  utilidad,
  intervaloDosisMeses
}) => {
  const res = await pool.query(
    `INSERT INTO catalogo_vacuna (
      nombre, nro_dosis, edad_recomendada_meses, utilidad, intervalo_dosis_meses
    ) VALUES ($1, $2, $3, $4, $5)
    RETURNING *`,
    [nombre, nroDosis, edadRecomendadaMeses, utilidad, intervaloDosisMeses]
  );
  return res.rows[0];
};

// Obtener todas las vacunas del catálogo
export const getCatalogoVacunas = async () => {
  const res = await pool.query(
    'SELECT * FROM catalogo_vacuna'
  );
  return res.rows;
};

// Actualizar vacuna del catálogo
export const updateCatalogoVacuna = async (id, {
  nombre,
  nroDosis,
  edadRecomendadaMeses,
  utilidad,
  intervaloDosisMeses
}) => {
  const res = await pool.query(
    `UPDATE catalogo_vacuna
     SET nombre = $1,
         nro_dosis = $2,
         edad_recomendada_meses = $3,
         utilidad = $4,
         intervalo_dosis_meses = $5
     WHERE id = $6
     RETURNING *`,
    [nombre, nroDosis, edadRecomendadaMeses, utilidad, intervaloDosisMeses, id]
  );
  return res.rows[0];
};

// Eliminar vacuna del catálogo (borrado físico)
export const deleteCatalogoVacuna = async (id) => {
  await pool.query(
    'DELETE FROM catalogo_vacuna WHERE id = $1',
    [id]
  );
};