import { computed, inject } from '@angular/core';
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap, catchError, of } from 'rxjs';
import { User } from '@app/features/auth/data-access/models/auth.model';
import { UsersService, CreateUserRequest, UpdateUserRequest } from '../services/users.service';

interface UsersState {
  users: User[];
  selectedUser: User | null;
  loading: boolean;
  error: string | null;
  currentPage: number;
  pageSize: number;
  totalCount: number;
}

const initialState: UsersState = {
  users: [],
  selectedUser: null,
  loading: false,
  error: null,
  currentPage: 1,
  pageSize: 10,
  totalCount: 0
};

export const UsersStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed(({ users }) => ({
    usersCount: computed(() => users().length),
    hasUsers: computed(() => users().length > 0)
  })),
  withMethods((store, usersService = inject(UsersService)) => ({
    // Cargar usuarios con paginación
    loadUsers: rxMethod<{ page: number; size: number }>(
      pipe(
        tap(() => patchState(store, { loading: true, error: null })),
        switchMap(({ page, size }) =>
          usersService.getUsers(page, size).pipe(
            tap((users) => {
              patchState(store, {
                users,
                currentPage: page,
                pageSize: size,
                totalCount: users.length,
                loading: false
              });
            }),
            catchError((error: any) => {
              console.error('Error cargando usuarios:', error);
              patchState(store, {
                error: error.message || 'Error al cargar usuarios',
                loading: false
              });
              return of([]);
            })
          )
        )
      )
    ),

    // Crear usuario
    createUser: rxMethod<CreateUserRequest>(
      pipe(
        tap(() => patchState(store, { loading: true, error: null })),
        switchMap((user) =>
          usersService.createUser(user).pipe(
            tap((newUser) => {
              patchState(store, {
                users: [...store.users(), newUser],
                loading: false
              });
            }),
            catchError((error: any) => {
              console.error('Error creando usuario:', error);
              patchState(store, {
                error: error.message || 'Error al crear usuario',
                loading: false
              });
              return of(null);
            })
          )
        )
      )
    ),

    // Actualizar usuario
    updateUser: rxMethod<{ id: string; user: UpdateUserRequest }>(
      pipe(
        tap(() => patchState(store, { loading: true, error: null })),
        switchMap(({ id, user }) =>
          usersService.updateUser(id, user).pipe(
            tap((updatedUser) => {
              patchState(store, {
                users: store.users().map(u => u.id === id ? updatedUser : u),
                loading: false
              });
            }),
            catchError((error: any) => {
              console.error('Error actualizando usuario:', error);
              patchState(store, {
                error: error.message || 'Error al actualizar usuario',
                loading: false
              });
              return of(null);
            })
          )
        )
      )
    ),

    // Eliminar usuario
    deleteUser: rxMethod<string>(
      pipe(
        tap(() => patchState(store, { loading: true, error: null })),
        switchMap((id) =>
          usersService.deleteUser(id).pipe(
            tap(() => {
              patchState(store, {
                users: store.users().filter(u => u.id !== id),
                loading: false
              });
            }),
            catchError((error: any) => {
              console.error('Error eliminando usuario:', error);
              patchState(store, {
                error: error.message || 'Error al eliminar usuario',
                loading: false
              });
              return of(null);
            })
          )
        )
      )
    ),

    // Limpiar error
    clearError: () => patchState(store, { error: null })
  }))
);
