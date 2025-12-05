import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Pedido } from '../../data-access/models/pedido.model';
import { PedidoCard } from '../pedido-card/pedido-card';

@Component({
  selector: 'app-pedido-list',
  standalone: true,
  imports: [CommonModule, PedidoCard],
  templateUrl: './pedido-list.html',
  styleUrl: './pedido-list.scss'
})
export class PedidoList {
  @Input() pedidos: Pedido[] = [];
  @Input() loading = false;
  @Input() canEdit = false;
  @Input() canDelete = false;
  
  @Output() pedidoSelect = new EventEmitter<string>();
  @Output() pedidoEdit = new EventEmitter<string>();
  @Output() pedidoDelete = new EventEmitter<string>();

  onView(id: string) {
    this.pedidoSelect.emit(id);
  }

  onEdit(id: string) {
    this.pedidoEdit.emit(id);
  }

  onDelete(id: string) {
    this.pedidoDelete.emit(id);
  }
}
