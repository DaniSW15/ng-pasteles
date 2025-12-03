import { Component, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ICliente } from '../../data-access/models/cliente.model';

@Component({
  selector: 'app-cliente-quick-view',
  imports: [ButtonModule],
  templateUrl: './cliente-quick-view.html',
  styleUrl: './cliente-quick-view.scss',
})
export class ClienteQuickView {
  config = inject(DynamicDialogConfig);
  ref = inject(DynamicDialogRef);

  clientes: ICliente = this.config.data.cliente;

  close() {
    this.ref.close();
  }
}
