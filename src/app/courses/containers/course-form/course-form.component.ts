import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';

import { Course } from '../../model/course';
import { Lesson } from '../../model/lesson';
import { CoursesService } from '../../services/courses.service';

type CourseForm = {
  id: FormControl<string>;
  name: FormControl<string>;
  category: FormControl<string>;
};

type LessonForm = {
  id: FormControl<string>;
  name: FormControl<string>;
  youtubeUrl: FormControl<string>;
};

enum ErrorMessage {
  Required = 'Campo obrigatório!',
  MinLength = 'Mínimo de 3 caracteres!',
  MaxLength = 'Máximo de 50 caracteres!',
  Default = 'Campo inválido!',
}

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss'],
})
export class CourseFormComponent implements OnInit {
  courseForm!: FormGroup<CourseForm>;

  course!: Course;

  constructor(
    private fb: NonNullableFormBuilder,
    private coursesService: CoursesService,
    private snackBar: MatSnackBar,
    private location: Location,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.getCourseFromRoute();
    this.courseForm = this.fb.group({
      id: [this.course.id],
      name: [
        this.course.name,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
        ],
      ],
      category: [this.course.category, [Validators.required]],
    });
  }

  private getCourseFromRoute(): void {
    this.course = this.route.snapshot.data['course'];
  }

  private getLessons(course: Course): FormGroup<LessonForm>[] {
    const lessons = [];

    if (course?.lessons) {
      course.lessons.forEach((lesson) =>
        lessons.push(this.createLesoon(lesson))
      );
    } else {
      lessons.push(this.createLesoon());
    }
    return lessons;
  }

  private createLesoon(
    lesson: Lesson = { id: '', name: '', youtubeUrl: '' }
  ): FormGroup<LessonForm> {
    return this.fb.group({
      id: [lesson.id],
      name: [lesson.name],
      youtubeUrl: [lesson.youtubeUrl],
    });
  }

  public onSubmit(): void {
    if (this.courseForm.invalid) {
      this.courseForm.get('name')?.markAllAsTouched();
      this.courseForm.get('category')?.markAllAsTouched();
    } else {
      this.saveCourse();
    }
  }

  private saveCourse(): void {
    this.coursesService.save(this.courseForm.value).subscribe({
      next: () => {
        this.onSuccess();
      },
      error: (_) => this.onError(),
    });
  }

  private onSuccess(): void {
    this.snackBar.open('Curso salvo com sucesso.', '', {
      duration: 3000,
    });
    this.onCancel();
  }

  private onError(): void {
    this.snackBar.open('Erro ao salvar curso.', '', {
      duration: 3000,
    });
  }

  public onCancel(): void {
    this.location.back();
  }

  public getErrorMessage(fieldName: string): ErrorMessage {
    const field = this.courseForm.get(fieldName);

    if (field?.hasError('required')) {
      return ErrorMessage.Required;
    }

    if (field?.hasError('minlength')) {
      return ErrorMessage.MinLength;
    }

    if (field?.hasError('maxlength')) {
      return ErrorMessage.MaxLength;
    }

    return ErrorMessage.Default;
  }
}
