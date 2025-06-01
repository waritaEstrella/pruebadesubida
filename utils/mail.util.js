import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

export const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Nueva función: acepta ambos enlaces (webLink y appLink)
export const sendVerificationEmail = async (to, webLink, appLink) => {
  await transporter.sendMail({
    from: `"Creciendo Contigo" <${process.env.EMAIL_USER}>`,
    to,
    subject: "Verifica tu correo - Creciendo Contigo",
    html: `
      <h3>Verifica tu correo</h3>
      <p>Para verificar tu cuenta, elige una de las siguientes opciones:</p>
      <ul>
        <li>
          <b>Desde tu computadora:</b><br>
          <a href="${webLink}">Verificar cuenta en la web</a>
        </li>
        <li>
          <b>Desde tu celular con la app instalada:</b><br>
          <a href="${appLink}">Verificar desde la app</a>
        </li>
      </ul>
      <p>Si no solicitaste esto, ignora este mensaje.</p>
    `,
  });
};

export const sendResetPasswordEmail = async (to, webLink, appLink) => {
  await transporter.sendMail({
    from: `"Creciendo Contigo" <${process.env.EMAIL_USER}>`,
    to,
    subject: "Recupera tu contraseña - Creciendo Contigo",
    html: `
      <h3>Restablece tu contraseña</h3>
      <p>Para restablecer tu contraseña, elige una de las siguientes opciones:</p>
      <ul>
        <li>
          <b>Desde tu computadora:</b><br>
          <a href="${webLink}">Restablecer en la web</a>
        </li>
        <li>
          <b>Desde tu celular con la app instalada:</b><br>
          <a href="${appLink}">Restablecer desde la app</a>
        </li>
      </ul>
      <p>Si no solicitaste esto, ignora este mensaje.</p>
    `,
  });
};
