import { Component, input, output } from '@angular/core';
import { ICliente } from '../../data-access/models/cliente.model';
import { TableColumn, DataTable } from '@app/shared/components/data-table/data-table';
import { LoadingSpinner } from "@app/shared/components/loading-spinner/loading-spinner";
import { Pagination } from "@app/shared/components/pagination/pagination";

@Component({
  selector: 'app-cliente-list',
  imports: [LoadingSpinner, DataTable, Pagination],
  templateUrl: './cliente-list.html',
  styleUrl: './cliente-list.scss',
})
export class ClienteList {
  // Inputs
  clientes = input.required<ICliente[]>();
  loading = input<boolean>(false);
  error = input<string | null>(null);
  currentPage = input<number>(1);
  pageSize = input<number>(10);
  totalCount = input<number>(0);

  // Outputs
  pageChange = output<{ page: number; size: number;}>();
  clienteSelect = output<string>();
  clienteDelete = output<string>();

  columns: TableColumn[] = [
    { field: 'nombre', header: 'Nombre', sortable: true },
    { field: 'email', header: 'Email', sortable: true },
    { field: 'telefono', header: 'Telefono', sortable: true },
    { field: 'direccion', header: 'Dirección', sortable: true },
    { field: 'fechaRegistro', header: 'Fecha registro', sortable: true }
  ]

  onRowSelect(cliente: ICliente) {
    this.clienteSelect.emit(cliente.id);
  }

  onRowDelete(cliente: ICliente) {
    this.clienteDelete.emit(cliente.id);
  }
}


