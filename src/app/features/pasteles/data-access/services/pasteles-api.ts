import { HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { PagedListModel } from '@app/core/models/paged-list-model/paged-list.model';
import { ApiService } from '@app/core/services/api/api-service';
import { Observable } from 'rxjs';
import { Pastel } from '../models/pastel.model';
import { CreatePastelModel } from '../models/create-pastel.model';

@Injectable({
  providedIn: 'root',
})
export class PastelesApi {
  private api = inject(ApiService);

  getAll(pageNumber = 1, pageSize = 10): Observable<PagedListModel<Pastel>> {
    const params = new HttpParams().set('pageNumber', pageNumber).set('pageSize', pageSize);
    return this.api.get<PagedListModel<Pastel>>('Pasteles', params);
  }

  getById(id: string): Observable<Pastel> {
    return this.api.get<Pastel>(`Pasteles/${id}`);
  }

  getDisponibles(): Observable<Pastel[]> {
    return this.api.get<Pastel[]>('Pasteles/disponibles');
  }

  create(pastel: CreatePastelModel): Observable<Pastel> {
    return this.api.post<Pastel>('Pasteles', pastel);
  }

  update(id: string, pastel: Partial<Pastel>): Observable<Pastel> {
    return this.api.put<Pastel>(`Pasteles/${id}`, pastel);
  }

  delete(id: string): Observable<void> {
    return this.api.delete<void>(`Pasteles/${id}`);
  }

  // Factory para crear un httpResource (usar en componentes)
  createPastelesResource(page: () => number, size: () => number) {
    return {
      request: () => ({ page: page(), size: size() }),
      loader: ({ request }: { request: { page: number; size: number } }) => 
        this.getAll(request.page, request.size)
    };
  }
}
