import { Component, input, output, inject } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmationDialog } from "../confirmation-dialog/confirmation-dialog";

export interface TableColumn {
  field: string;
  header: string;
  sortable?: boolean;
}

@Component({
  selector: 'app-data-table',
  imports: [TableModule, ButtonModule],
  templateUrl: './data-table.html',
  styleUrl: './data-table.scss',
})
export class DataTable<T extends Record<string, any>> {
  data = input.required<T[]>();
  columns = input.required<TableColumn[]>();
  loading = input<boolean>(false);
  deleteMessage = input<string>('¿Estás seguro de eliminar este elemento?');
  deleteHeader = input<string>('Confirmar eliminación');

  rowSelect = output<T>();
  rowDelete = output<T>();

  private confirmationService = inject(ConfirmationService);
  private messageService = inject(MessageService);

  confirmEdit(event: Event, row: T) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: '¿Estás seguro de guardar los cambios?',
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      acceptIcon: 'pi pi-check',
      rejectIcon: 'pi pi-times',
      acceptLabel: 'Guardar',
      rejectLabel: 'Cancelar',
      accept: () => {
        this.rowSelect.emit(row);
        this.messageService.add({
          severity: 'success',
          summary: 'Confirmado',
          detail: 'Cambios guardados correctamente',
        });
      },
      reject: () => {
        this.messageService.add({
          severity: 'info',
          summary: 'Cancelado',
          detail: 'Operación cancelada',
        });
      },
    });
  }

  confirmDelete(event: Event, row: T) {
    console.log('🗑️ Botón eliminar clickeado', row);
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: '¿Estás seguro de eliminar este elemento?',
      header: 'Confirmar eliminación',
      icon: 'pi pi-exclamation-triangle',
      acceptIcon: 'pi pi-trash',
      rejectIcon: 'pi pi-times',
      acceptLabel: 'Eliminar',
      rejectLabel: 'Cancelar',
      acceptButtonStyleClass: 'p-button-danger',
      accept: () => {
        this.rowDelete.emit(row);
        this.messageService.add({
          severity: 'success',
          summary: 'Eliminado',
          detail: 'Elemento eliminado correctamente',
        });
      },
      reject: () => {
        this.messageService.add({
          severity: 'warn',
          summary: 'Cancelado',
          detail: 'Eliminación cancelada',
        });
      },
    });
  }
}
