import {
  getUserByEmail,
  createUser,
  updateLastLogin,
  verifyEmail,
  resetPassword,
} from '../models/user.model.js';

import { hashPassword, comparePassword } from '../utils/hashing.util.js';
import { generateToken, verifyToken } from '../utils/jwt.util.js';
import { sendVerificationEmail, sendResetPasswordEmail } from '../utils/mail.util.js';
import dotenv from 'dotenv';
dotenv.config();

const BASE_URL = process.env.BASE_URL || "http://localhost:8080";

// --- Muestra formulario web para restablecer contraseña ---
export const resetPasswordPage = (req, res) => {
  const { token } = req.query;
  if (!token) {
    return res.send(`<html><body><h3>Token inválido o faltante.</h3></body></html>`);
  }
  res.send(`
    <html>
      <head><title>Restablecer Contraseña</title>
        <style>
          body { background: #FBE5D7; color: #6D5F73; font-family: Montserrat, Arial; text-align: center; padding-top: 60px; }
          .card { background: #FFF; border-radius: 18px; padding: 30px 60px; box-shadow: 0 4px 16px #E9DCE4; display: inline-block; }
          input[type="password"] { padding: 8px; border-radius: 8px; width: 90%; margin-bottom: 18px; border: 1px solid #9A939A; }
          button { background: #AC8C84; color: white; padding: 10px 25px; border: none; border-radius: 10px; font-size: 1.1rem; }
        </style>
      </head>
      <body>
        <div class="card">
          <h1>Restablece tu contraseña</h1>
          <form method="POST" action="/api/auth/reset-password">
            <input type="hidden" name="token" value="${token}" />
            <div>
              <input type="password" name="nueva_contrasena" placeholder="Nueva contraseña" required minlength="6" />
            </div>
            <div>
              <input type="password" name="confirmar_contrasena" placeholder="Confirmar contraseña" required minlength="6" />
            </div>
            <button type="submit">Cambiar contraseña</button>
          </form>
        </div>
      </body>
    </html>
  `);
};

// 1. Registro tradicional con email y contraseña (ya usa hash)
export const register = async (req, res) => {
  try {
    const { nombre, ap_pat, ap_mat, correo, contrasena, fecha_nacimiento, tipo_usuario } = req.body;
    const existing = await getUserByEmail(correo);
    if (existing) return res.status(409).json({ error: "Correo ya registrado" });

    const hashed = await hashPassword(contrasena); // 🔐 Encriptar contraseña
    const user = await createUser({
      nombre, ap_pat, ap_mat, correo,
      contrasena: hashed, fecha_nacimiento, tipo_usuario
    });

    const token = generateToken({ correo }, '1d');
    const webLink = `${BASE_URL}/api/auth/verify-email?token=${token}`;
    const appLink = `creciendocontigo://verify?token=${token}`;
    await sendVerificationEmail(correo, webLink, appLink);

    res.status(201).json({ mensaje: "Usuario creado. Revisa tu correo para verificar tu cuenta." });
  } catch (err) {
    res.status(500).json({ error: "Error en el registro" });
  }
};

// 2. Verificación de correo por deep link
export const verifyEmailController = async (req, res) => {
  try {
    const { token } = req.query;
    const data = verifyToken(token);
    if (!data) return res.status(400).send("Token inválido o expirado");

    await verifyEmail(data.correo);

    res.send(`
      <html>
        <head><title>¡Correo verificado!</title>
          <style>
            body { background: #FBE5D7; color: #6D5F73; font-family: Montserrat, Arial; text-align: center; padding-top: 60px; }
            .card { background: #FFF; border-radius: 18px; padding: 30px 60px; box-shadow: 0 4px 16px #E9DCE4; display: inline-block; }
            h1 { font-size: 2.3rem; color: #AC8C84; }
            p { font-size: 1.1rem; }
          </style>
        </head>
        <body>
          <div class="card">
            <h1>¡Correo verificado correctamente!</h1>
            <p>Ahora puedes iniciar sesión en <strong>Creciendo Contigo</strong>.</p>
          </div>
        </body>
      </html>
    `);
  } catch (err) {
    res.status(500).send("Error al verificar correo");
  }
};

// 3. Login tradicional (usa comparePassword seguro)
export const login = async (req, res) => {
  try {
    const { correo, contrasena } = req.body;
    const user = await getUserByEmail(correo);
    if (!user || !user.contraseña) return res.status(401).json({ error: "Credenciales inválidas" });
    if (!user.verificado) return res.status(403).json({ error: "Verifica tu correo antes de iniciar sesión" });

    const valid = await comparePassword(contrasena, user.contraseña); // 🔐 Validar hash
    if (!valid) return res.status(401).json({ error: "Credenciales inválidas" });

    await updateLastLogin(user.id);
    const token = generateToken({ id: user.id, correo: user.correo, nombre: user.nombre });
    res.json({ mensaje: "Login correcto", token, user });
  } catch (err) {
    res.status(500).json({ error: "Error al iniciar sesión" });
  }
};

// 4. Enviar link de recuperación de contraseña
export const forgotPassword = async (req, res) => {
  try {
    const { correo } = req.body;
    const user = await getUserByEmail(correo);
    if (!user) return res.status(404).json({ error: "Usuario no encontrado" });

    const token = generateToken({ correo }, '1h');
    const webLink = `${BASE_URL}/api/auth/reset-password?token=${token}`;
    const appLink = `creciendocontigo://reset-password?token=${token}`;
    await sendResetPasswordEmail(correo, webLink, appLink);

    res.json({ mensaje: "Correo enviado para restablecer contraseña." });
  } catch (err) {
    res.status(500).json({ error: "Error al enviar correo de recuperación" });
  }
};

// 5. Procesar restablecimiento de contraseña (formulario web o app)
export const resetPasswordController = async (req, res) => {
  try {
    const { token, nueva_contrasena, confirmar_contrasena } = req.body;

    if (typeof confirmar_contrasena !== 'undefined' && nueva_contrasena !== confirmar_contrasena) {
      return res.send(`
        <html><body><p style="color:red;">Las contraseñas no coinciden. <a href="javascript:history.back()">Volver</a></p></body></html>
      `);
    }

    const data = verifyToken(token);
    if (!data) return res.send("Token inválido o expirado.");

    const hashed = await hashPassword(nueva_contrasena); // 🔐 Encriptar nueva contraseña
    await resetPassword(data.correo, hashed);

    if (typeof confirmar_contrasena !== 'undefined') {
      return res.send(`<html><body><h3>¡Contraseña restablecida exitosamente!</h3><p>Ya puedes iniciar sesión.</p></body></html>`);
    } else {
      return res.json({ mensaje: "Contraseña restablecida con éxito." });
    }
  } catch (err) {
    if (req.body && typeof req.body.confirmar_contrasena !== 'undefined') {
      return res.send("Error al restablecer la contraseña.");
    } else {
      res.status(500).json({ error: "Error al restablecer contraseña" });
    }
  }
};
