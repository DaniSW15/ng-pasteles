import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClienteQuickView } from './cliente-quick-view';

describe('ClienteQuickView', () => {
  let component: ClienteQuickView;
  let fixture: ComponentFixture<ClienteQuickView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClienteQuickView]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClienteQuickView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
