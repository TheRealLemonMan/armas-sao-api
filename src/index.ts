import express from "express";
import armasRoutes from "./routes/armas.routes";
import { logger } from "./middlewares/logger.middleware";
import { manejoErrores } from "./middlewares/manejoErrores.middleware";

const app = express();
const PORT = 3000;

app.use(express.json());   // permite leer JSON en el body de las peticiones
app.use(logger);           // middleware de logging global

app.use("/armas", armasRoutes);

// Si no coincide ninguna ruta anterior
app.use((req, res, next) => {
  next({ status: 404, message: "Ruta no encontrada" });
});

app.use(manejoErrores);    // siempre al final, después de las rutas

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});