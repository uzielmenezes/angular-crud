import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Course } from '../courses/model/course';
import { take, tap, delay } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  private readonly API = '/assets/courses.json';

  constructor(
    private httpClient: HttpClient
  ) { }

  list() {
    return this.httpClient.get<Course[]>(this.API)
      .pipe(
        take(1),
        delay(500),
        tap(courses => console.log(courses))
      );
  }
}
