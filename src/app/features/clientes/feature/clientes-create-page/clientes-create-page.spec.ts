import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientesCreatePage } from './clientes-create-page';

describe('ClientesCreatePage', () => {
  let component: ClientesCreatePage;
  let fixture: ComponentFixture<ClientesCreatePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientesCreatePage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientesCreatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
