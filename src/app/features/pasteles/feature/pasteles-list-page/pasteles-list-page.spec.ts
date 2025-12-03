import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PastelesListPage } from './pasteles-list-page';

describe('PastelesListPage', () => {
  let component: PastelesListPage;
  let fixture: ComponentFixture<PastelesListPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PastelesListPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PastelesListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
