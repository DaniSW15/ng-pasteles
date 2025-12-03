import { Component, input, output, inject } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DatePipe, CurrencyPipe } from '@angular/common';

export interface TableColumn {
  field: string;
  header: string;
  sortable?: boolean;
}

@Component({
  selector: 'app-data-table',
  imports: [TableModule, ButtonModule, DatePipe, CurrencyPipe],
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
  rowEdit = output<T>();
  rowDelete = output<T>();

  private confirmationService = inject(ConfirmationService);
  private messageService = inject(MessageService);

  // Detectar si un campo es de tipo fecha
  isFechaField(fieldName: string): boolean {
    return fieldName.toLowerCase().includes('fecha') ||
      fieldName.toLowerCase().includes('date') ||
      fieldName.toLowerCase().includes('creado') ||
      fieldName.toLowerCase().includes('actualizado');
  }

  // Detectar si un campo es de tipo precio/moneda
  isPrecioField(fieldName: string): boolean {
    return fieldName.toLowerCase().includes('precio') ||
      fieldName.toLowerCase().includes('price') ||
      fieldName.toLowerCase().includes('costo') ||
      fieldName.toLowerCase().includes('total');
  }

  // Detectar si un campo es booleano
  isBooleanField(fieldName: string): boolean {
    return fieldName.toLowerCase().includes('disponible') ||
      fieldName.toLowerCase().includes('activo') ||
      fieldName.toLowerCase().includes('habilitado') ||
      fieldName.toLowerCase().includes('enabled') ||
      fieldName.toLowerCase().includes('active');
  }

  // Vista rápida (sin confirmación)
  onRowView(row: T) {
    this.rowSelect.emit(row);
  }

  // Editar (sin confirmación, abre modal directamente)
  onRowEdit(row: T) {
    this.rowEdit.emit(row);
  }

  confirmDelete(event: Event, row: T) {
    // console.log('🗑️ Botón eliminar clickeado', row);
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
