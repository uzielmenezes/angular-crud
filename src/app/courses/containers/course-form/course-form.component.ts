import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  UntypedFormArray,
  Validators,
} from '@angular/forms';
import { MatButton, MatIconButton } from '@angular/material/button';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
} from '@angular/material/card';
import { MatOption } from '@angular/material/core';
import {
  MatError,
  MatFormField,
  MatHint,
  MatLabel,
  MatPrefix,
} from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { MatSelect } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatToolbar } from '@angular/material/toolbar';
import { ActivatedRoute } from '@angular/router';
import { FormUtilsService } from 'src/app/shared/form/form-utils.service';

import { Course } from '../../model/course';
import { Lesson } from '../../model/lesson';
import { CoursesService } from '../../services/courses.service';

type CourseForm = {
  id: FormControl<string>;
  name: FormControl<string>;
  category: FormControl<string>;
  lessons: FormArray<FormGroup<any>>;
};

type LessonForm = {
  id: FormControl<string>;
  name: FormControl<string>;
  youtubeUrl: FormControl<string>;
};

enum SnackBarMessage {
  Success = 'Curso salvo com sucesso.',
  Error = 'Erro ao salvar curso.',
}

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss'],
  standalone: true,
  imports: [
    MatCard,
    MatToolbar,
    MatCardContent,
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    MatHint,
    MatError,
    MatLabel,
    MatSelect,
    MatOption,
    MatIconButton,
    MatIcon,
    MatPrefix,
    MatCardActions,
    MatButton,
  ],
})
export class CourseFormComponent implements OnInit {
  courseForm!: FormGroup<CourseForm>;

  course!: Course;

  constructor(
    private fb: NonNullableFormBuilder,
    private coursesService: CoursesService,
    private snackBar: MatSnackBar,
    private location: Location,
    private route: ActivatedRoute,
    public formUtils: FormUtilsService
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
      lessons: this.fb.array(this.getLessons(this.course), Validators.required),
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
      name: [
        lesson.name,
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(100),
        ],
      ],
      youtubeUrl: [
        lesson.youtubeUrl,
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(11),
        ],
      ],
    });
  }

  get getLessonsFormArray(): AbstractControl<any, any>[] {
    return (<UntypedFormArray>this.courseForm.get('lessons')).controls;
  }

  onSubmit(): void {
    if (this.courseForm.invalid) {
      this.formUtils.validateAllFormFields(this.courseForm);
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
    this.snackBar.open(SnackBarMessage.Success, '', {
      duration: 3000,
    });
    this.onCancel();
  }

  private onError(): void {
    this.snackBar.open(SnackBarMessage.Error, '', {
      duration: 3000,
    });
  }

  onCancel(): void {
    this.location.back();
  }

  addNewLesson(): void {
    const lessons = this.courseForm.get('lessons') as UntypedFormArray;
    lessons.push(this.createLesoon());
  }

  removeLesson(lessonIndex: number): void {
    const lessons = this.courseForm.get('lessons') as UntypedFormArray;
    lessons.removeAt(lessonIndex);
  }
}
