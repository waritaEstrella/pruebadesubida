import { pool } from '../config/db.js';

// Crear registro de síntoma
export const createRegistroSintoma = async ({
idUsuario,
idSintoma,
descripcion,
fecha,
hora,
duracionMin,
idUsuarioCreador
}) => {
const res = await pool.query(
`INSERT INTO REGISTRO_SINTOMA (
ID_USUARIO, ID_SINTOMA, DESCRIPCION, FECHA, HORA, DURACION_MIN, ID_USUARIO_CREADOR
) VALUES ($1, $2, $3, $4, $5, $6, $7)
RETURNING *`,
[idUsuario, idSintoma, descripcion, fecha, hora, duracionMin, idUsuarioCreador]
);
return res.rows[0];
};

// Obtener registros de síntoma (solo activos)
export const getRegistrosSintoma = async () => {
const res = await pool.query('SELECT * FROM REGISTRO_SINTOMA WHERE ESTADO = TRUE');
return res.rows;
};

// Obtener registros de síntoma por usuario
export const getRegistrosSintomaPorUsuario = async (idUsuario) => {
const res = await pool.query(
'SELECT * FROM REGISTRO_SINTOMA WHERE ID_USUARIO = $1 AND ESTADO = TRUE',
[idUsuario]
);
return res.rows;
};

// Actualizar registro de síntoma
export const updateRegistroSintoma = async (id, {
descripcion,
fecha,
hora,
duracionMin,
idUsuarioEditor
}) => {
const res = await pool.query(
`UPDATE REGISTRO_SINTOMA
SET DESCRIPCION = $1,
FECHA = $2,
HORA = $3,
DURACION_MIN = $4,
ID_USUARIO_EDITOR = $5,
EDITADO_EN = NOW()
WHERE ID = $6
RETURNING *`,
[descripcion, fecha, hora, duracionMin, idUsuarioEditor, id]
);
return res.rows[0];
};

// Eliminar (desactivar) registro de síntoma
export const deleteRegistroSintoma = async (id) => {
await pool.query(
'UPDATE REGISTRO_SINTOMA SET ESTADO = FALSE WHERE ID = $1',
[id]
);
};

export const getRegistrosSintomaPorUsuarioYFecha = async (idUsuario, fecha) => {
const res = await pool.query(
`SELECT id, id_sintoma, descripcion, fecha, hora, duracion_min
FROM registro_sintoma
WHERE id_usuario = $1 AND fecha = $2 AND estado = TRUE
ORDER BY hora ASC`,
[idUsuario, fecha]
);
return res.rows;
};

export const getRegistrosSintomaPorUsuarioYSintoma = async (idUsuario, idSintoma) => {
  const res = await pool.query(
    `SELECT id, id_sintoma, descripcion, fecha, hora, duracion_min
     FROM registro_sintoma
     WHERE id_usuario = $1 AND id_sintoma = $2 AND estado = TRUE
     ORDER BY fecha DESC, hora ASC`,
    [idUsuario, idSintoma]
  );
  return res.rows;
};

//para las estadisticas
export const getEstadisticasSintomas = async (idUsuario) => {
  const res = await pool.query(`
    WITH sintomas_usuario AS (
      SELECT 
        id_sintoma,
        fecha,
        duracion_min,
        COUNT(*) OVER() AS total_sintomas,
        COUNT(*) OVER(PARTITION BY id_sintoma) AS conteo_por_sintoma,
        COUNT(*) OVER(PARTITION BY fecha) AS conteo_por_fecha,
        SUM(duracion_min) OVER (PARTITION BY DATE_PART('week', fecha)) AS duracion_por_semana
      FROM registro_sintoma
      WHERE id_usuario = $1 AND estado = TRUE
    ),
    sintoma_frecuente AS (
      SELECT id_sintoma, COUNT(*) AS cantidad
      FROM registro_sintoma
      WHERE id_usuario = $1 AND estado = TRUE
      GROUP BY id_sintoma
      ORDER BY cantidad DESC
      LIMIT 1
    ),
    dia_maximo AS (
      SELECT fecha, COUNT(*) AS cantidad
      FROM registro_sintoma
      WHERE id_usuario = $1 AND estado = TRUE
      GROUP BY fecha
      ORDER BY cantidad DESC
      LIMIT 1
    ),
    promedio AS (
      SELECT ROUND(COUNT(*)::numeric / COUNT(DISTINCT DATE_PART('week', fecha)), 2) AS promedio
      FROM registro_sintoma
      WHERE id_usuario = $1 AND estado = TRUE
    )
    SELECT 
      (SELECT COUNT(*) FROM registro_sintoma WHERE id_usuario = $1 AND estado = TRUE) AS total_sintomas,
      (SELECT s.nombre_sintoma FROM sintoma s WHERE s.id = sf.id_sintoma) AS sintoma_frecuente,
      (SELECT fecha FROM dia_maximo) AS dia_maximo,
      (SELECT SUM(duracion_min) FROM registro_sintoma WHERE id_usuario = $1 AND estado = TRUE AND DATE_PART('week', fecha) = DATE_PART('week', CURRENT_DATE)) AS duracion_semanal,
      (SELECT promedio FROM promedio) AS promedio_semanal
    FROM sintoma_frecuente sf
    LIMIT 1;
  `, [idUsuario]);

  return res.rows[0];
};

//PARA EL CALENDARIO POR DIA
export const getSintomasPorDia = async (idUsuario) => {
  const res = await pool.query(`
    SELECT 
      fecha,
      COUNT(*) AS cantidad
    FROM registro_sintoma
    WHERE id_usuario = $1 AND estado = TRUE
    GROUP BY fecha
    ORDER BY fecha ASC
  `, [idUsuario]);

  return res.rows;
};

