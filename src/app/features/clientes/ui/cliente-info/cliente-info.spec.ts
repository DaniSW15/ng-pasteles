import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClienteInfo } from './cliente-info';

describe('ClienteInfo', () => {
  let component: ClienteInfo;
  let fixture: ComponentFixture<ClienteInfo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClienteInfo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClienteInfo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
