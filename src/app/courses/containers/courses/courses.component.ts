import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, Observable, of } from 'rxjs';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';

import { Course } from '../../model/course';
import { CoursesService } from '../../services/courses.service';

enum MessageToShow {
  OnDeleteSuccess = 'Curso removido com sucesso!',
  OnDeleteError = 'Erro ao tentar remover curso!',
  OnCoursesFetchError = 'Erro ao carregar cursos.',
  OnDeleteConfirm = 'Tem certeza que deseja remover esse curso?',
}

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent {
  courses$!: Observable<Course[]>;

  displayedColumns = ['name', 'category', 'actions'];

  constructor(
    private coursesService: CoursesService,
    public dialog: MatDialog,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {
    this.refresh();
  }

  private refresh(): void {
    this.courses$ = this.coursesService.list().pipe(
      catchError((error) => {
        this.onError(MessageToShow.OnCoursesFetchError);
        return of([]);
      })
    );
  }

  onError(errorMsg: string): void {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg,
    });
  }

  onAdd(): void {
    this.router.navigate(['new'], { relativeTo: this.activatedRoute });
  }

  onEdit(course: Course): void {
    this.router.navigate(['edit', course.id], {
      relativeTo: this.activatedRoute,
    });
  }

  onDelete(course: Course): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: MessageToShow.OnDeleteConfirm,
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.coursesService.remove(course.id).subscribe({
          next: () => {
            this.refresh();
            this.onSuccess(MessageToShow.OnDeleteSuccess);
          },
          error: (err) => {
            this.onError(MessageToShow.OnDeleteError);
            console.error(err);
          },
        });
      }
    });
  }

  private onSuccess(successMsg: string) {
    this.snackBar.open(successMsg, 'X', {
      duration: 5000,
      verticalPosition: 'top',
      horizontalPosition: 'center',
    });
  }
}
