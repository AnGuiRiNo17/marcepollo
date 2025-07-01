const mysql = require('mysql2/promise');
const config = require('../config');
const bcrypt = require('bcrypt');

const pool = mysql.createPool({
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// === FUNCIONES DE OPERACIÓN ===

async function todos(tabla) {
    const [result] = await pool.query(`SELECT * FROM ??`, [tabla]);
    return result;
}

async function uno(tabla, id) {
    const [result] = await pool.query(`SELECT * FROM ?? WHERE id = ?`, [tabla, id]);
    return result[0];
}

async function insertar(tabla, data) {
    const [result] = await pool.query(`INSERT INTO ?? SET ?`, [tabla, data]);
    return result;
}

async function actualizar(tabla, data) {
    const { id, ...datosActualizados } = data;
    const [result] = await pool.query(`UPDATE ?? SET ? WHERE id = ?`, [tabla, datosActualizados, id]);
    return result;
}

async function eliminar(tabla, data) {
    const [result] = await pool.query(`DELETE FROM ?? WHERE id = ?`, [tabla, data.id]);
    return result;
}

async function agregar(tabla, data) {
    const id = parseInt(data.id);

    if (id === 0) {
        try {
            const [rows] = await pool.query(`SELECT * FROM ?? WHERE email = ?`, [tabla, data.email]);

            if (rows.length > 0) {
                return { status: false, mensaje: 'El correo ya está registrado' };
            }

            const result = await insertar(tabla, data);
            return { status: true, resultado: result };

        } catch (error) {
            console.error('Error en agregar:', error);
            return { status: false, mensaje: 'Error al insertar el registro' };
        }
    } else {
        try {
            const result = await actualizar(tabla, data);
            return { status: true, resultado: result };
        } catch (error) {
            console.error('Error en actualizar:', error);
            return { status: false, mensaje: 'Error al actualizar el registro' };
        }
    }
}

// Función específica para insertar una puerta
async function agregarPuerta(data) {
    const id = parseInt(data.id);

    if (id === 0) {
        try {
            const result = await insertar('puertas', data);
            return { status: true, resultado: result };
        } catch (error) {
            console.error('Error al insertar puerta:', error);
            return { status: false, mensaje: 'Error al insertar la puerta' };
        }
    } else {
        try {
            const result = await actualizar('puertas', data);
            return { status: true, resultado: result };
        } catch (error) {
            console.error('Error al actualizar puerta:', error);
            return { status: false, mensaje: 'Error al actualizar la puerta' };
        }
    }
}

// Función específica para insertar una luz
async function agregarLuz(data) {
    const id = parseInt(data.id);

    if (id === 0) {
        try {
            const result = await insertar('luces', data);
            return { status: true, resultado: result };
        } catch (error) {
            console.error('Error al insertar luz:', error);
            return { status: false, mensaje: 'Error al insertar la luz' };
        }
    } else {
        try {
            const result = await actualizar('luces', data);
            return { status: true, resultado: result };
        } catch (error) {
            console.error('Error al actualizar luz:', error);
            return { status: false, mensaje: 'Error al actualizar la luz' };
        }
    }
}


async function login(tabla, data) {
    const { user, password } = data;

    try {
        const [rows] = await pool.query(`SELECT * FROM ?? WHERE email = ?`, [tabla, user]);

        if (rows.length === 0) {
            return { status: false, mensaje: 'Usuario no encontrado' };
        }

        const usuarioBD = rows[0];
        const coincide = await bcrypt.compare(password, usuarioBD.pw);

        if (coincide) {
            const { pw, ...usuarioSinPassword } = usuarioBD;
            return { status: true, user: usuarioSinPassword };
        } else {
            return { status: false, mensaje: 'Contraseña incorrecta' };
        }
    } catch (error) {
        console.error('Error en login:', error);
        return { status: false, mensaje: 'Error del servidor' };
    }
}

async function actualizarLuz(data) {
    try {
        const result = await actualizar('luces', data);
        return { status: true, resultado: result };
    } catch (error) {
        console.error('Error al actualizar luz:', error);
        return { status: false, mensaje: 'Error al actualizar la luz' };
    }
}


async function actualizarPuerta(data) {
    try {
        const result = await actualizar('puertas', data);
        return { status: true, resultado: result };
    } catch (error) {
        console.error('Error al actualizar puerta:', error);
        return { status: false, mensaje: 'Error al actualizar la puerta' };
    }
}


module.exports = { uno, todos, agregar, eliminar, login , agregarPuerta, agregarLuz, actualizarLuz, actualizarPuerta };
