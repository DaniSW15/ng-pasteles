import { Component, input, output } from '@angular/core';
import { Pedido } from '../../data-access/models/pedido.model';
import { DataTable, TableColumn } from '@app/shared/components/data-table/data-table';
import { LoadingSpinner } from '@app/shared/components/loading-spinner/loading-spinner';

@Component({
  selector: 'app-pedido-list',
  standalone: true,
  imports: [DataTable, LoadingSpinner],
  templateUrl: './pedido-list.html',
  styleUrl: './pedido-list.scss',
})
export class PedidoList {
  // Inputs
  pedidos = input.required<Pedido[]>();
  loading = input<boolean>(false);
  error = input<string | null>(null);

  // Outputs
  pedidoSelect = output<string>();
  pedidoEdit = output<string>();
  pedidoDelete = output<string>();

  // Columnas de la tabla
  columns: TableColumn[] = [
    { field: 'clienteNombre', header: 'Cliente', sortable: true },
    { field: 'fechaPedido', header: 'Fecha', sortable: true },
    { field: 'estado', header: 'Estado', sortable: true },
    { field: 'total', header: 'Total', sortable: true }
  ];

  onRowSelect(pedido: Pedido) {
    this.pedidoSelect.emit(pedido.id);
  }

  onRowEdit(pedido: Pedido) {
    this.pedidoEdit.emit(pedido.id);
  }

  onRowDelete(pedido: Pedido) {
    this.pedidoDelete.emit(pedido.id);
  }
}
