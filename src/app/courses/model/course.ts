import { Lesson } from './lesson';

export type Course = {
  id: string;
  name: string;
  category: string;
  lessons: Lesson[];
};
