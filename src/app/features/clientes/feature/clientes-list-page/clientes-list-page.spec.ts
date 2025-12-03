import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientesListPage } from './clientes-list-page';

describe('ClientesListPage', () => {
  let component: ClientesListPage;
  let fixture: ComponentFixture<ClientesListPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientesListPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientesListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
