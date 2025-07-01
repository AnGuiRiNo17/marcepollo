¡Claro, César! Aquí tienes un archivo `README.md` **profesional, claro y listo para subir a tu repositorio de GitHub**, con todo lo que has hecho: descripción, estructura de la base de datos `cobranza`, endpoints, pasos de uso y cómo probar en Postman.

---

````markdown
# 🏠 Backend API - Monitoreo de Hogar Inteligente

Este proyecto es un backend desarrollado con **Node.js + Express + MySQL** que permite gestionar de forma centralizada el estado de un hogar inteligente. A través de una API REST puedes controlar usuarios, clientes, luces y puertas.

---

## 📦 Tecnologías utilizadas

- **Node.js**
- **Express**
- **MySQL2 + MariaDB**
- **bcrypt** (para hashear contraseñas)
- **Postman** (para pruebas de endpoints)

---

## 🗄️ Base de Datos: `cobranza`

### ✅ Tablas incluidas:

#### 🔸 `clientes`
| Campo  | Tipo         | Extra           |
|--------|--------------|-----------------|
| id     | int          | PRIMARY, AI     |
| nombre | varchar(100) | NOT NULL        |
| email  | varchar(100) | UNIQUE, NOT NULL|
| status | tinyint(1)   | Default: 1      |

#### 🔸 `usuario`
| Campo      | Tipo         | Extra                         |
|------------|--------------|-------------------------------|
| id         | int          | PRIMARY, AI                   |
| nombre     | varchar(100) | NOT NULL                      |
| email      | varchar(100) | UNIQUE, NOT NULL              |
| pw         | varchar(255) | Contraseña hasheada           |
| status     | tinyint(1)   | Default: 1                    |
| created_at | datetime     | Default: current_timestamp()  |
| updated_at | datetime     | On update current_timestamp() |

#### 🔸 `puertas`
| Campo            | Tipo            | Extra                     |
|------------------|------------------|---------------------------|
| id               | int              | PRIMARY, AI               |
| nombre           | varchar(50)      | NOT NULL                  |
| estado           | enum             | ('abierta','cerrada')     |
| ultima_actividad | datetime         | Default: CURRENT_TIMESTAMP|
| registro_entrada | boolean          | Default: false            |

#### 🔸 `luces`
| Campo            | Tipo            | Extra                     |
|------------------|------------------|---------------------------|
| id               | int              | PRIMARY, AI               |
| nombre           | varchar(50)      | NOT NULL                  |
| estado           | enum             | ('encendida','apagada')   |
| intensidad       | int              | Valor del 0 al 100        |
| ultima_actividad | datetime         | Default: CURRENT_TIMESTAMP|

---

## 🚀 Instalación

```bash
# Clona el proyecto
git clone https://github.com/tu-usuario/backend-hogar-inteligente.git

cd backend-hogar-inteligente

# Instala dependencias
npm install

# Configura tu archivo .env o /config.js con tu base de datos
````

---

## ⚙️ Configuración (config.js)

```js
module.exports = {
  app: {
    port: 4000
  },
  mysql: {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'cobranza'
  }
}
```

---

## 📡 Endpoints disponibles

### 🧍‍♂️ Usuarios (`/api/usuario`)

* `GET /` → Listar todos los usuarios
* `GET /:id` → Obtener usuario por ID
* `POST /agregar` → Agregar o actualizar usuario
* `POST /login` → Autenticación
* `POST /eliminar` → Eliminar usuario

### 👥 Clientes (`/api/clientes`)

* `GET /` → Listar todos los clientes
* `GET /:id` → Obtener cliente por ID
* `POST /agregar` → Agregar o actualizar cliente
* `POST /eliminar` → Eliminar cliente

### 🚪 Puertas (`/api/puertas`)

* `GET /` → Listar puertas
* `GET /:id` → Obtener puerta por ID
* `POST /agregar` → Agregar o actualizar puerta
* `POST /eliminar` → Eliminar puerta

### 💡 Luces (`/api/luces`)

* `GET /` → Listar luces
* `GET /:id` → Obtener luz por ID
* `POST /agregar` → Agregar o actualizar luz
* `POST /eliminar` → Eliminar luz

---

## 🧪 Cómo probar con Postman

### 🔐 Login de usuario

**POST** `/api/usuario/login`

```json
{
  "user": "correo@ejemplo.com",
  "password": "1234"
}
```

### ➕ Agregar cliente

**POST** `/api/clientes/agregar`

```json
{
  "id": 0,
  "nombre": "Pedro López",
  "email": "pedro@example.com",
  "status": 1
}
```

### ➕ Agregar puerta

**POST** `/api/puertas/agregar`

```json
{
  "id": 0,
  "nombre": "Puerta principal",
  "estado": "abierta",
  "registro_entrada": true
}
```

### ➕ Agregar luz

**POST** `/api/luces/agregar`

```json
{
  "id": 0,
  "nombre": "Luz del pasillo",
  "estado": "encendida",
  "intensidad": 80
}
```

> ⚠️ Importante: Si `id = 0`, crea un nuevo registro. Si `id > 0`, lo actualiza.

---

## 👨‍💻 Autor

**César David Sánchez Trejo**
📚 Ingeniería en Desarrollo de Software Multiplataforma
📍 México

---

## 🛡️ Licencia

Este proyecto es libre para uso académico o personal. No se permite la distribución sin citar al autor.
