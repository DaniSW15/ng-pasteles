import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { MenuItem } from 'primeng/api';
import { Header } from '../header/header';
import { Sidebar } from '../sidebar/sidebar';

@Component({
  selector: 'app-main-layout',
  imports: [RouterOutlet, BreadcrumbModule, Header, Sidebar],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.scss',
})
export class MainLayout {
  sidebarVisible = signal(true);

  menuItems: MenuItem[] = [
    {
      label: 'Pasteles',
      icon: 'pi pi-fw pi-shopping-cart',
      routerLink: ['/pasteles']
    },
    {
      label: 'Clientes',
      icon: 'pi pi-fw pi-users',
      routerLink: ['/clientes']
    },
    {
      label: 'Pedidos',
      icon: 'pi pi-fw pi-list',
      routerLink: ['/pedidos']
    },
    {
      label: 'Reportes',
      icon: 'pi pi-fw pi-chart-bar',
      routerLink: ['/reportes']
    }
  ];

  breadcrumbItems: MenuItem[] = [
    { label: 'Inicio', routerLink: ['/'] }
  ];

  toggleSidebar() {
    this.sidebarVisible.update(v => !v);
  }
}
