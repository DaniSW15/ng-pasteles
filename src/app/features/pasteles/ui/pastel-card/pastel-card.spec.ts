import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PastelCard } from './pastel-card';

describe('PastelCard', () => {
  let component: PastelCard;
  let fixture: ComponentFixture<PastelCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PastelCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PastelCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
