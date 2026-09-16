import { Arma, NuevaArma, Rareza } from "../models/arma.model";

let armas: Arma[] = [
  { id: 1, nombre: "Espada de Élucidator", tipo: "Espada", ataqueBase: 50, durabilidad: 100, rareza: "legendario", estado: "forjada" },
  { id: 2, nombre: "Daga del Susurro", tipo: "Daga", ataqueBase: 30, durabilidad: 80, rareza: "raro", estado: "forjada" },
  { id: 3, nombre: "Lanza Perforadora", tipo: "Lanza", ataqueBase: 40, durabilidad: 90, rareza: "épico", estado: "forjada" },
];

let siguienteId = 4;

// --- Lógica reutilizada de tu Entregable 1 ---
const ordenRareza: Record<Rareza, number> = {
  "comun": 0, "poco comun": 1, "raro": 2, "épico": 3, "legendario": 4,
};

const bonusPorRareza: Record<Rareza, number> = {
  "comun": 1, "poco comun": 1.2, "raro": 1.5, "épico": 2, "legendario": 3,
};

export function calcularPoderTotal(arma: Arma): number {
  return Math.round(arma.ataqueBase * bonusPorRareza[arma.rareza]);
}

export function filtrarPorRarezaMinima(lista: Arma[], rarezaMinima: Rareza): Arma[] {
  return lista.filter((a) => ordenRareza[a.rareza] >= ordenRareza[rarezaMinima]);
}

// --- CRUD ---
export function listarArmas(): Arma[] {
  return armas;
}

export function obtenerArmaPorId(id: number): Arma | undefined {
  return armas.find((a) => a.id === id);
}

export function crearArma(datos: NuevaArma): Arma {
  const nuevaArma: Arma = { id: siguienteId++, ...datos };
  armas.push(nuevaArma);
  return nuevaArma;
}

export function actualizarArma(id: number, datos: Partial<NuevaArma>): Arma | undefined {
  const arma = obtenerArmaPorId(id);
  if (!arma) return undefined;
  Object.assign(arma, datos);
  return arma;
}

export function eliminarArma(id: number): boolean {
  const largoAntes = armas.length;
  armas = armas.filter((a) => a.id !== id);
  return armas.length < largoAntes;
}