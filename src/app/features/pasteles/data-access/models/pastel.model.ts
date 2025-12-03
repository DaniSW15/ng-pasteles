export interface Pastel {
  id: string;
  nombre: string;
  descripcion: string;
  precio: number;
  disponible: boolean;
  imagenUrl?: string;
  categoria?: string;
  fechaCreacion: Date;
}
