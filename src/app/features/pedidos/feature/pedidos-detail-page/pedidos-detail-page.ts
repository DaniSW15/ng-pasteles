import { Component, OnInit, inject, computed } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { PedidosStore } from '../../data-access/store/pedidos.store';
import { AuthService } from '@app/features/auth/data-access/services/auth.service';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { PedidoStatusBadge } from '../../ui/pedido-status-badge/pedido-status-badge';
import { EstadoPedido } from '../../data-access/models/pedido.model';

@Component({
  selector: 'app-pedidos-detail-page',
  standalone: true,
  imports: [
    CommonModule,
    CardModule,
    ButtonModule,
    TableModule,
    CurrencyPipe,
    DatePipe,
    PedidoStatusBadge
  ],
  templateUrl: './pedidos-detail-page.html',
  styleUrl: './pedidos-detail-page.scss'
})
export class PedidosDetailPage implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  store = inject(PedidosStore);
  private authService = inject(AuthService);

  pedidoId = '';
  pedido = computed(() => this.store.selectedPedido());
  
  isCliente = computed(() => this.authService.currentUser()?.rol === 'Cliente');
  isEmpleado = computed(() => this.authService.isEmpleado());
  isAdmin = computed(() => this.authService.isAdmin());

  ngOnInit(): void {
    this.store.clearSelectedPedido();
    this.pedidoId = this.route.snapshot.paramMap.get('id') || '';
    
    if (this.pedidoId) {
      this.store.loadPedidoById(this.pedidoId);
    }
  }

  volver() {
    this.router.navigate(['/pedidos']);
  }

  // Computed para verificar si se puede cambiar el estado
  canChangeStatus = computed(() => {
    const pedido = this.pedido();
    if (!pedido || !this.isEmpleado()) return false;
    return pedido.estado === EstadoPedido.Pendiente || pedido.estado === EstadoPedido.EnProceso;
  });

  // Computed para verificar si se puede cancelar
  canCancel = computed(() => {
    const pedido = this.pedido();
    if (!pedido) return false;
    return pedido.estado === EstadoPedido.Pendiente;
  });

  cambiarEstado() {
    const pedido = this.pedido();
    if (!pedido) return;

    const nuevoEstado = pedido.estado === EstadoPedido.Pendiente 
      ? EstadoPedido.EnProceso 
      : EstadoPedido.Completado;

    const label = nuevoEstado === EstadoPedido.EnProceso ? 'En Proceso' : 'Completado';
    
    if (confirm(`¿Cambiar estado del pedido a ${label}?`)) {
      this.store.updateEstado({ id: this.pedidoId, request: { estado: nuevoEstado } });
    }
  }

  cancelarPedido() {
    if (confirm('¿Estás seguro de cancelar este pedido?')) {
      this.store.cancelPedido(this.pedidoId);
      setTimeout(() => this.volver(), 1000);
    }
  }

  eliminarPedido() {
    if (confirm('¿ELIMINAR PERMANENTEMENTE este pedido? Esta acción no se puede deshacer.')) {
      this.store.deletePedido(this.pedidoId);
      setTimeout(() => this.volver(), 1000);
    }
  }
}
