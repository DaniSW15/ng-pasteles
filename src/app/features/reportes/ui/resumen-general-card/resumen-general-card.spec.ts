import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumenGeneralCard } from './resumen-general-card';

describe('ResumenGeneralCard', () => {
  let component: ResumenGeneralCard;
  let fixture: ComponentFixture<ResumenGeneralCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResumenGeneralCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResumenGeneralCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
