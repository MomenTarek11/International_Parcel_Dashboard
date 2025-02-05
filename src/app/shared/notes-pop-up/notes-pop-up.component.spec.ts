import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotesPopUpComponent } from './notes-pop-up.component';

describe('NotesPopUpComponent', () => {
  let component: NotesPopUpComponent;
  let fixture: ComponentFixture<NotesPopUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotesPopUpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotesPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
