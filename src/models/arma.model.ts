export type Rareza = "comun" | "poco comun" | "raro" | "épico" | "legendario";
export type TipoArma = "Espada" | "Daga" | "Lanza";
export type EstadoForja = "sin forjar" | "forjando" | "forjada" | "bendecida" | "corrompida";

export interface ArmaBase {
  nombre: string;
  tipo: TipoArma;
  ataqueBase: number;
  durabilidad: number;
}

export interface Arma extends ArmaBase {
  id: number;
  rareza: Rareza;
  estado: EstadoForja;
}

// Tipo auxiliar: lo que el cliente manda al crear una arma (sin id, lo genera el service)
export type NuevaArma = Omit<Arma, "id">;