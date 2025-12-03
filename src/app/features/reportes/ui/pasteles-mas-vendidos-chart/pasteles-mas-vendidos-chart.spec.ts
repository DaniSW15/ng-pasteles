import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PastelesMasVendidosChart } from './pasteles-mas-vendidos-chart';

describe('PastelesMasVendidosChart', () => {
  let component: PastelesMasVendidosChart;
  let fixture: ComponentFixture<PastelesMasVendidosChart>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PastelesMasVendidosChart]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PastelesMasVendidosChart);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
