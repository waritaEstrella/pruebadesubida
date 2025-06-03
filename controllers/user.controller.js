import { updateTipoUsuario } from '../models/user.model.js'; // Asegúrate de que este archivo exista
import { getTipoUsuarioPorCorreo } from '../models/user.model.js'; //tipo de usuario

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

//para devolver el tipo de usuario
export const obtenerTipoUsuario = async (req, res) => {
  const correo = req.params.correo;

  try {
    const resultado = await getTipoUsuarioPorCorreo(correo);
    if (!resultado) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    res.status(200).json(resultado); // resultado = { tipo_usuario: '...' }
  } catch (error) {
    console.error('Error al obtener tipo_usuario:', error);
    res.status(500).json({ mensaje: 'Error del servidor' });
  }
};