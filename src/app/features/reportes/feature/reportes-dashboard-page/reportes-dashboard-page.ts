import { Component, inject } from '@angular/core';
import { ResumenGeneralCard } from "../../ui/resumen-general-card/resumen-general-card";
import { VentasDelDiaCard } from "../../ui/ventas-del-dia-card/ventas-del-dia-card";
import { PastelesMasVendidosChart } from "../../ui/pasteles-mas-vendidos-chart/pasteles-mas-vendidos-chart";
import { ClientesTopTable } from "../../ui/clientes-top-table/clientes-top-table";
import { ReportesStore } from '../../data-access/store/reportes.store';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reportes-dashboard-page',
  imports: [CommonModule, ResumenGeneralCard, VentasDelDiaCard, PastelesMasVendidosChart, ClientesTopTable],
  templateUrl: './reportes-dashboard-page.html',
  styleUrl: './reportes-dashboard-page.scss',
})
export class ReportesDashboardPage {
  store = inject(ReportesStore);

  ngOnInit() {
    this.store.loadAllReportes();
  }
}
