import { inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { environment } from '@env/environment';
import { PagedListModel } from '@app/core/models/paged-list-model/paged-list.model';
import { Pastel } from '../models/pastel.model';

/**
 * Factory function para crear un httpResource de pasteles
 * Uso en componente:
 * 
 * page = signal(1);
 * size = signal(10);
 * resource = createPastelesResource(this.page, this.size);
 */
export function createPastelesResource(
  page: Signal<number>,
  size: Signal<number>
) {
  const baseUrl = environment.apiUrl;

  return httpResource<PagedListModel<Pastel>>(() => {
    return `${baseUrl}/Pasteles?pageNumber=${page()}&pageSize=${size()}`;
  });
}
