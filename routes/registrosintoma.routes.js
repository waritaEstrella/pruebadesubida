import { Router } from 'express';
import {
  obtenerRegistrosSintoma,
  obtenerRegistrosSintomaPorUsuario,
  crearRegistroSintoma,
  actualizarRegistroSintoma,
  eliminarRegistroSintoma,
  obtenerRegistrosSintomaPorUsuarioYFecha,
  obtenerRegistrosSintomaPorUsuarioYSintoma,
  obtenerEstadisticasSintomas,
  obtenerSintomasPorDia
} from '../controllers/registrosintoma.controller.js';

const router = Router();

router.get('/', obtenerRegistrosSintoma);
router.get('/usuario/:idUsuario', obtenerRegistrosSintomaPorUsuario);
router.post('/', crearRegistroSintoma);
router.put('/:id', actualizarRegistroSintoma);
router.delete('/:id', eliminarRegistroSintoma);
router.get('/usuario/:idUsuario/fecha/:fecha', obtenerRegistrosSintomaPorUsuarioYFecha);
router.get('/usuario/:idUsuario/sintoma/:idSintoma', obtenerRegistrosSintomaPorUsuarioYSintoma);

//estadisticas
router.get('/sintomas/estadisticas/:idUsuario', obtenerEstadisticasSintomas);
//calendario
router.get('/sintomas/por-dia/:idUsuario', obtenerSintomasPorDia);


export default router;