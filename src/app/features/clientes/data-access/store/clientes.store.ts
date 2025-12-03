import { patchState, signalStore, withMethods, withState } from "@ngrx/signals";
import { ICliente } from "../models/cliente.model"
import { inject } from "@angular/core";
import { ClientesApi } from "../services/clientes-api";
import { rxMethod } from "@ngrx/signals/rxjs-interop";
import { pipe, switchMap, tap, catchError, of } from "rxjs";
import { CreateClienteModel } from "../models/create-cliente.model";

type ClientesState = {
    clientes: ICliente[];
    selectedCliente: ICliente | null;
    loading: boolean;
    error: string | null;
    currentPage: number;
    totalPages: number;
    totalCount: number;
};

const initialState: ClientesState = {
    clientes: [],
    selectedCliente: null,
    loading: false,
    error: null,
    currentPage: 1,
    totalPages: 0,
    totalCount: 0,
};

export const ClientesStore = signalStore({ providedIn: 'root' }, withState(initialState), withMethods((store, clientesApi = inject(ClientesApi)) => ({
    loadClientes: rxMethod<{ page: number; size: number }>(
        pipe(
            tap(() => patchState(store, { loading: true, error: null })),
            switchMap(({ page, size }) => clientesApi.getAll(page, size).pipe(
                tap((response) => {
                    console.log('Respuesta API:', response);
                    patchState(store, {
                        clientes: response.items,
                        currentPage: response.pageNumber,
                        totalPages: response.totalPages,
                        totalCount: response.totalCount,
                        loading: false
                    })
                }),
                catchError((error) => {
                    const errorMessage = error.status === 0
                        ? 'El servidor no está disponible. Se recuperará pronto.'
                        : error.message || 'Error al cargar los clientes';
                    patchState(store, {
                        error: errorMessage,
                        loading: false
                    });
                    return of(null);
                })
            ))
        )
    ),

    selectCliente: (id: string) => {
        patchState(store, { loading: true });
        clientesApi.getById(id).subscribe({
            next: (cliente) => patchState(store, { selectedCliente: cliente, loading: false }),
            error: (error) => patchState(store, { error: error.message, loading: false })
        })
    },

    createCliente: (cliente: CreateClienteModel) => {
        patchState(store, { loading: true });
        clientesApi.create(cliente).subscribe({
            next: (newCliente) => patchState(store, {
                clientes: [...store.clientes(), newCliente],
                loading: false
            }),
            error: (error) => patchState(store, { error: error.message, loading: false }),
        });
    },

    updateCliente: (id: string, cliente: Partial<ICliente>) => {
        patchState(store, { loading: true });
        clientesApi.update(id, cliente).subscribe({
            next: (updatedCliente) => patchState(store, {
                clientes: store.clientes().map((p) => p.id === id ? updatedCliente : p),
                loading: false
            }),
            error: (error) => patchState(store, { error: error.message, loading: false }),
        });
    },

    deleteCliente: (id: string) => {
        patchState(store, { loading: true });
        clientesApi.delete(id).subscribe({
            next: () => patchState(store, {
                clientes: store.clientes().filter((p) => p.id !== id),
                loading: false,
            }),
            error: (error) => patchState(store, { error: error.message, loading: false }),
        });
    },
})))