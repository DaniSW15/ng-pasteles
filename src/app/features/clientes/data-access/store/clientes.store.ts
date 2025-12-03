import { patchState, signalStore, withMethods, withState } from "@ngrx/signals";
import { ICliente } from "../models/cliente.model"
import { inject } from "@angular/core";
import { ClientesApi } from "../services/clientes-api";
import { rxMethod } from "@ngrx/signals/rxjs-interop";
import { pipe, switchMap, tap } from "rxjs";

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
    loadClientes: rxMethod<{ page: number; size: number}>(
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
                })
            ))
        )
    )
})))