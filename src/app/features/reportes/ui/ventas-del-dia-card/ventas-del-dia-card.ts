import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';

export interface VentaDelDia {
  pedidoId: string;
  cliente: string;
  total: number;
  hora: Date;
}

@Component({
  selector: 'app-ventas-del-dia-card',
  imports: [CommonModule, CardModule, TableModule],
  templateUrl: './ventas-del-dia-card.html',
  styleUrl: './ventas-del-dia-card.scss',
})
export class VentasDelDiaCard {
  ventas = input<VentaDelDia[]>([]);
}
