import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, take } from 'rxjs';

import { Course } from '../model/course';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  private readonly API = 'api/courses';

  constructor(private httpClient: HttpClient) {}

  list() {
    return this.httpClient.get<Course[]>(this.API).pipe(take(1), delay(500));
  }

  loadById(id: string) {
    return this.httpClient.get<Course>(`${this.API}/${id}`);
  }

  save(course: Partial<Course>) {
    return this.saveOrUpdate(course);
  }

  private saveOrUpdate(course: Partial<Course>) {
    if (course.id) {
      return this.update(course);
    } else {
      return this.create(course);
    }
  }

  private create(course: Partial<Course>) {
    return this.httpClient.post<Course>(this.API, course).pipe(take(1));
  }

  private update(course: Partial<Course>) {
    return this.httpClient
      .put<Course>(`${this.API}/${course.id}`, course)
      .pipe(take(1));
  }
}
