import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { CoursesService } from '../services/courses.service';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss'],
})
export class CourseFormComponent implements OnInit {
  courseForm: FormGroup;

  constructor(private fb: FormBuilder, private coursesService: CoursesService, private snackBar: MatSnackBar){
    this.courseForm = this.fb.group({
      name: [null],
      category: [null]
    })
  }

  ngOnInit(): void { /* TODO document why this method 'ngOnInit' is empty */ }

  onSubmit() {
    this.coursesService.save(this.courseForm.value).subscribe({
      next: (result) => console.log(result),
      error: (_) => this.onError(),
    });
  }

  private onError() {
    this.snackBar.open('Erro ao salvar curso.', '', {
      duration: 3000,
    });
  }

  onCancel() {

  }
}
