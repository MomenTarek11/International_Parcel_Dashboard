import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentPopUpComponent } from './payment-pop-up.component';

describe('PaymentPopUpComponent', () => {
  let component: PaymentPopUpComponent;
  let fixture: ComponentFixture<PaymentPopUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentPopUpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
