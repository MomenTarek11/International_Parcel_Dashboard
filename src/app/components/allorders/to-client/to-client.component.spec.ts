import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToClientComponent } from './to-client.component';

describe('ToClientComponent', () => {
  let component: ToClientComponent;
  let fixture: ComponentFixture<ToClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToClientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
