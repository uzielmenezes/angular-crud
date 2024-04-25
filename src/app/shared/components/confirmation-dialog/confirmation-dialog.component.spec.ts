import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { ConfirmationDialogComponent } from './confirmation-dialog.component';

describe('ConfirmationDialogComponent', () => {
  let component: ConfirmationDialogComponent;
  let fixture: ComponentFixture<ConfirmationDialogComponent>;

  beforeEach(() => {
    const matDialogRefMock = jasmine.createSpyObj('MatDialogRef', ['close']);

    TestBed.configureTestingModule({
      imports: [ConfirmationDialogComponent],
      providers: [
        {
          provide: MatDialogRef,
          useValue: { matDialogRefMock },
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: 'Test Title',
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

  it('should close dialog with true result when "Sim" button is clicked', () => {
    const okBtn = fixture.nativeElement.querySelector('button')[0];
    okBtn.click();
    fixture.detectChanges();

    const dialogRefSpy = spyOn(component.dialogRef, 'close');
    component.onConfirm(true);
    expect(dialogRefSpy).toHaveBeenCalledWith(true);
  });

  it('should close dialog with true result when "Não" button is clicked', () => {
    const okBtn = fixture.nativeElement.querySelector('button')[1];
    okBtn.click();
    fixture.detectChanges();

    const dialogRefSpy = spyOn(component.dialogRef, 'close');
    component.onConfirm(false);
    expect(dialogRefSpy).toHaveBeenCalledWith(false);
  });
});
