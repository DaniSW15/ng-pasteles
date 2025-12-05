import { Component, Input } from '@angular/core';
import { TagModule } from 'primeng/tag';
import { EstadoPedido, getEstadoLabel, getEstadoSeverity } from '../../data-access/models/pedido.model';

@Component({
  selector: 'app-pedido-status-badge',
  standalone: true,
  imports: [TagModule],
  template: `
    <p-tag 
      [value]="getLabel()" 
      [severity]="getSeverity()"
      [rounded]="true">
    </p-tag>
  `
})
export class PedidoStatusBadge {
  @Input() estado!: EstadoPedido;

  getLabel(): string {
    return getEstadoLabel(this.estado);
  }

  getSeverity(): 'success' | 'info' | 'warn' | 'danger' {
    return getEstadoSeverity(this.estado);
  }
}
