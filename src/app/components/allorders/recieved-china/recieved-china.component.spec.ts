import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecievedChinaComponent } from './recieved-china.component';

describe('RecievedChinaComponent', () => {
  let component: RecievedChinaComponent;
  let fixture: ComponentFixture<RecievedChinaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecievedChinaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecievedChinaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
