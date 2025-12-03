import { Component, OnInit, inject, signal } from '@angular/core';
import { PastelesStore } from '@app/features/pasteles/data-access/store/pasteles.store';
import { PastelList } from '../../ui/pastel-list/pastel-list';
import { DialogService } from 'primeng/dynamicdialog';
import { PastelQuickView } from '../../ui/pastel-quick-view/pastel-quick-view';
import { PastelForm } from '../../ui/pastel-form/pastel-form';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { CreatePastelModel } from '../../data-access/models/create-pastel.model';
import { Pastel } from '../../data-access/models/pastel.model';

@Component({
  selector: 'app-pasteles-list-page',
  imports: [PastelList, ButtonModule, TooltipModule],
  templateUrl: './pasteles-list-page.html',
  styleUrl: './pasteles-list-page.scss',
  providers: [DialogService]
})
export class PastelesListPage implements OnInit {
  store = inject(PastelesStore);
  private dialogService = inject(DialogService);
  pageSize = signal(10);
  viewMode = signal<'table' | 'grid'>('table');

  ngOnInit(): void {
    this.loadPasteles();
  }

  toggleView() {
    this.viewMode.set(this.viewMode() === 'table' ? 'grid' : 'table');
  }

  loadPasteles() {
    this.store.loadPasteles({ page: this.store.currentPage(), size: this.pageSize() });
  }

  onPageChange(event: { page: number; size: number }) {
    this.pageSize.set(event.size);
    this.store.loadPasteles({ page: event.page, size: event.size });
  }

  onPastelSelect(id: string) {
    console.log('Pastel seleccionado (vista rápida):', id);

    // Buscar el pastel en el store
    const pastel = this.store.pasteles().find(p => p.id === id);

    if (pastel) {
      // Abrir modal de vista rápida
      this.dialogService.open(PastelQuickView, {
        header: 'Vista rápida del Pastel',
        width: '500px',
        data: { pastel }
      });
    }
  }

  onPastelEdit(id: string) {
    console.log('Editar pastel:', id);

    // Buscar el pastel en el store
    const pastel = this.store.pasteles().find(p => p.id === id);

    if (pastel) {
      // Abrir modal de edición
      const ref = this.dialogService.open(PastelForm, {
        header: 'Editar Pastel',
        width: '600px',
        data: { pastel }
      });

      ref?.onClose.subscribe((result: Pastel) => {
        if (result) this.store.updatePastel(result.id, result);
      });
    }
  }

  onPastelDelete(id: string) {
    console.log('Eliminando pastel:', id);
    this.store.deletePastel(id);
  }

  // Crear nuevo pastel
  crearPastel() {
    const ref = this.dialogService.open(PastelForm, {
      header: 'Crear Nuevo Pastel',
      width: '600px'
    });

    ref?.onClose.subscribe((result: CreatePastelModel) => {
      if (result) {
        this.store.createPastel(result);
      }
    });
  }
}
