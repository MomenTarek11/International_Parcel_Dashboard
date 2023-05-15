import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecivedSaudiComponent } from './recived-saudi.component';

describe('RecivedSaudiComponent', () => {
  let component: RecivedSaudiComponent;
  let fixture: ComponentFixture<RecivedSaudiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecivedSaudiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecivedSaudiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
