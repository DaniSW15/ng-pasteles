import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidosListPage } from './pedidos-list-page';

describe('PedidosListPage', () => {
  let component: PedidosListPage;
  let fixture: ComponentFixture<PedidosListPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PedidosListPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PedidosListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
