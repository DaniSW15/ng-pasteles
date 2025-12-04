export interface CreatePastelModel {
    nombre: string;
    sabor: string;
    precio: number;
    stock: number;
}

export interface UpdatePastel extends Partial<CreatePastelModel> {
    id: string;
}