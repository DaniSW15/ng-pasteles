import { Injectable, inject } from '@angular/core';
import { PagedListModel } from '@app/core/models/paged-list-model/paged-list.model';
import { ApiService } from '@app/core/services/api/api-service';
import { Observable } from 'rxjs';
import { ICliente } from '../models/cliente.model';
import { HttpParams } from '@angular/common/http';
import { CreateClienteModel } from '../models/create-cliente.model';

@Injectable({
  providedIn: 'root',
})
export class ClientesApi {
  private readonly api = inject(ApiService);

  getAll(pageNumber = 1, pageSize = 10): Observable<PagedListModel<ICliente>> {
    const params = new HttpParams().set('pageNumber', pageNumber).set('pageSize', pageSize);
    return this.api.get<PagedListModel<ICliente>>('Clientes', params);
  }

  getById(id: string): Observable<ICliente> {
    return this.api.get<ICliente>(`Clientes/${id}`);
  }

  create(cliente: CreateClienteModel): Observable<ICliente> {
    return this.api.post<ICliente>('Clientes', cliente);
  }

  update(id: string, cliente: Partial<ICliente>): Observable<ICliente> {
    return this.api.put<ICliente>(`Clientes/${id}`, cliente);
  }

  delete(id: string): Observable<void> {
    return this.api.delete<void>(`Clientes/${id}`);
  }

  syncClientes(): Observable<any> {
    return this.api.post<any>('Clientes/sync', {});
  }
}
