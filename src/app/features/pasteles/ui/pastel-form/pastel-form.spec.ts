import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PastelForm } from './pastel-form';

describe('PastelForm', () => {
  let component: PastelForm;
  let fixture: ComponentFixture<PastelForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PastelForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PastelForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
