import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidosDetailPage } from './pedidos-detail-page';

describe('PedidosDetailPage', () => {
  let component: PedidosDetailPage;
  let fixture: ComponentFixture<PedidosDetailPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PedidosDetailPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PedidosDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
