import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientesTopTable } from './clientes-top-table';

describe('ClientesTopTable', () => {
  let component: ClientesTopTable;
  let fixture: ComponentFixture<ClientesTopTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientesTopTable]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientesTopTable);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
