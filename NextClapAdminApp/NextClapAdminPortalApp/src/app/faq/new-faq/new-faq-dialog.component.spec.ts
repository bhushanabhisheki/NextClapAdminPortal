import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewFaqDialog } from './new-faq-dialog.component';

describe('NewFaqComponent', () => {
  let component: NewFaqDialog;
  let fixture: ComponentFixture<NewFaqDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewFaqDialog],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewFaqDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
