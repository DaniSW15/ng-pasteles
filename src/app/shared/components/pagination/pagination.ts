import { Component, input, output, computed } from '@angular/core';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';

@Component({
  selector: 'app-pagination',
  imports: [PaginatorModule],
  templateUrl: './pagination.html',
  styleUrl: './pagination.scss',
})
export class Pagination {
  currentPage = input.required<number>();
  pageSize = input<number>(10);
  totalCount = input.required<number>();
  rowsPerPageOptions = input<number[]>([10, 20, 30, 50]);

  pageChange = output<{ page: number; size: number }>();

  // Calcular el índice inicial para el paginador
  first = computed(() => (this.currentPage() - 1) * this.pageSize());

  onPageChange(event: PaginatorState) {
    const page =
      Math.floor((event.first ?? 0) / (event.rows ?? this.pageSize())) + 1;
    const size = event.rows ?? this.pageSize();
    this.pageChange.emit({ page, size });
  }
}
