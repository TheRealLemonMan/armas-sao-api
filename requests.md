# Pruebas manuales — API de Armas SAO

Todas las pruebas se realizaron con Thunder Client contra el servidor local (`http://localhost:3000`).

---

## 1. GET /armas — Listar todas las armas

**Request:** `GET http://localhost:3000/armas`

**Status:** `200 OK`

**Response (ejemplo, lista completa incluyendo el arma creada en la prueba 4):**
```json
[
  {
    "id": 2,
    "nombre": "Daga del Susurro +1",
    "tipo": "Daga",
    "ataqueBase": 35,
    "durabilidad": 80,
    "rareza": "raro",
    "estado": "forjada"
  },
  {
    "id": 6,
    "nombre": "Rapier Sangriento",
    "tipo": "Espada",
    "ataqueBase": 45,
    "durabilidad": 70,
    "rareza": "raro",
    "estado": "forjada"
  }
]
```

---

## 2. GET /armas/:id — Obtener una arma por id

**Request:** `GET http://localhost:3000/armas/2`

**Status:** `200 OK`

**Response:**
```json
{
  "id": 2,
  "nombre": "Daga del Susurro +1",
  "tipo": "Daga",
  "ataqueBase": 35,
  "durabilidad": 80,
  "rareza": "raro",
  "estado": "forjada"
}
```

---

## 3. POST /armas — Crear una nueva arma

**Request:** `POST http://localhost:3000/armas`

**Body:**
```json
{
  "nombre": "Rapier Sangriento",
  "tipo": "Espada",
  "ataqueBase": 45,
  "durabilidad": 70
}
```

**Status:** `201 Created`

**Response:**
```json
{
  "id": 6,
  "nombre": "Rapier Sangriento",
  "tipo": "Espada",
  "ataqueBase": 45,
  "durabilidad": 70,
  "rareza": "raro",
  "estado": "forjada"
}
```

---

## 4. PUT /armas/:id — Actualizar una arma existente

**Request:** `PUT http://localhost:3000/armas/2`

**Body:**
```json
{
  "nombre": "Daga del Susurro +1",
  "tipo": "Daga",
  "ataqueBase": 35,
  "durabilidad": 80
}
```

**Status:** `200 OK`

**Response:**
```json
{
  "id": 2,
  "nombre": "Daga del Susurro +1",
  "tipo": "Daga",
  "ataqueBase": 35,
  "durabilidad": 80,
  "rareza": "raro",
  "estado": "forjada"
}
```

---

## 5. DELETE /armas/:id — Eliminar una arma

**Request:** `DELETE http://localhost:3000/armas/4`

**Status:** `204 No Content`

**Response:** (sin contenido en el body, como espera el estándar HTTP para un DELETE exitoso)

---

## 6. GET /armas/:id — Caso de error: id inexistente

**Request:** `GET http://localhost:3000/armas/999`

**Status:** `404 Not Found`

**Response:**
```json
{
  "error": "Arma con id 999 no encontrada"
}
```

Esto confirma que el controller detecta correctamente cuando el recurso no existe y delega el error al middleware centralizado (`manejoErrores`).

---

## 7. POST /armas — Caso de error: validación de datos

**Request:** `POST http://localhost:3000/armas`

**Body:**
```json
{ "nombre": "Arma incompleta" }
```

**Status:** `400 Bad Request`

**Response:**
```json
{
  "error": "El campo 'tipo' debe ser uno de: Espada, Daga, Lanza"
}
```

Esto confirma que el middleware `validarArma` intercepta la petición antes de llegar al controller cuando faltan campos obligatorios o tienen un tipo/valor inválido.

---

## Resumen de cobertura

| Método | Ruta | Caso | Status |
|---|---|---|---|
| GET | /armas | Listar todas | 200 |
| GET | /armas/:id | Obtener por id (éxito) | 200 |
| GET | /armas/:id | Id inexistente (error) | 404 |
| POST | /armas | Crear arma (éxito) | 201 |
| POST | /armas | Datos inválidos (error) | 400 |
| PUT | /armas/:id | Actualizar arma | 200 |
| DELETE | /armas/:id | Eliminar arma | 204 |

Con esto se cubren los 5 verbos HTTP requeridos, sus códigos de estado correspondientes, y al menos un caso de error por validación y por recurso no encontrado.