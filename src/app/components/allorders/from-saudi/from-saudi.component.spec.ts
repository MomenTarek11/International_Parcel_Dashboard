import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FromSaudiComponent } from './from-saudi.component';

describe('FromSaudiComponent', () => {
  let component: FromSaudiComponent;
  let fixture: ComponentFixture<FromSaudiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FromSaudiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FromSaudiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
