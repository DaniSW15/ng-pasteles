import { Component, input, output } from '@angular/core';
import { ICliente } from '../../data-access/models/cliente.model';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-cliente-card',
  standalone: true,
  imports: [CardModule, ButtonModule, TooltipModule, DatePipe],
  templateUrl: './cliente-card.html',
  styleUrl: './cliente-card.scss',
})
export class ClienteCard {
  cliente = input.required<ICliente>();

  select = output<string>();
  edit = output<string>();
  delete = output<string>();

  onSelect() {
    this.select.emit(this.cliente().id);
  }

  onEdit() {
    this.edit.emit(this.cliente().id);
  }

  onDelete() {
    this.delete.emit(this.cliente().id);
  }
}
