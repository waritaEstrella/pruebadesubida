import { updateTipoUsuario } from '../models/user.model.js'; // Asegúrate de que este archivo exista

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
