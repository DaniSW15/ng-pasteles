import { Component, input } from '@angular/core';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-stats-card',
  imports: [CardModule],
  templateUrl: './stats-card.html',
  styleUrl: './stats-card.scss',
})
export class StatsCard {
  icon = input<string>('pi pi-chart-line');
  value = input<string | number>('0');
  label = input<string>('');
  colorClass = input<string>('');
}
