import { updateTipoUsuario } from '../models/user.model.js';
import { getTipoUsuarioPorCorreo } from '../models/user.model.js';
import cloudinary from '../config/cloudinary.js';
import { pool } from '../config/db.js'; // ✅ correcto


export const updateTipoUsuarioController = async (req, res) => {
  const { correo, tipo_usuario } = req.body;
  if (!correo || !tipo_usuario) {
    return res.status(400).json({ error: 'Faltan parámetros: correo o tipo_usuario' });
  }
  try {
    await updateTipoUsuario(correo, tipo_usuario);
    res.json({ mensaje: 'Tipo de usuario actualizado correctamente' });
  } catch (error) {
    console.error('Error actualizando tipo_usuario:', error.message);
    res.status(500).json({ error: 'Error del servidor al actualizar tipo_usuario' });
  }
};

export const obtenerTipoUsuario = async (req, res) => {
  const correo = req.params.correo;
  try {
    const resultado = await getTipoUsuarioPorCorreo(correo);
    if (!resultado) return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    res.status(200).json(resultado);
  } catch (error) {
    console.error('Error al obtener tipo_usuario:', error);
    res.status(500).json({ mensaje: 'Error del servidor' });
  }
};

export const actualizarImagenPerfil = async (req, res) => {
  const { correo, imagen_perfil } = req.body;
  if (!correo || !imagen_perfil) {
    return res.status(400).json({ error: 'Faltan datos requeridos' });
  }
  try {
    const result = await pool.query(
      'UPDATE usuarios SET imagen_perfil = $1 WHERE correo = $2 RETURNING *',
      [imagen_perfil, correo]
    );
    if (result.rowCount === 0) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.status(200).json({ mensaje: 'Imagen actualizada correctamente', usuario: result.rows[0] });
  } catch (error) {
    console.error('Error al actualizar imagen de perfil:', error);
    res.status(500).json({ error: 'Error del servidor' });
  }
};

export const obtenerUsuarioPorCorreo = async (req, res) => {
  const { correo } = req.params;
  try {
    const result = await pool.query(
      'SELECT correo, nombre, ap_pat, ap_mat, imagen_perfil FROM usuarios WHERE correo = $1',
      [correo]
    );
    if (result.rowCount === 0) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error('Error al obtener usuario:', error);
    res.status(500).json({ error: 'Error del servidor' });
  }
};

export const subirImagenPerfil = async (req, res) => {
  try {
    const correo = req.body.correo;

    if (!req.file || !correo) {
      return res.status(400).json({ error: 'Faltan la imagen o el correo' });
    }

    const imagenURL = req.file.path; // URL segura de Cloudinary

    const result = await pool.query(
      'UPDATE usuarios SET imagen_perfil = $1 WHERE correo = $2 RETURNING *',
      [imagenURL, correo]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    res.status(200).json({
      mensaje: 'Imagen subida y guardada correctamente',
      imagen_perfil: imagenURL,
      usuario: result.rows[0],
    });
  } catch (error) {
    console.error('Error al subir imagen:', error.message);
    res.status(500).json({ error: 'Error al subir la imagen de perfil' });
  }
};
