import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, take, tap } from 'rxjs';

import { Course } from '../courses/model/course';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  private readonly API = 'api/courses';

  constructor(private httpClient: HttpClient) {}

  list() {
    return this.httpClient.get<Course[]>(this.API).pipe(
      take(1),
      delay(500),
      tap((courses) => console.log(courses))
    );
  }

  save(course: Course) {
    return this.httpClient.post<Course>(this.API, course).pipe(take(1));
  }
}
