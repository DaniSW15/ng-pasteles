import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'fechaFormato',
  standalone: true
})
export class FechaFormatoPipe implements PipeTransform {
  private datePipe = new DatePipe('es-ES');

  transform(value: string | Date | null | undefined, formato: 'corto' | 'medio' | 'largo' | 'completo' = 'corto'): string {
    if (!value) return '-';

    const formatos = {
      corto: 'dd/MM/yyyy',           // 19/11/2025
      medio: 'dd/MM/yyyy HH:mm',     // 19/11/2025 05:37
      largo: 'dd/MM/yyyy HH:mm:ss',  // 19/11/2025 05:37:59
      completo: 'EEEE, dd MMMM yyyy HH:mm' // miércoles, 19 noviembre 2025 05:37
    };

    return this.datePipe.transform(value, formatos[formato]) || '-';
  }
}
