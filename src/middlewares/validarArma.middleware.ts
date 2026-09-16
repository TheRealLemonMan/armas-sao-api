import { Request, Response, NextFunction } from "express";

const tiposValidos = ["Espada", "Daga", "Lanza"];

export function validarArma(req: Request, res: Response, next: NextFunction) {
  const { nombre, tipo, ataqueBase, durabilidad } = req.body;

  if (!nombre || typeof nombre !== "string") {
    return next({ status: 400, message: "El campo 'nombre' es obligatorio y debe ser texto" });
  }
  if (!tiposValidos.includes(tipo)) {
    return next({ status: 400, message: `El campo 'tipo' debe ser uno de: ${tiposValidos.join(", ")}` });
  }
  if (typeof ataqueBase !== "number" || ataqueBase < 0) {
    return next({ status: 400, message: "El campo 'ataqueBase' debe ser un número positivo" });
  }
  if (typeof durabilidad !== "number" || durabilidad < 0) {
    return next({ status: 400, message: "El campo 'durabilidad' debe ser un número positivo" });
  }

  next();
}