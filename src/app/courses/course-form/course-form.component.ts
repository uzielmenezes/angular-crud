import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss'],
})
export class CourseFormComponent implements OnInit {
  courseForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.courseForm = this.fb.group({
      name: [null],
      category: [null]
    })
  }

  ngOnInit(): void { /* TODO document why this method 'ngOnInit' is empty */ }

  onSubmit() {

  }

  onCancel() {

  }
}
