import { computed, inject } from '@angular/core';
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap, catchError, of } from 'rxjs';
import { Pedido, CreatePedidoRequest, UpdatePedidoEstadoRequest } from '../models/pedido.model';
import { PedidosService } from '../services/pedidos.service';
import { AuthService } from '@app/features/auth/data-access/services/auth.service';

interface PedidosState {
  pedidos: Pedido[];
  selectedPedido: Pedido | null;
  loading: boolean;
  error: string | null;
  currentPage: number;
  pageSize: number;
  totalCount: number;
}

const initialState: PedidosState = {
  pedidos: [],
  selectedPedido: null,
  loading: false,
  error: null,
  currentPage: 1,
  pageSize: 10,
  totalCount: 0
};

export const PedidosStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed(({ pedidos }) => ({
    pedidosCount: computed(() => pedidos().length),
    hasPedidos: computed(() => pedidos().length > 0)
  })),
  withMethods((store, pedidosService = inject(PedidosService), authService = inject(AuthService)) => ({
    // Cargar pedidos con paginación
    loadPedidos: rxMethod<{ page: number; size: number }>(
      pipe(
        tap(() => patchState(store, { loading: true, error: null })),
        switchMap(({ page, size }) => {
          // Determinar qué método usar según el rol
          const user = authService.currentUser();

          // Si es Cliente, solo ve sus propios pedidos
          const request$ = user?.rol === 'Cliente'
            ? pedidosService.getMisPedidos()
            : pedidosService.getPedidos(page, size);

          return request$.pipe(
            tap((pedidos) => {
              patchState(store, {
                pedidos,
                currentPage: page,
                pageSize: size,
                totalCount: pedidos.length,
                loading: false
              });
            }),
            catchError((error: any) => {
              console.error('Error cargando pedidos:', error);
              patchState(store, {
                error: error.message || 'Error al cargar pedidos',
                loading: false
              });
              return of([]);
            })
          );
        })
      )
    ),

    // Cargar un pedido por ID
    loadPedidoById: rxMethod<string>(
      pipe(
        tap(() => patchState(store, { loading: true, error: null })),
        switchMap((id) =>
          pedidosService.getPedidoById(id).pipe(
            tap((pedido) => {
              patchState(store, {
                selectedPedido: pedido,
                loading: false
              });
            }),
            catchError((error: any) => {
              console.error('Error cargando pedido:', error);
              patchState(store, {
                error: error.message || 'Error al cargar pedido',
                loading: false
              });
              return of(null);
            })
          )
        )
      )
    ),

    // Crear pedido
    createPedido: rxMethod<CreatePedidoRequest>(
      pipe(
        tap(() => patchState(store, { loading: true, error: null })),
        switchMap((pedido) =>
          pedidosService.createPedido(pedido).pipe(
            tap((newPedido) => {
              patchState(store, {
                pedidos: [...store.pedidos(), newPedido],
                loading: false
              });
            }),
            catchError((error: any) => {
              console.error('Error creando pedido:', error);
              patchState(store, {
                error: error.message || 'Error al crear pedido',
                loading: false
              });
              return of(null);
            })
          )
        )
      )
    ),

    // Actualizar estado del pedido
    updateEstado: rxMethod<{ id: string; request: UpdatePedidoEstadoRequest }>(
      pipe(
        tap(() => patchState(store, { loading: true, error: null })),
        switchMap(({ id, request }) =>
          pedidosService.updateEstado(id, request).pipe(
            tap((updatedPedido) => {
              patchState(store, {
                pedidos: store.pedidos().map(p => p.id === id ? updatedPedido : p),
                selectedPedido: store.selectedPedido()?.id === id ? updatedPedido : store.selectedPedido(),
                loading: false
              });
            }),
            catchError((error: any) => {
              console.error('Error actualizando estado:', error);
              patchState(store, {
                error: error.message || 'Error al actualizar estado',
                loading: false
              });
              return of(null);
            })
          )
        )
      )
    ),

    // Cancelar pedido
    cancelPedido: rxMethod<string>(
      pipe(
        tap(() => patchState(store, { loading: true, error: null })),
        switchMap((id) =>
          pedidosService.cancelPedido(id).pipe(
            tap((canceledPedido) => {
              patchState(store, {
                pedidos: store.pedidos().map(p => p.id === id ? canceledPedido : p),
                loading: false
              });
            }),
            catchError((error: any) => {
              console.error('Error cancelando pedido:', error);
              patchState(store, {
                error: error.message || 'Error al cancelar pedido',
                loading: false
              });
              return of(null);
            })
          )
        )
      )
    ),

    // Eliminar pedido (solo Admin)
    deletePedido: rxMethod<string>(
      pipe(
        tap(() => patchState(store, { loading: true, error: null })),
        switchMap((id) =>
          pedidosService.deletePedido(id).pipe(
            tap(() => {
              patchState(store, {
                pedidos: store.pedidos().filter(p => p.id !== id),
                loading: false
              });
            }),
            catchError((error: any) => {
              console.error('Error eliminando pedido:', error);
              patchState(store, {
                error: error.message || 'Error al eliminar pedido',
                loading: false
              });
              return of(null);
            })
          )
        )
      )
    ),

    // Limpiar error
    clearError: () => patchState(store, { error: null }),

    // Limpiar pedido seleccionado
    clearSelectedPedido: () => patchState(store, { selectedPedido: null })
  }))
);
