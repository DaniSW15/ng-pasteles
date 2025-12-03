import { Component, input } from '@angular/core';
import { StatsCard } from '../stats-card/stats-card';
import { CommonModule } from '@angular/common';


export interface ResumenGeneral {
  totalPedidos: number;
  totalVentas: number;
  pedidosPendientes: number;
  clientesActivos: number;
}

@Component({
  selector: 'app-resumen-general-card',
  imports: [CommonModule, StatsCard],
  templateUrl: './resumen-general-card.html',
  styleUrl: './resumen-general-card.scss',
})
export class ResumenGeneralCard {
  data = input<ResumenGeneral | null>();
}
