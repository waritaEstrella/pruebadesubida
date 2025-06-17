import {
  createCentroGinecologico,
  getCentrosGinecologicos,
  updateCentroGinecologico,
  validarCentroGinecologico,
  deleteCentroGinecologico,
  getCentrosGinecologicosNoValidadosPorUsuario
} from '../models/centroginecologico.model.js';

// Obtener todos los centros ginecológicos validados y activos
export const obtenerCentrosGinecologicos = async (req, res) => {
  try {
    const centros = await getCentrosGinecologicos();
    res.status(200).json(centros);
  } catch (error) {
    console.error('Error al obtener centros ginecológicos:', error.message);
    res.status(500).json({ error: 'Error del servidor al obtener centros ginecológicos' });
  }
};

//Obtener centro ginecologico activos, no validados y por usuarui
export const obtenerCentrosGinecologicosNoValidadosPorUsuario = async (req, res) => {
  const {idUsuarioCreador} = req.body;
  if (!idUsuarioCreador){
    return res.status(400).json({ error: 'Faltan datos requeridos'});
  }
  try {
    const centros = await getCentrosGinecologicosNoValidadosPorUsuario({idUsuarioCreador});
    res.status(200).json(centros);
  } catch (error) {
    console.error('Error al obtener centros ginecologicos no validados por usuario', error.message);
    res.status(500).json({ error: 'Error del servidor al obtener centros ginecologicos no validados por usuario'});
  }
}

// Crear centro ginecológico
export const crearCentroGinecologico = async (req, res) => {
  const {
    nombreConsultorio,
    nombreEspecialista,
    direccion,
    telefono,
    latitud,
    longitud,
    idUsuarioCreador
  } = req.body;
  if (!nombreConsultorio || !direccion || !idUsuarioCreador) {
    return res.status(400).json({ error: 'Faltan datos requeridos' });
  }
  try {
    const centro = await createCentroGinecologico({
      nombreConsultorio,
      nombreEspecialista,
      direccion,
      telefono,
      latitud,
      longitud,
      idUsuarioCreador
    });
    res.status(201).json(centro);
  } catch (error) {
    console.error('Error al crear centro ginecológico:', error.message);
    res.status(500).json({ error: 'Error del servidor al crear centro ginecológico' });
  }
};

// Actualizar centro ginecológico
export const actualizarCentroGinecologico = async (req, res) => {
  const { id } = req.params;
  const {
    nombreConsultorio,
    nombreEspecialista,
    direccion,
    telefono,
    latitud,
    longitud,
    idUsuarioEditor
  } = req.body;
  if (!nombreConsultorio || !direccion || !idUsuarioEditor) {
    return res.status(400).json({ error: 'Faltan datos requeridos' });
  }
  try {
    const centro = await updateCentroGinecologico(id, {
      nombreConsultorio,
      nombreEspecialista,
      direccion,
      telefono,
      latitud,
      longitud,
      idUsuarioEditor
    });
    res.status(200).json(centro);
  } catch (error) {
    console.error('Error al actualizar centro ginecológico:', error.message);
    res.status(500).json({ error: 'Error del servidor al actualizar centro ginecológico' });
  }
};

// Validar centro ginecológico
export const validarCentroGinecologicoController = async (req, res) => {
  const { id } = req.params;
  const { idUsuarioValidador } = req.body;
  if (!idUsuarioValidador) {
    return res.status(400).json({ error: 'Falta el idUsuarioValidador' });
  }
  try {
    const centro = await validarCentroGinecologico(id, idUsuarioValidador);
    res.status(200).json(centro);
  } catch (error) {
    console.error('Error al validar centro ginecológico:', error.message);
    res.status(500).json({ error: 'Error del servidor al validar centro ginecológico' });
  }
};

// Eliminar (desactivar) centro ginecológico
export const eliminarCentroGinecologico = async (req, res) => {
  const { id } = req.params;
  try {
    await deleteCentroGinecologico(id);
    res.status(200).json({ mensaje: 'Centro ginecológico eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar centro ginecológico:', error.message);
    res.status(500).json({ error: 'Error del servidor al eliminar centro ginecológico' });
  }
};