import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientesDetailPage } from './clientes-detail-page';

describe('ClientesDetailPage', () => {
  let component: ClientesDetailPage;
  let fixture: ComponentFixture<ClientesDetailPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientesDetailPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientesDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
