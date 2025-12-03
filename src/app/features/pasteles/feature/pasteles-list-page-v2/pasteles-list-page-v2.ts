import { Component, signal } from '@angular/core';
import { inject } from '@angular/core';
import { HttpClient, httpResource } from '@angular/common/http';
import { environment } from '@env/environment';
import { PastelList } from '../../ui/pastel-list/pastel-list';
import { PagedListModel } from '@app/core/models/paged-list-model/paged-list.model';
import { Pastel } from '../../data-access/models/pastel.model';

@Component({
  selector: 'app-pasteles-list-page-v2',
  imports: [PastelList],
  template: `
    <div class="container">
      <h1>🎂 Pasteles (httpResource)</h1>
      
      <app-pastel-list
        [pasteles]="pastelesResource.value()?.items ?? []"
        [loading]="pastelesResource.isLoading()"
        [error]="pastelesResource.error()?.message ?? null"
        [currentPage]="currentPage()"
        [pageSize]="pageSize()"
        [totalCount]="pastelesResource.value()?.totalCount ?? 0"
        (pageChange)="onPageChange($event)"
        (pastelSelect)="onPastelSelect($event)"
        (pastelDelete)="onPastelDelete($event)"
      />
    </div>
  `,
})
export class PastelesListPageV2 {
  private http = inject(HttpClient);
  private baseUrl = environment.apiUrl;
  
  currentPage = signal(1);
  pageSize = signal(10);

  // httpResource automáticamente hace la petición cuando cambian los parámetros
  pastelesResource = httpResource<PagedListModel<Pastel>>(() => {
    const page = this.currentPage();
    const size = this.pageSize();
    return `${this.baseUrl}/Pasteles?pageNumber=${page}&pageSize=${size}`;
  });

  onPageChange(event: { page: number; size: number }) {
    this.currentPage.set(event.page);
    this.pageSize.set(event.size);
    // httpResource automáticamente recarga cuando cambian los signals
  }

  onPastelSelect(id: string) {
    console.log('Pastel seleccionado:', id);
  }

  onPastelDelete(id: string) {
    console.log('Eliminando pastel:', id);
    // Aquí harías el DELETE y luego recargarías
    this.http.delete(`${this.baseUrl}/Pasteles/${id}`).subscribe(() => {
      this.pastelesResource.reload(); // Recarga los datos
    });
  }
}
