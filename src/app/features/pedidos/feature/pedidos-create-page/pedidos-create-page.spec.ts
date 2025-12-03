import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidosCreatePage } from './pedidos-create-page';

describe('PedidosCreatePage', () => {
  let component: PedidosCreatePage;
  let fixture: ComponentFixture<PedidosCreatePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PedidosCreatePage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PedidosCreatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
