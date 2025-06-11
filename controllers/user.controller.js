import bcrypt from 'bcryptjs';
import cloudinary from '../config/cloudinary.js';
import { pool } from '../config/db.js';
import { getUserByEmail, insertarTipoUsuario } from '../models/user.model.js';
import { generateToken } from '../utils/jwt.util.js';
import { sendVerificationEmail } from '../utils/mail.util.js';
import dotenv from 'dotenv';
dotenv.config();

const BASE_URL = process.env.BASE_URL || 'http://localhost:8080'; // ✅ Agregado

// ✅ Obtener tipos de usuario, es_nuevo y es_admin
export const obtenerInfoCompletaUsuario = async (req, res) => {
  const { correo } = req.params;

  try {
    const resultUsuario = await pool.query(
      `SELECT id, es_nuevo, es_admin FROM usuario WHERE correo = $1`,
      [correo]
    );

    if (resultUsuario.rowCount === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    const { id, es_nuevo, es_admin } = resultUsuario.rows[0];

    const resultTipos = await pool.query(
      `SELECT tu.tipo_usuario 
       FROM usuarios_tipo_usuario utu
       JOIN tipo_usuario tu ON tu.id = utu.id_tipo_usuario
       WHERE utu.id_usuario = $1 AND utu.activo = true`,
      [id]
    );

    const tipos_usuario = resultTipos.rows.map(row => row.tipo_usuario);

    res.json({
      tipos_usuario,
      es_nuevo,
      es_admin
    });

  } catch (error) {
    console.error('Error al obtener info completa del usuario:', error.message);
    res.status(500).json({ error: 'Error del servidor' });
  }
};

// ✅ Obtener datos básicos por correo con id
export const obtenerUsuarioPorCorreo = async (req, res) => {
  const { correo } = req.params;
  try {
    const result = await pool.query(
      'SELECT id, correo, nombre, ap_pat, ap_mat, imagen_perfil, fecha_nacimiento FROM usuario WHERE correo = $1',
      [correo]
    );
    if (result.rowCount === 0)
      return res.status(404).json({ error: 'Usuario no encontrado' });
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error('Error al obtener usuario:', error);
    res.status(500).json({ error: 'Error del servidor' });
  }
};


function obtenerPublicIdDesdeUrl(url) {
  const partes = url.split('/');
  const nombreArchivo = partes[partes.length - 1];
  const publicId = nombreArchivo.split('.')[0];
  return `perfiles_usuarios/${publicId}`;
}

// ✅ Subir imagen
export const subirImagenPerfil = async (req, res) => {
  try {
    const correo = req.body.correo;

    if (!req.file || !correo) {
      return res.status(400).json({ error: 'Faltan la imagen o el correo' });
    }

    const usuario = await pool.query(
      'SELECT imagen_perfil FROM usuario WHERE correo = $1',
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

    const nuevaUrl = req.file.path;

    const result = await pool.query(
      'UPDATE usuario SET imagen_perfil = $1 WHERE correo = $2 RETURNING *',
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

// ✅ Actualizar imagen base64
export const actualizarImagenPerfil = async (req, res) => {
  const { correo, imagen_perfil } = req.body;
  if (!correo || !imagen_perfil) {
    return res.status(400).json({ error: 'Faltan datos requeridos' });
  }
  try {
    const result = await pool.query(
      'UPDATE usuario SET imagen_perfil = $1 WHERE correo = $2 RETURNING *',
      [imagen_perfil, correo]
    );
    if (result.rowCount === 0) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.status(200).json({ mensaje: 'Imagen actualizada correctamente', usuario: result.rows[0] });
  } catch (error) {
    console.error('Error al actualizar imagen de perfil:', error);
    res.status(500).json({ error: 'Error del servidor' });
  }
};

// ✅ Actualizar datos del usuario
export const actualizarUsuarioController = async (req, res) => {
  const { correo, nombre, ap_pat, ap_mat, fecha_nacimiento } = req.body;

  if (!correo) {
    return res.status(400).json({ error: 'Falta el correo del usuario' });
  }

  try {
    const campos = [];
    const valores = [];
    let index = 1;

    if (nombre !== undefined) {
      campos.push(`nombre = $${index++}`);
      valores.push(nombre);
    }
    if (ap_pat !== undefined) {
      campos.push(`ap_pat = $${index++}`);
      valores.push(ap_pat);
    }
    if (ap_mat !== undefined) {
      campos.push(`ap_mat = $${index++}`);
      valores.push(ap_mat);
    }
    if (fecha_nacimiento !== undefined) {
      campos.push(`fecha_nacimiento = $${index++}`);
      valores.push(fecha_nacimiento);
    }

    if (campos.length === 0) {
      return res.status(400).json({ error: 'No se proporcionaron campos para actualizar' });
    }

    valores.push(correo);

    const query = `
      UPDATE usuario
      SET ${campos.join(', ')}
      WHERE correo = $${index}
    `;

    await pool.query(query, valores);

    res.json({ mensaje: 'Usuario actualizado correctamente' });
  } catch (error) {
    console.error('Error al actualizar usuario:', error.message);
    res.status(500).json({ error: 'Error del servidor al actualizar usuario' });
  }
};

// ✅ Registrar usuario con tipos y envío de correo
export const registrarUsuarioConTipo = async (req, res) => {
  const {
    nombre,
    ap_pat,
    ap_mat,
    correo,
    contrasena,
    fecha_nacimiento,
    tipos_usuario_ids
  } = req.body;

  if (!correo || !contrasena) {
    return res.status(400).json({ error: 'Correo y contraseña son obligatorios' });
  }

  try {
    const existente = await getUserByEmail(correo);
    if (existente) return res.status(409).json({ error: 'Ya existe un usuario con ese correo' });

    const hashedPassword = await bcrypt.hash(contrasena, 10);

    const nuevoUsuario = await pool.query(
      `INSERT INTO usuario (nombre, ap_pat, ap_mat, correo, contrasena, fecha_nacimiento, verificado, creado_en)
       VALUES ($1, $2, $3, $4, $5, $6, FALSE, NOW())
       RETURNING *`,
      [nombre || '', ap_pat || '', ap_mat || '', correo, hashedPassword, fecha_nacimiento || null]
    );

    const userId = nuevoUsuario.rows[0].id;

    if (Array.isArray(tipos_usuario_ids)) {
      for (const tipoId of tipos_usuario_ids) {
        await insertarTipoUsuario(userId, tipoId);
      }
    }

    const token = generateToken({ correo }, '1d');
    const webLink = `${BASE_URL}/api/auth/verify-email?token=${token}`;
    const appLink = `creciendocontigo://verify?token=${token}`;
    await sendVerificationEmail(correo, webLink, appLink);

    res.status(201).json({
      mensaje: 'Usuario registrado correctamente. Revisa tu correo para verificar tu cuenta.',
      usuario: {
        id: userId,
        correo,
        nombre: nombre || ''
      }
    });

  } catch (error) {
    console.error('Error al registrar usuario con tipo:', error.message);
    res.status(500).json({ error: 'Error del servidor al registrar usuario' });
  }
};

// ✅ Asignar tipos a usuario existente
export const asignarTiposUsuarioController = async (req, res) => {
  const { correo, tipos_usuario } = req.body;

  if (!correo || !Array.isArray(tipos_usuario) || tipos_usuario.length === 0) {
    return res.status(400).json({ error: 'Faltan parámetros válidos' });
  }

  try {
    const user = await getUserByEmail(correo);
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });

    const result = await pool.query(
      `SELECT id FROM tipo_usuario WHERE tipo_usuario = ANY($1::text[])`,
      [tipos_usuario]
    );

    for (const row of result.rows) {
      await insertarTipoUsuario(user.id, row.id);
    }

    await pool.query(`UPDATE usuario SET es_nuevo = false WHERE id = $1`, [user.id]);

    res.status(200).json({ mensaje: 'Tipos asignados correctamente' });
  } catch (error) {
    console.error('Error al asignar tipos:', error.message);
    res.status(500).json({ error: 'Error del servidor al asignar tipos' });
  }
};
