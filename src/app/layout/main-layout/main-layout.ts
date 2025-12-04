import { Component, signal, computed, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { MenuItem } from 'primeng/api';
import { Header } from '../header/header';
import { Sidebar } from '../sidebar/sidebar';
import { AuthService } from '@app/features/auth/data-access/services/auth.service';

@Component({
  selector: 'app-main-layout',
  imports: [RouterOutlet, BreadcrumbModule, Header, Sidebar],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.scss',
})
export class MainLayout {
  private authService = inject(AuthService);
  
  // En desktop: sidebar visible por defecto
  // En móvil/tablet: sidebar oculto por defecto
  sidebarVisible = signal(this.isDesktop());

  // Menú dinámico basado en el rol del usuario
  menuItems = computed(() => {
    const user = this.authService.currentUser();
    if (!user) return [];

    const items: MenuItem[] = [
      // Pasteles - Todos los usuarios
      {
        label: 'Pasteles',
        icon: 'pi pi-fw pi-shopping-cart',
        routerLink: ['/pasteles']
      },
      // Pedidos - Todos los usuarios
      {
        label: 'Pedidos',
        icon: 'pi pi-fw pi-list',
        routerLink: ['/pedidos']
      }
    ];

    // Clientes - Solo Empleado y Admin
    if (user.rol === 'Admin' || user.rol === 'Empleado') {
      items.push({
        label: 'Clientes',
        icon: 'pi pi-fw pi-users',
        routerLink: ['/clientes']
      });
    }

    // Reportes - Solo Admin
    if (user.rol === 'Admin') {
      items.push({
        label: 'Reportes',
        icon: 'pi pi-fw pi-chart-bar',
        routerLink: ['/reportes']
      });
      
      // Gestión de Usuarios - Solo Admin
      items.push({
        label: 'Usuarios',
        icon: 'pi pi-fw pi-users-cog',
        routerLink: ['/admin/usuarios']
      });
    }

    return items;
  });

  breadcrumbItems: MenuItem[] = [
    { label: 'Inicio', routerLink: ['/'] }
  ];

  toggleSidebar() {
    this.sidebarVisible.update(v => !v);
  }

  private isDesktop(): boolean {
    return typeof window !== 'undefined' && window.innerWidth > 1024;
  }
}
