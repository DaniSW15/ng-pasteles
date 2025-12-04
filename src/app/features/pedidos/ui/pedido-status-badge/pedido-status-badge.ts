import { Component, input } from '@angular/core';
import { TagModule } from 'primeng/tag';
import { EstadoPedido, getEstadoLabel, getEstadoSeverity } from '../../data-access/models/pedido.model';

@Component({
  selector: 'app-pedido-status-badge',
  standalone: true,
  imports: [TagModule],
  template: `
    <p-tag 
      [value]="label()" 
      [severity]="severity()"
    />
  `,
  styles: [`
    :host {
      display: inline-block;
    }
  `]
})
export class PedidoStatusBadge {
  estado = input.required<EstadoPedido>();
  
  label = () => getEstadoLabel(this.estado());
  severity = () => getEstadoSeverity(this.estado());
}
