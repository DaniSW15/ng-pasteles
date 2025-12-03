import { signalStore, withState, withMethods, patchState } from '@ngrx/signals';
import { inject } from '@angular/core';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap } from 'rxjs';
import { PastelesApi } from '../services/pasteles-api';
import { CreatePastelModel } from '../models/create-pastel.model';
import { Pastel } from '../models/pastel.model';

type PastelesState = {
  pasteles: Pastel[];
  selectedPastel: Pastel | null;
  loading: boolean;
  error: string | null;
  currentPage: number;
  totalPages: number;
  totalCount: number;
};

const initialState: PastelesState = {
  pasteles: [],
  selectedPastel: null,
  loading: false,
  error: null,
  currentPage: 1,
  totalPages: 0,
  totalCount: 0,
};

export const PastelesStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store, pastelesApi = inject(PastelesApi)) => ({
    loadPasteles: rxMethod<{ page: number; size: number }>(
      pipe(
        tap(() => patchState(store, { loading: true, error: null })),
        switchMap(({ page, size }) =>
          pastelesApi.getAll(page, size).pipe(
            tap((response) => {
              // console.log('📦 Respuesta API:', response);
              // console.log('🍰 Pasteles recibidos:', response.items);
              patchState(store, {
                pasteles: response.items,
                currentPage: response.pageNumber,
                totalPages: response.totalPages,
                totalCount: response.totalCount,
                loading: false,
              });
            })
          )
        )
      )
    ),

    selectPastel: (id: string) => {
      patchState(store, { loading: true });
      pastelesApi.getById(id).subscribe({
        next: (pastel) =>
          patchState(store, { selectedPastel: pastel, loading: false }),
        error: (error) =>
          patchState(store, { error: error.message, loading: false }),
      });
    },

    createPastel: (pastel: CreatePastelModel) => {
      patchState(store, { loading: true });
      pastelesApi.create(pastel).subscribe({
        next: (newPastel) =>
          patchState(store, {
            pasteles: [...store.pasteles(), newPastel],
            loading: false,
          }),
        error: (error) =>
          patchState(store, { error: error.message, loading: false }),
      });
    },

    deletePastel: (id: string) => {
      patchState(store, { loading: true });
      pastelesApi.delete(id).subscribe({
        next: () =>
          patchState(store, {
            pasteles: store.pasteles().filter((p) => p.id !== id),
            loading: false,
          }),
        error: (error) =>
          patchState(store, { error: error.message, loading: false }),
      });
    },
  }))
);
