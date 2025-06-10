import bcrypt from 'bcryptjs';
import cloudinary from '../config/cloudinary.js';
import { pool } from '../config/db.js';
import { getUserByEmail, insertarTipoUsuario } from '../models/user.model.js';

import dotenv from 'dotenv';
import { generateToken } from '../utils/jwt.util.js';
import { sendVerificationEmail } from '../utils/mail.util.js';
dotenv.config();

const BASE_URL = process.env.BASE_URL || "http://localhost:8080";

// ... [todo el resto del código permanece igual] ...

// ✅ Registrar usuario con uno o más tipos (con encriptación de contraseña)
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

    // ✅ Enviar correo de verificación
    const token = generateToken({ correo }, '1d');
    const webLink = `${BASE_URL}/api/auth/verify-email?token=${token}`;
    const appLink = `creciendocontigo://verify?token=${token}`;

    console.log("📨 Enviando correo de verificación a:", correo);
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
