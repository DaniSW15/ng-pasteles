import { Component, signal, effect } from '@angular/core';
import { inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { PastelesApi } from '../../data-access/services/pasteles-api';
import { PastelList } from '../../ui/pastel-list/pastel-list';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-pasteles-list-page-v3',
  imports: [PastelList],
  template: `
    <div class="container">
      <h1>🎂 Pasteles (toSignal + switchMap)</h1>
      
      <app-pastel-list
        [pasteles]="data()?.items ?? []"
        [loading]="loading()"
        [error]="error()"
        [currentPage]="currentPage()"
        [pageSize]="pageSize()"
        [totalCount]="data()?.totalCount ?? 0"
        (pageChange)="onPageChange($event)"
        (pastelSelect)="onPastelSelect($event)"
        (pastelDelete)="onPastelDelete($event)"
      />
    </div>
  `,
})
export class PastelesListPageV3 {
  private pastelesApi = inject(PastelesApi);
  
  currentPage = signal(1);
  pageSize = signal(10);
  loading = signal(false);
  error = signal<string | null>(null);

  // Usa toSignal con switchMap para reactividad
  data = toSignal(
    this.pastelesApi.getAll(this.currentPage(), this.pageSize())
  );

  constructor() {
    // Recarga cuando cambian los parámetros
    effect(() => {
      this.loading.set(true);
      this.pastelesApi.getAll(this.currentPage(), this.pageSize()).subscribe({
        next: () => {
          this.loading.set(false);
          this.error.set(null);
        },
        error: (err) => {
          this.loading.set(false);
          this.error.set(err.message);
        }
      });
    });
  }

  onPageChange(event: { page: number; size: number }) {
    this.currentPage.set(event.page);
    this.pageSize.set(event.size);
  }

  onPastelSelect(id: string) {
    console.log('Pastel seleccionado:', id);
  }

  onPastelDelete(id: string) {
    console.log('Eliminando pastel:', id);
    this.pastelesApi.delete(id).subscribe(() => {
      // Recarga automáticamente por el effect
    });
  }
}
