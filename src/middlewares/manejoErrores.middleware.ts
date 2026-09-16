import { Request, Response, NextFunction } from "express";

interface ErrorConEstado {
  status?: number;
  message?: string;
}

export function manejoErrores(
  err: ErrorConEstado,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const status = err.status ?? 500;
  const message = err.message ?? "Error interno del servidor";
  console.error(`Error ${status}: ${message}`);
  res.status(status).json({ error: message });
}