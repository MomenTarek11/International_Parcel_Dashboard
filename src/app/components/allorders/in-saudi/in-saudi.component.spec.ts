import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InSaudiComponent } from './in-saudi.component';

describe('InSaudiComponent', () => {
  let component: InSaudiComponent;
  let fixture: ComponentFixture<InSaudiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InSaudiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InSaudiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
