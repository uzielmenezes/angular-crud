import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, Observable, take } from 'rxjs';

import { Course } from '../model/course';
import { CoursePage } from '../model/course-page';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  private readonly API = 'api/courses';

  constructor(private httpClient: HttpClient) {}

  list(page = 0, pageSize = 10): Observable<CoursePage> {
    return this.httpClient
      .get<CoursePage>(this.API, { params: { page, pageSize } })
      .pipe(take(1), delay(500));
  }

  loadById(id: string): Observable<Course> {
    return this.httpClient.get<Course>(`${this.API}/${id}`);
  }

  save(course: Partial<Course>): Observable<Course> {
    return this.saveOrUpdate(course);
  }

  private saveOrUpdate(course: Partial<Course>): Observable<Course> {
    if (course.id) {
      return this.update(course);
    } else {
      return this.create(course);
    }
  }

  private create(course: Partial<Course>): Observable<Course> {
    return this.httpClient.post<Course>(this.API, course).pipe(take(1));
  }

  private update(course: Partial<Course>): Observable<Course> {
    return this.httpClient
      .put<Course>(`${this.API}/${course.id}`, course)
      .pipe(take(1));
  }

  remove(courseId: string): Observable<void> {
    return this.httpClient
      .delete<void>(`${this.API}/${courseId}`)
      .pipe(take(1));
  }
}
