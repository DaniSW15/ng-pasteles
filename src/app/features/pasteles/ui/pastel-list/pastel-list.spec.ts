import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PastelList } from './pastel-list';

describe('PastelList', () => {
  let component: PastelList;
  let fixture: ComponentFixture<PastelList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PastelList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PastelList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
