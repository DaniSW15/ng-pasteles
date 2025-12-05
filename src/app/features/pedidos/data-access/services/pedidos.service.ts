import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '@env/environment';
import { ApiService } from '@app/core/services/api/api-service';
import { AuthService } from '@app/features/auth/data-access/services/auth.service';
import { Pedido, CreatePedidoRequest, UpdatePedidoEstadoRequest } from '../models/pedido.model';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {
  private api = inject(ApiService);
  private http = inject(HttpClient);
  private authService = inject(AuthService);
  private baseUrl = environment.apiUrl;

  /**
   * Obtener todos los pedidos con paginación
   * GET /api/Pedidos?pageNumber=1&pageSize=10
   * Solo para Empleado y Admin
   */
  getPedidos(pageNumber: number = 1, pageSize: number = 10): Observable<Pedido[]> {
    const params = new HttpParams()
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString());

    return this.api.get<any>('Pedidos', params).pipe(
      map(response => {
        // Si la respuesta es un array, devolverlo directamente
        if (Array.isArray(response)) {
          return response;
        }
        // Si es un objeto con data, extraer el array
        if (response && response.data) {
          return response.data;
        }
        // Si es un objeto con items, extraer el array
        if (response && response.items) {
          return response.items;
        }
        // Si no es ninguno de los anteriores, devolver array vacío
        console.warn('Formato de respuesta inesperado:', response);
        return [];
      })
    );
  }

  /**
   * Obtener pedidos del cliente actual
   * GET /api/Pedidos/cliente/{clienteId}
   * Para Clientes (solo ven sus propios pedidos)
   */
  getMisPedidos(): Observable<Pedido[]> {
    const userId = this.authService.currentUser()?.id;
    if (!userId) {
      throw new Error('Usuario no autenticado');
    }
    return this.api.get<any>(`Pedidos/cliente/${userId}`).pipe(
      map(response => {
        // Si la respuesta es un array, devolverlo directamente
        if (Array.isArray(response)) {
          return response;
        }
        // Si es un objeto con data, extraer el array
        if (response && response.data) {
          return response.data;
        }
        // Si es un objeto con items, extraer el array
        if (response && response.items) {
          return response.items;
        }
        // Si no es ninguno de los anteriores, devolver array vacío
        console.warn('Formato de respuesta inesperado:', response);
        return [];
      })
    );
  }

  /**
   * Obtener un pedido por ID
   * GET /api/Pedidos/{id}
   */
  getPedidoById(id: string): Observable<Pedido> {
    return this.api.get<Pedido>(`Pedidos/${id}`);
  }

  /**
   * Crear un nuevo pedido
   * POST /api/Pedidos
   */
  createPedido(pedido: CreatePedidoRequest): Observable<Pedido> {
    return this.api.post<Pedido>('Pedidos', pedido);
  }

  /**
   * Actualizar el estado de un pedido
   * PATCH /api/Pedidos/{id}/estado
   * El backend espera solo el número del estado, no un objeto
   */
  updateEstado(id: string, request: UpdatePedidoEstadoRequest): Observable<Pedido> {
    // Enviar solo el valor numérico del estado con headers explícitos
    return this.http.patch<Pedido>(
      `${this.baseUrl}/Pedidos/${id}/estado`,
      request.estado,
      {
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }

  /**
   * Cancelar un pedido
   * PUT /api/Pedidos/{id}/cancel
   * Todos pueden cancelar sus propios pedidos
   */
  cancelPedido(id: string): Observable<Pedido> {
    return this.api.put<Pedido>(`Pedidos/${id}/cancel`, {});
  }

  /**
   * Eliminar un pedido (solo Admin)
   * DELETE /api/Pedidos/{id}
   */
  deletePedido(id: string): Observable<void> {
    return this.api.delete<void>(`Pedidos/${id}`);
  }

  /**
   * Obtener pedidos por cliente
   * GET /api/Pedidos/cliente/{clienteId}
   */
  getPedidosByCliente(clienteId: string): Observable<Pedido[]> {
    return this.api.get<Pedido[]>(`Pedidos/cliente/${clienteId}`);
  }
}
