import { inject } from "@angular/core";
import { patchState, signalStore, withMethods, withState } from "@ngrx/signals";
import { rxMethod } from "@ngrx/signals/rxjs-interop";
import { pipe, switchMap, tap } from "rxjs";
import { ClienteTop, PastelVendido, ResumenGeneral, VentaDelDia } from "../models/reportes.interface";
import { ReportesApiService } from "../services/reportes-api";

// State
type ReportesState = {
    resumenGeneral: ResumenGeneral | null;
    ventasDelDia: VentaDelDia[];
    pastelesMasVendidos: PastelVendido[];
    clientesTop: ClienteTop[];
    loading: boolean;
    error: string | null;
};

const initialState: ReportesState = {
    resumenGeneral: null,
    ventasDelDia: [],
    pastelesMasVendidos: [],
    clientesTop: [],
    loading: false,
    error: null
};

export const ReportesStore = signalStore(
    { providedIn: 'root' },
    withState(initialState),
    withMethods((store, reportesApi = inject(ReportesApiService)) => ({

        loadResumenGeneral: rxMethod<void>(
            pipe(
                tap(() => patchState(store, { loading: true })),
                switchMap(() =>
                    reportesApi.getResumenGeneral().pipe(
                        tap((data) =>
                            patchState(store, {
                                resumenGeneral: data,
                                loading: false
                            })
                        )
                    )
                )
            )
        ),

        loadVentasDelDia: rxMethod<void>(
            pipe(
                tap(() => patchState(store, { loading: true })),
                switchMap(() =>
                    reportesApi.getVentasDelDia().pipe(
                        tap((data) =>
                            patchState(store, {
                                ventasDelDia: data,
                                loading: false
                            })
                        )
                    )
                )
            )
        ),

        loadPastelesMasVendidos: rxMethod<void>(
            pipe(
                tap(() => patchState(store, { loading: true })),
                switchMap(() =>
                    reportesApi.getPastelesMasVendidos().pipe(
                        tap((data) =>
                            patchState(store, {
                                pastelesMasVendidos: data,
                                loading: false
                            })
                        )
                    )
                )
            )
        ),

        loadClientesTop: rxMethod<void>(
            pipe(
                tap(() => patchState(store, { loading: true })),
                switchMap(() =>
                    reportesApi.getClientesTop().pipe(
                        tap((data) =>
                            patchState(store, {
                                clientesTop: data,
                                loading: false
                            })
                        )
                    )
                )
            )
        ),

        loadAllReportes() {
            this.loadResumenGeneral();
            this.loadVentasDelDia();
            this.loadPastelesMasVendidos();
            this.loadClientesTop();
        }
    }))
);