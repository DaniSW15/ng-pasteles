import { Component, input, output, DestroyRef, inject, signal } from '@angular/core';
import { DrawerModule } from 'primeng/drawer';
import { MenuModule } from 'primeng/menu';
import { MenuItem } from 'primeng/api';
import { Router, NavigationEnd } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filter } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  imports: [DrawerModule, MenuModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar {
  visible = input.required<boolean>();
  menuItems = input.required<MenuItem[]>();
  closeSidebar = output<void>();

  private router = inject(Router);
  private destroyRef = inject(DestroyRef);

  // Detectar si es móvil para mostrar/ocultar botón X
  isMobileView = signal(this.isMobile());

  constructor() {
    // Cerrar sidebar en móvil cuando se navega
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(() => {
        if (this.isMobile()) {
          this.onClose();
        }
      });

    // Actualizar isMobileView cuando cambia el tamaño de ventana
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', () => {
        this.isMobileView.set(this.isMobile());
      });
    }
  }

  onClose() {
    this.closeSidebar.emit();
  }

  isMobile(): boolean {
    return typeof window !== 'undefined' && window.innerWidth <= 1024;
  }
}
