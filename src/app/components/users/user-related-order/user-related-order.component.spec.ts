import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRelatedOrderComponent } from './user-related-order.component';

describe('UserRelatedOrderComponent', () => {
  let component: UserRelatedOrderComponent;
  let fixture: ComponentFixture<UserRelatedOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserRelatedOrderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserRelatedOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
