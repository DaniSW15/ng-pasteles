export interface CreatePastelModel {
    nombre: string;
    descripcion: string;
    precio: number;
    disponible: boolean;
    imagenUrl?: string;
    categoria?: string;
}

export interface UpdatePastel extends Partial<CreatePastelModel> {
    id: string;
}