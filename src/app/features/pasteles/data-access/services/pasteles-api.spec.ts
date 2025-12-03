import { TestBed } from '@angular/core/testing';

import { PastelesApi } from './pasteles-api';

describe('PastelesApi', () => {
  let service: PastelesApi;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PastelesApi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
