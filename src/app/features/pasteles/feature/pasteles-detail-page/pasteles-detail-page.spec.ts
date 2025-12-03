import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PastelesDetailPage } from './pasteles-detail-page';

describe('PastelesDetailPage', () => {
  let component: PastelesDetailPage;
  let fixture: ComponentFixture<PastelesDetailPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PastelesDetailPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PastelesDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
