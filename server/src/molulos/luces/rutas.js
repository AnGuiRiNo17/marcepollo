const express = require('express');
const router = express.Router();
const controlador = require('./controlador');
const respuesta = require('../../red/respuestas');

router.get('/', async (req, res) => {
    try {
        const data = await controlador.todos();
        respuesta.success(req, res, 200, data);
    } catch (e) {
        respuesta.error(req, res, 500, 'Error al obtener luces', e);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const data = await controlador.uno(req.params.id);
        respuesta.success(req, res, 200, data);
    } catch (e) {
        respuesta.error(req, res, 500, 'Error al obtener luz', e);
    }
});

router.post('/agregar', async (req, res) => {
    try {
        const data = await controlador.agregar(req.body);
        const msg = req.body.id == 0 ? 'Luz agregada' : 'Luz actualizada';
        respuesta.success(req, res, 200, msg);
    } catch (e) {
        respuesta.error(req, res, 500, 'Error al guardar luz', e);
    }
});

router.post('/eliminar', async (req, res) => {
    try {
        const data = await controlador.eliminar(req.body);
        respuesta.success(req, res, 200, 'Luz eliminada');
    } catch (e) {
        respuesta.error(req, res, 500, 'Error al eliminar luz', e);
    }
});

router.post('/actualizar', async (req, res) => {
    try {
        const data = await controlador.actualizar(req.body);
        respuesta.success(req, res, 200, 'Luz actualizada correctamente');
    } catch (e) {
        respuesta.error(req, res, 500, 'Error al actualizar luz', e);
    }
});



module.exports = router;
