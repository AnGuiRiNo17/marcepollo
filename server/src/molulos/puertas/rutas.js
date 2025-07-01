const express = require('express');
const router = express.Router();
const controlador = require('./controlador');
const respuesta = require('../../red/respuestas');

router.get('/', async function (req, res) {
  try {
    const items = await controlador.todos();
    respuesta.success(req, res, 200, items);
  } catch (error) {
    respuesta.error(req, res, 500, 'Error al obtener puertas', error);
  }
})

router.get('/:id', async (req, res) => {
    try {
        const data = await controlador.uno(req.params.id);
        respuesta.success(req, res, 200, data);
    } catch (e) {
        respuesta.error(req, res, 500, 'Error al obtener puerta', e);
    }
});

router.post('/agregar', async (req, res) => {
    try {
        const data = await controlador.agregar(req.body);
        const msg = req.body.id == 0 ? 'Puerta agregada' : 'Puerta actualizada';
        respuesta.success(req, res, 200, msg);
    } catch (e) {
        respuesta.error(req, res, 500, 'Error al guardar puerta', e);
    }
});

router.post('/eliminar', async (req, res) => {
    try {
        const data = await controlador.eliminar(req.body);
        respuesta.success(req, res, 200, 'Puerta eliminada');
    } catch (e) {
        respuesta.error(req, res, 500, 'Error al eliminar puerta', e);
    }
});

router.post('/actualizar', async (req, res) => {
    try {
        const data = await controlador.actualizar(req.body);
        respuesta.success(req, res, 200, 'Puerta actualizada correctamente');
    } catch (e) {
        respuesta.error(req, res, 500, 'Error al actualizar puerta', e);
    }
});

module.exports = router;
