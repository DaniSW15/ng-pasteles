import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PastelQuickView } from './pastel-quick-view';

describe('PastelQuickView', () => {
  let component: PastelQuickView;
  let fixture: ComponentFixture<PastelQuickView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PastelQuickView]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PastelQuickView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
