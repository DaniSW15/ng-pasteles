import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PastelDetailDialog } from './pastel-detail-dialog';

describe('PastelDetailDialog', () => {
  let component: PastelDetailDialog;
  let fixture: ComponentFixture<PastelDetailDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PastelDetailDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PastelDetailDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
