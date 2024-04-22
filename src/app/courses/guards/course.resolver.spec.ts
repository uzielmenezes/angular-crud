import { ActivatedRouteSnapshot } from '@angular/router';
import { of } from 'rxjs';

import { CoursesService } from '../services/courses.service';
import { CourseResolver } from './course.resolver';

describe('CourseResolver', () => {
  let resolver: CourseResolver;
  let coursesServiceSpy: jasmine.SpyObj<CoursesService>;

  beforeEach(() => {
    coursesServiceSpy = jasmine.createSpyObj('CoursesService', ['loadById']);
    resolver = new CourseResolver(coursesServiceSpy);
  });

  it('should resolve course by ID when ID parameter exists', () => {
    const courseId = '123';
    const routeSnapshot: ActivatedRouteSnapshot = {
      params: { id: courseId },
    } as unknown as ActivatedRouteSnapshot;

    const expectedCourse = {
      id: courseId,
      name: 'Angular Basics',
      category: 'Web Development',
      lessons: [
        { id: '1', name: 'Introduction', youtubeUrl: '15ZQtzDmFnM' },
        { id: '2', name: 'Components', youtubeUrl: '15ZQtzDmFnM' },
        { id: '3', name: 'Directives', youtubeUrl: '15ZQtzDmFnM' },
      ],
    };

    coursesServiceSpy.loadById.and.returnValue(of(expectedCourse));

    resolver.resolve(routeSnapshot).subscribe((result) => {
      expect(result).toEqual(expectedCourse);
    });
  });

  it('should return empty default course when ID parameter is missing', () => {
    const routeSnapshot: ActivatedRouteSnapshot = {
      params: {},
    } as ActivatedRouteSnapshot;

    const expectedDefaultCourse = {
      id: '',
      name: '',
      category: '',
      lessons: [],
    };

    resolver.resolve(routeSnapshot).subscribe((result) => {
      expect(result).toEqual(expectedDefaultCourse);
    });
  });
});
