export interface ResumenGeneral {
    totalPedidos: number;
    totalVentas: number;
    pedidosPendientes: number;
    clientesActivos: number;
}

export interface VentaDelDia {
    pedidoId: string;
    cliente: string;
    total: number;
    hora: Date;
}

export interface PastelVendido {
    nombre: string;
    cantidad: number;
}

export interface ClienteTop {
    nombre: string;
    totalPedidos: number;
    totalGastado: number;
}