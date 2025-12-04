import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { ApiService } from '@app/core/services/api/api-service';
import { User } from '@app/features/auth/data-access/models/auth.model';

export interface CreateUserRequest {
  nombre: string;
  email: string;
  password: string;
  rol: 'Admin' | 'Empleado' | 'Cliente';
}

export interface UpdateUserRequest {
  nombre?: string;
  email?: string;
  rol?: 'Admin' | 'Empleado' | 'Cliente';
}

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private api = inject(ApiService);

  /**
   * Obtener todos los usuarios con paginación
   * GET /api/Auth/users?pageNumber=1&pageSize=10
   */
  getUsers(pageNumber: number = 1, pageSize: number = 10): Observable<User[]> {
    const params = new HttpParams()
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString());
    
    return this.api.get<User[]>('Auth/users', params);
  }

  /**
   * Obtener un usuario por ID
   * GET /api/Auth/users/{id}
   */
  getUserById(id: string): Observable<User> {
    return this.api.get<User>(`Auth/users/${id}`);
  }

  /**
   * Crear un nuevo usuario (solo Admin)
   * POST /api/Auth/create-user
   */
  createUser(user: CreateUserRequest): Observable<User> {
    console.log('🔷 [USERS SERVICE] Creando usuario:', user);
    return this.api.post<User>('Auth/create-user', user);
  }

  /**
   * Actualizar un usuario
   * PUT /api/Auth/users/{id}
   */
  updateUser(id: string, user: UpdateUserRequest): Observable<User> {
    return this.api.put<User>(`Auth/users/${id}`, user);
  }

  /**
   * Eliminar un usuario
   * DELETE /api/Auth/users/{id}
   */
  deleteUser(id: string): Observable<void> {
    return this.api.delete<void>(`Auth/users/${id}`);
  }
}
