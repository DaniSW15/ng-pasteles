import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ChartModule } from 'primeng/chart';

export interface PastelVendido {
  nombre: string;
  cantidad: number;
}

@Component({
  selector: 'app-pasteles-mas-vendidos-chart',
  imports: [CommonModule, CardModule, ChartModule],
  templateUrl: './pasteles-mas-vendidos-chart.html',
  styleUrl: './pasteles-mas-vendidos-chart.scss',
})
export class PastelesMasVendidosChart {
  data = input<PastelVendido[]>([]);

  chartData: any;
  chartOptions: any;

  ngOnInit() {
    this.updateChart();
  }

  ngOnChanges() {
    this.updateChart();
  }

  updateChart() {
    this.chartData = {
      labels: this.data().map(p => p.nombre),
      datasets: [
        {
          label: 'Cantidad Vendida',
          data: this.data().map(p => p.cantidad),
          backgroundColor: [
            '#FF6B9D',
            '#FFD93D',
            '#A8E6CF',
            '#C7CEEA',
            '#FFDAC1'
          ],
          borderColor: '#fff',
          borderWidth: 2
        }
      ]
    };

    this.chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            stepSize: 1
          }
        }
      }
    };
  }
}
