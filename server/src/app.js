const express = require('express');
const cors = require('cors');
const config = require('./config');
const clientes = require('./molulos/clientes/rutas');
const usuario = require('./molulos/users/rutas');
const puertas = require('./molulos/puertas/rutas');
const luces = require('./molulos/luces/rutas');

const app = express();
app.use(express.json());
app.use(cors());

app.set('port', config.app.port);

// Rutas
app.use('/api/clientes', clientes);
app.use('/api/usuario', usuario);
app.use('/api/puertas', puertas);
app.use('/api/luces', luces);

module.exports = app;
