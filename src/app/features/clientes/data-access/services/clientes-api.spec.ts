import { TestBed } from '@angular/core/testing';

import { ClientesApi } from './clientes-api';

describe('ClientesApi', () => {
  let service: ClientesApi;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientesApi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
