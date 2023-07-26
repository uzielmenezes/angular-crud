import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { CoursesService } from '../../services/courses.service';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss'],
})
export class CourseFormComponent implements OnInit {
  courseForm = this.fb.group({
    name: [''],
    category: [''],
  });

  constructor(
    private fb: NonNullableFormBuilder,
    private coursesService: CoursesService,
    private snackBar: MatSnackBar,
    private location: Location
  ) {}

  ngOnInit(): void {
    /* TODO document why this method 'ngOnInit' is empty */
  }

  onSubmit() {
    this.coursesService.save(this.courseForm.value).subscribe({
      next: (result) => {
        console.log(result);
        this.onSuccess();
      },
      error: (_) => this.onError(),
    });
  }

  private onSuccess() {
    this.snackBar.open('Curso salvo com sucesso.', '', {
      duration: 3000,
    });
    this.onCancel();
  }

  private onError() {
    this.snackBar.open('Erro ao salvar curso.', '', {
      duration: 3000,
    });
  }

  onCancel() {
    this.location.back();
  }
}
