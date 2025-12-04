import { Component, input, output } from '@angular/core';
import { Pastel } from '../../data-access/models/pastel.model';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'app-pastel-card',
  standalone: true,
  imports: [CurrencyPipe, DatePipe, ButtonModule, CardModule, TooltipModule],
  templateUrl: './pastel-card.html',
  styleUrl: './pastel-card.scss',
})
export class PastelCard {
  pastel = input.required<Pastel>();
  
  select = output<string>();
  edit = output<string>();
  delete = output<string>();

  onSelect() {
    this.select.emit(this.pastel().id);
  }

  onEdit() {
    this.edit.emit(this.pastel().id);
  }

  onDelete() {
    this.delete.emit(this.pastel().id);
  }

  getImageUrl(): string {
    return 'https://via.placeholder.com/300x200?text=' + encodeURIComponent(this.pastel().sabor);
  }
}
