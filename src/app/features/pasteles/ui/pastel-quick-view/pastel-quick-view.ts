import { Component, inject } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Pastel } from '../../data-access/models/pastel.model';
import { CurrencyPipe } from '@angular/common';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-pastel-quick-view',
  imports: [CurrencyPipe, ButtonModule],
  templateUrl: './pastel-quick-view.html',
  styleUrl: './pastel-quick-view.scss',
})
export class PastelQuickView {
  config = inject(DynamicDialogConfig);
  ref = inject(DynamicDialogRef);

  pastel: Pastel = this.config.data.pastel;

  close() {
    this.ref.close();
  }
}
