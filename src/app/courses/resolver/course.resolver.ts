import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';

import { Course } from '../model/course';
import { CoursesService } from '../services/courses.service';

@Injectable({
  providedIn: 'root',
})
export class CourseResolver {
  constructor(private readonly coursesService: CoursesService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Course> {
    const hasIdParams = route?.params?.['id'];

    if (hasIdParams) {
      return this.coursesService.loadById(route.params['id']);
    }
    return of({ id: '', name: '', category: '', lessons: [] });
  }
}
