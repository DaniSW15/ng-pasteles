import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportesDashboardPage } from './reportes-dashboard-page';

describe('ReportesDashboardPage', () => {
  let component: ReportesDashboardPage;
  let fixture: ComponentFixture<ReportesDashboardPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportesDashboardPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportesDashboardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
