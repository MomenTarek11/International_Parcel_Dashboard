import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InChinaComponent } from './in-china.component';

describe('InChinaComponent', () => {
  let component: InChinaComponent;
  let fixture: ComponentFixture<InChinaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InChinaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InChinaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
