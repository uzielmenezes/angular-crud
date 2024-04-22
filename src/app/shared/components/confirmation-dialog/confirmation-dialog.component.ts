import { Component, Inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
} from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-dialog',
  standalone: true,
  imports: [MatDialogContent, MatDialogActions, MatButton],
  template: `<div mat-dialog-content>
      <p>{{ data }}</p>
    </div>
    <div mat-dialog-actions align="center">
      <button mat-raised-button (click)="onConfirm(true)" color="primary">
        Sim
      </button>
      <button mat-raised-button (click)="onConfirm(false)" color="warn">
        Não
      </button>
    </div>`,
})
export class ConfirmationDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string
  ) {}

  onConfirm(result: boolean): void {
    this.dialogRef.close(result);
  }
}
