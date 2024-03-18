import { Course } from './course';

export type CoursePage = {
  courses: Course[];
  totalElements: number;
  totalPages: number;
};
