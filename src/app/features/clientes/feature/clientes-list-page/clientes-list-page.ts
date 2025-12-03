import { Component, OnInit, inject, signal } from '@angular/core';
import { ClienteList } from "../../ui/cliente-list/cliente-list";
import { ClientesStore } from '../../data-access/store/clientes.store';
import { ButtonModule } from "primeng/button";
import { DialogService } from 'primeng/dynamicdialog';
import { ClienteForm } from '../../ui/cliente-form/cliente-form';
import { CreateClienteModel } from '../../data-access/models/create-cliente.model';
import { ClienteQuickView } from '../../ui/cliente-quick-view/cliente-quick-view';
import { ICliente } from '../../data-access/models/cliente.model';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'app-clientes-list-page',
  imports: [ClienteList, ButtonModule, TooltipModule],
  templateUrl: './clientes-list-page.html',
  styleUrl: './clientes-list-page.scss',
  providers: [DialogService]
})
export class ClientesListPage implements OnInit {
  store = inject(ClientesStore);
  private dialogService = inject(DialogService);
  pageSize = signal(10);
  viewMode = signal<'table' | 'grid'>('table');

  ngOnInit(): void {
    this.loadClientes();
  }

  toggleView() {
    this.viewMode.set(this.viewMode() === 'table' ? 'grid' : 'table');
  }

  loadClientes() {
    this.store.loadClientes({ page: this.store.currentPage(), size: this.pageSize() });
  }

  onPageChange(event: { page: number; size: number }) {
    this.pageSize.set(event.size);
    this.store.loadClientes({ page: event.page, size: event.size });
  }

  onClienteSelect(id: string) {
    console.log('Cliente seleccionado:', id);

    const cliente = this.store.clientes().find(p => p.id === id);

    if (cliente) {
      this.dialogService.open(ClienteQuickView, {
        header: 'Vista rápida del cliente',
        width: '500px',
        data: { cliente }
      })
    }
  }

  onClienteEdit(id: string) {
    console.log('Editar cliente:', id);

    const cliente = this.store.clientes().find(p => p.id === id);

    if (cliente) {
      const ref = this.dialogService.open(ClienteForm, {
        header: 'Editar cliente',
        width: '600px',
        data: { cliente }
      });

      ref?.onClose.subscribe((result: ICliente) => {
        if (result) this.store.updateCliente(result.id, result);
      });
    }
  }

  onClienteDelete(id: string) {
    console.log('Eliminado cliente:', id);
    this.store.deleteCliente(id);
  }

  crearCliente() {
    const ref = this.dialogService.open(ClienteForm, {
      header: 'Crear nuevo cliente',
      width: '600px'
    })

    ref?.onClose.subscribe((result: CreateClienteModel) => {
      if (result) this.store.createCliente(result);
    })
  }
}
