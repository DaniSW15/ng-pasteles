export interface PedidoDetalle {
  pastelId: string;
  pastelNombre: string;
  cantidad: number;
  precioUnitario: number;
  subtotal: number;
}

export interface Pedido {
  id: string;
  clienteId: string;
  clienteNombre: string;
  fechaPedido: string;
  estado: EstadoPedido;
  total: number;
  detalles: PedidoDetalle[];
}

export enum EstadoPedido {
  Pendiente = 1,
  EnProceso = 2,
  Completado = 3,
  Cancelado = 4
}

export interface CreatePedidoRequest {
  clienteId: string;
  detalles: CreatePedidoDetalle[];
}

export interface CreatePedidoDetalle {
  pastelId: string;
  cantidad: number;
}

export interface UpdatePedidoEstadoRequest {
  estado: EstadoPedido;
}

export function getEstadoLabel(estado: EstadoPedido): string {
  switch (estado) {
    case EstadoPedido.Pendiente:
      return 'Pendiente';
    case EstadoPedido.EnProceso:
      return 'En Proceso';
    case EstadoPedido.Completado:
      return 'Completado';
    case EstadoPedido.Cancelado:
      return 'Cancelado';
    default:
      return 'Desconocido';
  }
}

export function getEstadoSeverity(estado: EstadoPedido): 'success' | 'info' | 'warn' | 'danger' {
  switch (estado) {
    case EstadoPedido.Pendiente:
      return 'warn';
    case EstadoPedido.EnProceso:
      return 'info';
    case EstadoPedido.Completado:
      return 'success';
    case EstadoPedido.Cancelado:
      return 'danger';
    default:
      return 'info';
  }
}
