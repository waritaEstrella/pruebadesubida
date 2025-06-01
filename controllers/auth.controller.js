import { 
  getUserByEmail, 
  createUser, 
  createGoogleUser, 
  updateLastLogin, 
  verifyEmail, 
  resetPassword, 
  linkGoogle as linkGoogleModel
} from '../models/user.model.js';

import { hashPassword, comparePassword } from '../utils/hashing.util.js';
import { generateToken, verifyToken } from '../utils/jwt.util.js';
import { sendVerificationEmail, sendResetPasswordEmail } from '../utils/mail.util.js';
import { OAuth2Client } from 'google-auth-library';
import dotenv from 'dotenv';
dotenv.config();

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const BASE_URL = process.env.BASE_URL || "http://localhost:8080";

// --- NUEVO: Muestra el formulario web ---
export const resetPasswordPage = (req, res) => {
  const { token } = req.query;
  if (!token) {
    return res.send(`
      <html>
        <body>
          <h3>Token inválido o faltante.</h3>
        </body>
      </html>
    `);
  }
  res.send(`
    <html>
      <head>
        <title>Restablecer Contraseña</title>
        <style>
          body { background: #FBE5D7; color: #6D5F73; font-family: Montserrat, Arial, sans-serif; text-align: center; padding-top: 60px; }
          .card { background: #FFF; border-radius: 18px; display: inline-block; padding: 30px 60px; box-shadow: 0 4px 16px #E9DCE4; }
          input[type="password"] { padding: 8px; border-radius: 8px; border: 1px solid #9A939A; width: 90%; margin-bottom: 18px; }
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

// 1. Registro tradicional (envía email de verificación)
export const register = async (req, res) => {
  try {
    const { nombre, ap_pat, ap_mat, correo, contrasena, fecha_nacimiento, tipo_usuario } = req.body;
    const existing = await getUserByEmail(correo);
    if (existing) return res.status(409).json({ error: "Correo ya registrado" });

    const hashed = await hashPassword(contrasena);
    const user = await createUser({ nombre, ap_pat, ap_mat, correo, contrasena: hashed, fecha_nacimiento, tipo_usuario });

    // TOKEN para verificación
    const token = generateToken({ correo }, '1d');
    const webLink = `${BASE_URL}/api/auth/verify-email?token=${token}`;
    const appLink = `creciendocontigo://verify?token=${token}`;
    await sendVerificationEmail(correo, webLink, appLink);

    res.status(201).json({ mensaje: "Usuario creado. Por favor revisa tu correo para verificar tu cuenta." });
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
        <head>
          <title>¡Correo verificado!</title>
          <style>
            body { background: #FBE5D7; color: #6D5F73; font-family: Montserrat, Arial, sans-serif; text-align: center; padding-top: 60px; }
            .card { background: #FFF; border-radius: 18px; display: inline-block; padding: 30px 60px; box-shadow: 0 4px 16px #E9DCE4; }
            h1 { font-size: 2.3rem; color: #AC8C84; }
            p { font-size: 1.1rem; }
          </style>
        </head>
        <body>
          <div class="card">
            <h1>¡Correo verificado correctamente!</h1>
            <p>Ahora puedes iniciar sesión en <strong>Creciendo Contigo</strong>.<br><br>
            Puedes cerrar esta ventana.</p>
          </div>
        </body>
      </html>
    `);

  } catch (err) {
    res.status(500).send("Error al verificar correo");
  }
};

// 3. Login tradicional
export const login = async (req, res) => {
  try {
    const { correo, contrasena } = req.body;
    const user = await getUserByEmail(correo);
    if (!user || !user.contraseña) return res.status(401).json({ error: "Credenciales inválidas" });
    if (!user.verificado) return res.status(403).json({ error: "Verifica tu correo antes de iniciar sesión" });

    const valid = await comparePassword(contrasena, user.contraseña);
    if (!valid) return res.status(401).json({ error: "Credenciales inválidas" });

    await updateLastLogin(user.id);
    const token = generateToken({ id: user.id, correo: user.correo, nombre: user.nombre });
    res.json({ mensaje: "Login correcto", token, user });
  } catch (err) {
    res.status(500).json({ error: "Error al iniciar sesión" });
  }
};

// 4. Recuperar contraseña (envía email con link para deep link)
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

// 5. Procesa el POST para restablecer la contraseña (web y app)
export const resetPasswordController = async (req, res) => {
  try {
    const { token, nueva_contrasena, confirmar_contrasena } = req.body;

    // Si viene desde web (HTML form), también tendrá confirmar_contrasena
    if (typeof confirmar_contrasena !== 'undefined' && nueva_contrasena !== confirmar_contrasena) {
      return res.send(`
        <html>
          <body>
            <p style="color:red;">Las contraseñas no coinciden. <a href="javascript:history.back()">Volver</a></p>
          </body>
        </html>
      `);
    }

    const data = verifyToken(token);
    if (!data) {
      return res.send("Token inválido o expirado.");
    }

    const hashed = await hashPassword(nueva_contrasena);
    await resetPassword(data.correo, hashed);

    // Si es un POST desde web
    if (typeof confirmar_contrasena !== 'undefined') {
      return res.send(`
        <html>
          <body>
            <h3>¡Contraseña restablecida exitosamente!</h3>
            <p>Ya puedes iniciar sesión con tu nueva contraseña.</p>
          </body>
        </html>
      `);
    } else {
      // Si es desde la app
      return res.json({ mensaje: "Contraseña restablecida con éxito." });
    }
  } catch (err) {
    // Errores generales
    if (req.body && typeof req.body.confirmar_contrasena !== 'undefined') {
      return res.send("Error al restablecer la contraseña.");
    } else {
      res.status(500).json({ error: "Error al restablecer contraseña" });
    }
  }
};

// 6. Login con Google
export const googleAuth = async (req, res) => {
  try {
    const { idToken } = req.body;
    const client = new OAuth2Client(GOOGLE_CLIENT_ID);
    const ticket = await client.verifyIdToken({
      idToken,
      audience: GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    const { email, name, sub, picture } = payload;

    let user = await getUserByEmail(email);
    if (!user) {
      user = await createGoogleUser({ nombre: name, correo: email, google_id: sub, foto_url: picture });
    } else if (!user.es_google) {
      return res.status(403).json({ error: "Cuenta existe, debes vincular Google en la app." });
    }
    await updateLastLogin(user.id);
    const token = generateToken({ id: user.id, correo: user.correo, nombre: user.nombre });
    res.json({ mensaje: "Login con Google correcto", token, user });
  } catch (err) {
    res.status(500).json({ error: "Error con Google Auth", detalle: err.message });
  }
};

// 7. Vincular Google a cuenta tradicional
export const linkGoogle = async (req, res) => {
  try {
    const { email, idToken } = req.body;
    const client = new OAuth2Client(GOOGLE_CLIENT_ID);
    const ticket = await client.verifyIdToken({
      idToken,
      audience: GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    const { email: googleEmail, sub, picture } = payload;

    if (googleEmail !== email) return res.status(400).json({ error: 'El correo de Google no coincide.' });

    let user = await getUserByEmail(email);
    if (!user) return res.status(404).json({ error: "Usuario no encontrado" });

    await linkGoogleModel(email, sub, picture);

    user = await getUserByEmail(email); // Actualizado
    const token = generateToken({ id: user.id, correo: user.correo, nombre: user.nombre });
    res.json({ mensaje: "Cuenta vinculada con Google", token, user });
  } catch (err) {
    res.status(500).json({ error: "Error al vincular cuenta", detalle: err.message });
  }
};
