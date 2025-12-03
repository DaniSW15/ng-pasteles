import { Component, input } from '@angular/core';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
  selector: 'app-loading-spinner',
  imports: [ProgressSpinnerModule],
  templateUrl: './loading-spinner.html',
  styleUrl: './loading-spinner.scss',
})
export class LoadingSpinner {
  message = input<string>('Cargando...');
  size = input<string>('50px');
  strokeWidth = input<string>('4');
  overlay = input<boolean>(false);
}
