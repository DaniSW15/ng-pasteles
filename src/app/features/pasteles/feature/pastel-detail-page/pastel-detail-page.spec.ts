import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PastelDetailPage } from './pastel-detail-page';

describe('PastelDetailPage', () => {
  let component: PastelDetailPage;
  let fixture: ComponentFixture<PastelDetailPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PastelDetailPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PastelDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
