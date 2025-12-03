export interface CreateClienteModel {
    nombre: string
    email: string
    telefono: string
    direccion: string
}

export interface UpdateCliente extends Partial<CreateClienteModel> {
    id: string
}
