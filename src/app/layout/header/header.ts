import { Component, output, inject, computed } from '@angular/core';
import { Router } from '@angular/router';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { MenuModule } from 'primeng/menu';
import { MenuItem } from 'primeng/api';
import { AuthService } from '@app/features/auth/data-access/services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ToolbarModule, ButtonModule, AvatarModule, MenuModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  private authService = inject(AuthService);

  toggleSidebarEvent = output<void>();

  // Usuario actual
  currentUser = this.authService.currentUser;

  // Iniciales del usuario para el avatar
  userInitials = computed(() => {
    const user = this.currentUser();
    if (!user) return 'U';

    const names = user.nombre.split(' ');
    if (names.length >= 2) {
      return names[0][0] + names[1][0];
    }
    return user.nombre.substring(0, 2);
  });

  // Menú del usuario
  userMenuItems: MenuItem[] = [
    {
      label: 'Mi Perfil',
      icon: 'pi pi-user',
      command: () => this.goToProfile()
    },
    {
      label: 'Configuración',
      icon: 'pi pi-cog',
      command: () => this.goToSettings()
    },
    {
      separator: true
    },
    {
      label: 'Cerrar Sesión',
      icon: 'pi pi-sign-out',
      command: () => this.logout()
    }
  ];

  toggleSidebar() {
    this.toggleSidebarEvent.emit();
  }

  toggleUserMenu(event: Event, menu: any) {
    menu.toggle(event);
  }

  goToProfile() {
    console.log('🔵 Ir a perfil');
    inject(Router).navigate(['/perfil']);
  }

  goToSettings() {
    console.log('🔵 Ir a configuración');
    // TODO: Implementar navegación a configuración
  }

  logout() {
    console.log('🔵 Cerrando sesión...');
    this.authService.logout();
  }

  // Color del avatar basado en el rol
  getAvatarColor(): string {
    const user = this.currentUser();
    if (!user) return '#9c27b0';

    switch (user.rol) {
      case 'Admin': return '#f44336'; // Rojo para admin
      case 'Empleado': return '#2196f3'; // Azul para empleado
      case 'Cliente': return '#4caf50'; // Verde para cliente
      default: return '#9c27b0'; // Morado por defecto
    }
  }
}
