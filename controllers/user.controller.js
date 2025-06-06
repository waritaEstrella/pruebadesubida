import { updateTipoUsuario } from '../models/user.model.js'; 
import { getTipoUsuarioPorCorreo } from '../models/user.model.js';
import cloudinary from '../config/cloudinary.js';
import { pool } from '../config/db.js';

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

// 🔧 Utilidad para extraer el public_id desde la URL de Cloudinary
function obtenerPublicIdDesdeUrl(url) {
  const partes = url.split('/');
  const nombreArchivo = partes[partes.length - 1]; // ej: abc123.jpg
  const publicId = nombreArchivo.split('.')[0];   // abc123
  return `perfiles_usuarios/${publicId}`;         // incluyendo la carpeta usada en Cloudinary
}

// ✅ Versión mejorada: subir nueva imagen y eliminar la anterior si existe
export const subirImagenPerfil = async (req, res) => {
  try {
    const correo = req.body.correo;

    if (!req.file || !correo) {
      return res.status(400).json({ error: 'Faltan la imagen o el correo' });
    }

    // 🔍 Buscar imagen anterior
    const usuario = await pool.query(
      'SELECT imagen_perfil FROM usuarios WHERE correo = $1',
      [correo]
    );

    if (usuario.rowCount > 0 && usuario.rows[0].imagen_perfil) {
      const urlAnterior = usuario.rows[0].imagen_perfil;
      const publicId = obtenerPublicIdDesdeUrl(urlAnterior);

      try {
        await cloudinary.uploader.destroy(publicId);
        console.log(`🧹 Imagen anterior eliminada de Cloudinary: ${publicId}`);
      } catch (err) {
        console.warn(`⚠️ No se pudo eliminar la imagen anterior: ${publicId}`);
      }
    }

    // 📤 Subida realizada automáticamente por multer-storage-cloudinary
    const nuevaUrl = req.file.path;

    const result = await pool.query(
      'UPDATE usuarios SET imagen_perfil = $1 WHERE correo = $2 RETURNING *',
      [nuevaUrl, correo]
    );

    res.status(200).json({
      mensaje: 'Imagen subida y reemplazada correctamente',
      imagen_perfil: nuevaUrl,
      usuario: result.rows[0],
    });
  } catch (error) {
    console.error('🔥 Error al subir imagen:', error);
    res.status(500).json({ error: 'Error al subir la imagen de perfil' });
  }
};
