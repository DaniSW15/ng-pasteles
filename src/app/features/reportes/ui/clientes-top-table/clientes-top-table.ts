import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';

export interface ClienteTop {
  nombre: string;
  totalPedidos: number;
  totalGastado: number;
}

@Component({
  selector: 'app-clientes-top-table',
  imports: [CommonModule, CardModule, TableModule, TagModule],
  templateUrl: './clientes-top-table.html',
  styleUrl: './clientes-top-table.scss',
})
export class ClientesTopTable {
  clientes = input<ClienteTop[]>([]);
}
