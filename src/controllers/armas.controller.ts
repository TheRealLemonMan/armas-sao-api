import { Request, Response, NextFunction } from "express";
import * as armasService from "../services/armas.service";

export function getArmas(req: Request, res: Response) {
  res.status(200).json(armasService.listarArmas());
}

export function getArmaPorId(req: Request, res: Response, next: NextFunction) {
  const id = Number(req.params.id);
  const arma = armasService.obtenerArmaPorId(id);
  if (!arma) {
    return next({ status: 404, message: `Arma con id ${id} no encontrada` });
  }
  res.status(200).json(arma);
}

export function postArma(req: Request, res: Response) {
  const nuevaArma = armasService.crearArma(req.body);
  res.status(201).json(nuevaArma);
}

export function putArma(req: Request, res: Response, next: NextFunction) {
  const id = Number(req.params.id);
  const armaActualizada = armasService.actualizarArma(id, req.body);
  if (!armaActualizada) {
    return next({ status: 404, message: `Arma con id ${id} no encontrada` });
  }
  res.status(200).json(armaActualizada);
}

export function deleteArma(req: Request, res: Response, next: NextFunction) {
  const id = Number(req.params.id);
  const eliminada = armasService.eliminarArma(id);
  if (!eliminada) {
    return next({ status: 404, message: `Arma con id ${id} no encontrada` });
  }
  res.status(204).send();
}