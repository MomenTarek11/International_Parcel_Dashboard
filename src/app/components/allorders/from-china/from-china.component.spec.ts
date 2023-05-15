import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FromChinaComponent } from './from-china.component';

describe('FromChinaComponent', () => {
  let component: FromChinaComponent;
  let fixture: ComponentFixture<FromChinaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FromChinaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FromChinaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
