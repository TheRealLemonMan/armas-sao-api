# Armas SAO API

API REST temática de un catálogo de armas de un MMORPG estilo Sword Art Online. Construida con Node.js, Express y TypeScript, usando datos en memoria (sin base de datos).

## Tema

El recurso principal es el **Arma**, con los siguientes campos:
- `id`: identificador único
- `nombre`: nombre del arma
- `tipo`: `"Espada" | "Daga" | "Lanza"`
- `ataqueBase`: número de ataque base
- `durabilidad`: durabilidad del arma
- `rareza`: `"comun" | "poco comun" | "raro" | "épico" | "legendario"`
- `estado`: `"sin forjar" | "forjando" | "forjada" | "bendecida" | "corrompida"`

## Estructura del proyecto

```
src/
├── controllers/
│   └── armas.controller.ts         # maneja req/res de cada endpoint
├── middlewares/
│   ├── logger.middleware.ts        # logging de cada request
│   ├── manejoErrores.middleware.ts # manejo centralizado de errores
│   └── validarArma.middleware.ts   # valida el body en POST/PUT
├── models/
│   └── arma.model.ts               # tipos e interfaces del dominio
├── routes/
│   └── armas.routes.ts             # define las rutas REST
├── services/
│   └── armas.service.ts            # lógica de negocio + datos en memoria
└── index.ts                        # punto de entrada, arranca el servidor
```

## Instalación

```bash
npm install
```

## Ejecución

Modo desarrollo (con recarga automática):
```bash
npm run dev
```

Compilar a JavaScript:
```bash
npm run build
```

Ejecutar la versión compilada:
```bash
npm start
```

El servidor corre por defecto en `http://localhost:3000`.

## Endpoints

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/armas` | Lista todas las armas |
| GET | `/armas/:id` | Obtiene una arma por su id |
| POST | `/armas` | Crea una nueva arma |
| PUT | `/armas/:id` | Actualiza una arma existente |
| DELETE | `/armas/:id` | Elimina una arma |

Ejemplos de request/response de cada endpoint, incluyendo casos de error, están documentados en [`requests.md`](./requests.md).

## Middlewares

- **Logger**: registra método, ruta y timestamp de cada petición.
- **Validación (`validarArma`)**: valida los campos obligatorios y sus tipos antes de crear/actualizar un arma.
- **Manejo centralizado de errores**: captura errores lanzados con `next({ status, message })` y responde con un JSON consistente (`{ error: mensaje }`) y el código HTTP correspondiente.