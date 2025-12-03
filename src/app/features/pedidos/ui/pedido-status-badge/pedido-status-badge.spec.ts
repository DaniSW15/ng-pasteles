import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidoStatusBadge } from './pedido-status-badge';

describe('PedidoStatusBadge', () => {
  let component: PedidoStatusBadge;
  let fixture: ComponentFixture<PedidoStatusBadge>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PedidoStatusBadge]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PedidoStatusBadge);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
