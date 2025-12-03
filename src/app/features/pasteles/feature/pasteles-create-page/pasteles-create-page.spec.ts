import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PastelesCreatePage } from './pasteles-create-page';

describe('PastelesCreatePage', () => {
  let component: PastelesCreatePage;
  let fixture: ComponentFixture<PastelesCreatePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PastelesCreatePage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PastelesCreatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
