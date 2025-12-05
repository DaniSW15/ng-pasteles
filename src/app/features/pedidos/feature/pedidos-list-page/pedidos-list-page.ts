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
    this.router.navigate(['/pedidos', id]);
  }

  onPedidoEdit(id: string) {
    const pedido = this.store.pedidos().find(p => p.id === id);
    if (!pedido) return;

    const nuevoEstado = pedido.estado === EstadoPedido.Pendiente 
      ? EstadoPedido.EnProceso 
      : EstadoPedido.Completado;

    const label = nuevoEstado === EstadoPedido.EnProceso ? 'En Proceso' : 'Completado';
    
    if (confirm(`¿Cambiar estado del pedido a ${label}?`)) {
      this.store.updateEstado({ id, request: { estado: nuevoEstado } });
    }
  }

  onPedidoDelete(id: string) {
    const pedido = this.store.pedidos().find(p => p.id === id);
    if (!pedido) return;

    if (this.isAdmin()) {
      // Admin puede cancelar o eliminar
      if (confirm('¿Cancelar este pedido? (Cancelar para eliminar permanentemente)')) {
        this.store.cancelPedido(id);
      } else {
        if (confirm('¿ELIMINAR PERMANENTEMENTE? Esta acción no se puede deshacer.')) {
          this.store.deletePedido(id);
        }
      }
    } else {
      // Cliente y Empleado solo pueden cancelar
      if (confirm('¿Estás seguro de cancelar este pedido?')) {
        this.store.cancelPedido(id);
      }
    }
  }

  crearPedido() {
    this.router.navigate(['/pedidos/nuevo']);
  }
}
