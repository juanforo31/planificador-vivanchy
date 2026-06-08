export type EstadoServicio = "Pendiente" | "Confirmado" | "En camino" | "Completado" | "Cancelado";

export interface Event {
  id: string;
  idServicio: number;
  patientName: string;
  tipoServicio: string;
  estado: EstadoServicio;
  fecha: string; // ISO datetime
  direccionOrigen?: string;
  direccionDestino?: string;
  notas?: string;
  coordinadorNombre?: string;
  coordinadorTelefono?: string;
  coordinadorRol?: string;
}
