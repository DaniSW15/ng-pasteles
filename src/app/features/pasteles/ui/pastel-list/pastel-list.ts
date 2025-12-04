import { Component, input, output } from '@angular/core';
import { Pastel } from '../../data-access/models/pastel.model';
import { Pagination } from '@app/shared/components/pagination/pagination';
import { DataTable, TableColumn } from '@app/shared/components/data-table/data-table';
import { LoadingSpinner } from '@app/shared/components/loading-spinner/loading-spinner';
import { PastelCard } from '../pastel-card/pastel-card';

@Component({
  selector: 'app-pastel-list',
  imports: [DataTable, Pagination, LoadingSpinner, PastelCard],
  templateUrl: './pastel-list.html',
  styleUrl: './pastel-list.scss',
})
export class PastelList {
  // Inputs
  pasteles = input.required<Pastel[]>();
  loading = input<boolean>(false);
  error = input<string | null>(null);
  currentPage = input<number>(1);
  pageSize = input<number>(5);
  totalCount = input<number>(0);
  viewMode = input<'table' | 'grid'>('table');

  // Outputs
  pageChange = output<{ page: number; size: number }>();
  pastelSelect = output<string>();
  pastelEdit = output<string>();
  pastelDelete = output<string>();

  // Columnas de la tabla
  columns: TableColumn[] = [
    { field: 'nombre', header: 'Nombre', sortable: true },
    { field: 'sabor', header: 'Sabor', sortable: true },
    { field: 'precio', header: 'Precio', sortable: true },
    { field: 'stock', header: 'Stock', sortable: true },
  ];

  onRowSelect(pastel: Pastel) {
    this.pastelSelect.emit(pastel.id);
  }

  onRowEdit(pastel: Pastel) {
    this.pastelEdit.emit(pastel.id);
  }

  onRowDelete(pastel: Pastel) {
    this.pastelDelete.emit(pastel.id);
  }
}
