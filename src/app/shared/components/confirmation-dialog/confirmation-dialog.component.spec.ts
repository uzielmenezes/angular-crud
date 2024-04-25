import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';

import { ConfirmationDialogComponent } from './confirmation-dialog.component';

fdescribe('ConfirmationDialogComponent', () => {
  let component: ConfirmationDialogComponent;
  let fixture: ComponentFixture<ConfirmationDialogComponent>;

  beforeEach(() => {
    const matDialogRefMock = jasmine.createSpyObj('MatDialogRef', ['close']);

    TestBed.configureTestingModule({
      imports: [MatDialogModule, ConfirmationDialogComponent],
      providers: [
        {
          provide: MatDialogRef,
          useValue: { matDialogRefMock },
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: 'Confirmation message test.',
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open a dialog with a message and confirmation and deny buttons', () => {
    const confirmationMessageDom = fixture.nativeElement.querySelector(
      '.mat-mdc-dialog-content'
    );
    expect(confirmationMessageDom.textContent).toContain(
      'Confirmation message test.'
    );

    const okBtn = fixture.nativeElement.querySelectorAll('button')[0];
    expect(okBtn.textContent).toContain('Sim');

    const cancelBtn = fixture.nativeElement.querySelectorAll('button')[1];
    expect(cancelBtn.textContent).toContain('Não');
  });
});
