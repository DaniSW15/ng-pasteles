import { Component, OnInit, inject, signal } from '@angular/core';
import { ClienteList } from "../../ui/cliente-list/cliente-list";
import { ClientesStore } from '../../data-access/store/clientes.store';

@Component({
  selector: 'app-clientes-list-page',
  imports: [ClienteList],
  templateUrl: './clientes-list-page.html',
  styleUrl: './clientes-list-page.scss',
})
export class ClientesListPage implements OnInit {
  store = inject(ClientesStore);
  pageSize = signal(10);

  ngOnInit(): void {
    this.loadClientes();
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
  }

  onClienteDelete(id: string) {
    console.log('Eliminado cliente:', id);
  }
}
