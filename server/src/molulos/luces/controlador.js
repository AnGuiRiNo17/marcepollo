const bd = require('../../BD/mysqlv2');
const TABLA = 'luces';

function todos() {
    return bd.todos(TABLA);
}

function uno(id) {
    return bd.uno(TABLA, id);
}

function agregar(body) {
    return bd.agregarLuz(body);
}

function eliminar(body) {
    return bd.eliminar(TABLA, body);
}

function actualizar(body) {
    return bd.actualizarLuz(body);
}


module.exports = { todos, uno, agregar, eliminar, actualizar };
