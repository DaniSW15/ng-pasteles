import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule, DecimalPipe, DatePipe } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { Pedido } from '../../data-access/models/pedido.model';
import { PedidoStatusBadge } from '../pedido-status-badge/pedido-status-badge';

@Component({
  selector: 'app-pedido-card',
  standalone: true,
  imports: [CommonModule, CardModule, ButtonModule, DecimalPipe, DatePipe, PedidoStatusBadge],
  templateUrl: './pedido-card.html',
  styleUrl: './pedido-card.scss'
})
export class PedidoCard {
  @Input() pedido!: Pedido;
  @Input() showActions = true;
  @Input() canEdit = false;
  @Input() canDelete = false;
  
  @Output() view = new EventEmitter<string>();
  @Output() edit = new EventEmitter<string>();
  @Output() delete = new EventEmitter<string>();

  onView() {
    this.view.emit(this.pedido.id);
  }

  onEdit() {
    this.edit.emit(this.pedido.id);
  }

  onDelete() {
    this.delete.emit(this.pedido.id);
  }
}
