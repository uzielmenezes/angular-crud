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

  beforeEach(async () => {
    const matDialogRefMock = jasmine.createSpyObj('MatDialogRef', ['close']);

    await TestBed.configureTestingModule({
      imports: [MatDialogModule, ConfirmationDialogComponent],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: 'Confirmation message test.' },
        { provide: MatDialogRef, useValue: matDialogRefMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ConfirmationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open a dialog with a message and confirm and cancel buttons', () => {
    const confirmationMessageDom = fixture.nativeElement.querySelector(
      '.mat-mdc-dialog-content'
    );
    expect(confirmationMessageDom.textContent).toContain(
      'Confirmation message test.'
    );

    const confirmBtn = fixture.nativeElement.querySelectorAll('button')[0];
    expect(confirmBtn.textContent).toContain('Sim');

    const cancelBtn = fixture.nativeElement.querySelectorAll('button')[1];
    expect(cancelBtn.textContent).toContain('Não');
  });

  it('should close dialog with true result when clicking on confirm button', () => {
    const confirmBtn = fixture.nativeElement.querySelectorAll('button')[0];
    confirmBtn.click();
    fixture.detectChanges();

    const dialog = component.dialogRef;
    expect(dialog.close).toHaveBeenCalledWith(true);
  });

  it('should close dialog with false result when clicking on cancel button', () => {
    const cancelBtn = fixture.nativeElement.querySelectorAll('button')[1];
    cancelBtn.click();
    fixture.detectChanges();

    const dialog = component.dialogRef;
    expect(dialog.close).toHaveBeenCalledWith(false);
  });
});
