import { Component, OnInit, inject, signal } from '@angular/core';
import { PastelesStore } from '@app/features/pasteles/data-access/store/pasteles.store';
import { PastelList } from '../../ui/pastel-list/pastel-list';

@Component({
  selector: 'app-pasteles-list-page',
  imports: [PastelList],
  templateUrl: './pasteles-list-page.html',
  styleUrl: './pasteles-list-page.scss',
})
export class PastelesListPage implements OnInit {
  store = inject(PastelesStore);
  pageSize = signal(10);

  ngOnInit(): void {
    this.loadPasteles();
  }

  loadPasteles() {
    this.store.loadPasteles({ page: this.store.currentPage(), size: this.pageSize() });
  }

  onPageChange(event: { page: number; size: number }) {
    this.pageSize.set(event.size);
    this.store.loadPasteles({ page: event.page, size: event.size });
  }

  onPastelSelect(id: string) {
    console.log('Pastel seleccionado:', id);
    // Aquí puedes navegar al detalle o abrir un modal
  }

  onPastelDelete(id: string) {
    console.log('Eliminando pastel:', id);
    this.store.deletePastel(id);
  }
}
