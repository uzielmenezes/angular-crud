import { NgClass, NgFor, NgIf } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  NO_ERRORS_SCHEMA,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { ActivatedRoute } from '@angular/router';
import { YouTubePlayerModule } from '@angular/youtube-player';
import { Course } from 'src/app/courses/model/course';
import { Lesson } from 'src/app/courses/model/lesson';

@Component({
  selector: 'app-course-view',
  standalone: true,
  imports: [
    NgClass,
    NgIf,
    NgFor,
    YouTubePlayerModule,
    MatSidenavModule,
    MatButtonModule,
    MatListModule,
  ],
  schemas: [NO_ERRORS_SCHEMA],
  templateUrl: './course-view.component.html',
  styleUrl: './course-view.component.scss',
})
export class CourseViewComponent implements OnInit, AfterViewInit {
  course!: Course;
  selectedLesson!: Lesson;
  videoHeight!: number;
  videoWidth!: number;

  @ViewChild('youtubePlayer') youtubePlayer!: ElementRef<HTMLDivElement>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.course = this.activatedRoute.snapshot.data['course'];
    this.selectedLesson = this.course.lessons[0];
  }

  ngAfterViewInit(): void {
    this.onResize();
    window.addEventListener('resize', this.onResize.bind(this));
  }

  onResize(): void {
    this.videoWidth = this.youtubePlayer.nativeElement.clientWidth * 0.9;
    this.videoHeight = this.videoWidth * 0.6;
    this.cd.detectChanges();
  }

  display(lesson: Lesson): void {
    this.selectedLesson = lesson;
  }

  displaySelectedLesson(lesson: Lesson): boolean {
    return this.selectedLesson === lesson;
  }
}
