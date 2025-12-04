import { Component, OnInit, inject, computed } from '@angular/core';
import { PedidosStore } from '../../data-access/store/pedidos.store';
import { PedidoList } from '../../ui/pedido-list/pedido-list';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { AuthService } from '@app/features/auth/data-access/services/auth.service';
import { EstadoPedido } from '../../data-access/models/pedido.model';

@Component({
  selector: 'app-pedidos-list-page',
  standalone: true,
  imports: [PedidoList, ButtonModule],
  templateUrl: './pedidos-list-page.html',
  styleUrl: './pedidos-list-page.scss',
  providers: [DialogService]
})
export class PedidosListPage implements OnInit {
  store = inject(PedidosStore);
  private router = inject(Router);
  private authService = inject(AuthService);

  // Computed signals para permisos
  isCliente = computed(() => this.authService.currentUser()?.rol === 'Cliente');
  isEmpleado = computed(() => this.authService.isEmpleado());
  isAdmin = computed(() => this.authService.isAdmin());

  ngOnInit(): void {
    this.loadPedidos();
  }

  loadPedidos() {
    this.store.loadPedidos({ page: 1, size: 10 });
  }

  onPedidoSelect(id: string) {
    console.log('Ver detalle del pedido:', id);
    this.router.navigate(['/pedidos', id]);
  }

  onPedidoEdit(id: string) {
    console.log('Cambiar estado del pedido:', id);
    
    // Solo Empleado y Admin pueden cambiar estado
    if (!this.isEmpleado()) {
      alert('No tienes permisos para cambiar el estado del pedido');
      return;
    }

    const pedido = this.store.pedidos().find(p => p.id === id);
    if (!pedido) return;

    // Determinar siguiente estado
    let nuevoEstado: EstadoPedido;
    switch (pedido.estado) {
      case EstadoPedido.Pendiente:
        nuevoEstado = EstadoPedido.EnProceso;
        break;
      case EstadoPedido.EnProceso:
        nuevoEstado = EstadoPedido.Completado;
        break;
      default:
        alert('Este pedido no puede cambiar de estado');
        return;
    }

    if (confirm(`¿Cambiar estado del pedido a ${this.getEstadoLabel(nuevoEstado)}?`)) {
      this.store.updateEstado({ id, request: { estado: nuevoEstado } });
    }
  }

  onPedidoDelete(id: string) {
    const pedido = this.store.pedidos().find(p => p.id === id);
    if (!pedido) return;

    // Cliente solo puede cancelar sus propios pedidos si están pendientes
    if (this.isCliente()) {
      if (pedido.estado !== EstadoPedido.Pendiente) {
        alert('Solo puedes cancelar pedidos pendientes');
        return;
      }
      if (confirm('¿Estás seguro de cancelar este pedido?')) {
        this.store.cancelPedido(id);
      }
      return;
    }

    // Empleado puede cancelar cualquier pedido
    if (this.isEmpleado() && !this.isAdmin()) {
      if (confirm('¿Estás seguro de cancelar este pedido?')) {
        this.store.cancelPedido(id);
      }
      return;
    }

    // Admin puede eliminar permanentemente
    if (this.isAdmin()) {
      const action = confirm('¿Cancelar (OK) o Eliminar permanentemente (Cancelar)?');
      if (action) {
        this.store.cancelPedido(id);
      } else {
        if (confirm('¿ELIMINAR PERMANENTEMENTE este pedido? Esta acción no se puede deshacer.')) {
          this.store.deletePedido(id);
        }
      }
    }
  }

  crearPedido() {
    this.router.navigate(['/pedidos/nuevo']);
  }

  private getEstadoLabel(estado: EstadoPedido): string {
    switch (estado) {
      case EstadoPedido.Pendiente: return 'Pendiente';
      case EstadoPedido.EnProceso: return 'En Proceso';
      case EstadoPedido.Completado: return 'Completado';
      case EstadoPedido.Cancelado: return 'Cancelado';
      default: return 'Desconocido';
    }
  }
}
