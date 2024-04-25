import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';

import { ErrorDialogComponent } from './error-dialog.component';

describe('ErrorDialogComponent', () => {
  let component: ErrorDialogComponent;
  let fixture: ComponentFixture<ErrorDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatDialogModule, ErrorDialogComponent],
      providers: [
        {
          provide: MatDialogRef,
          useValue: {},
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: 'Error message test.',
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open an error dialog with a message and a close button', () => {
    const errorMessageDom = fixture.nativeElement.querySelector(
      '.mat-mdc-dialog-content'
    );
    expect(errorMessageDom.textContent).toContain('Error message test.');

    const okBtn = fixture.nativeElement.querySelector('button');
    expect(okBtn.textContent).toContain('Fechar');
  });
});
