import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VentasDelDiaCard } from './ventas-del-dia-card';

describe('VentasDelDiaCard', () => {
  let component: VentasDelDiaCard;
  let fixture: ComponentFixture<VentasDelDiaCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VentasDelDiaCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VentasDelDiaCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
