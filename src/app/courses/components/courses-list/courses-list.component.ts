import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Course } from '../../model/course';
import { CategoryPipe } from '../../../shared/pipes/category.pipe';
import { MatMiniFabButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow } from '@angular/material/table';

@Component({
    selector: 'courses-list',
    templateUrl: './courses-list.component.html',
    styleUrls: ['./courses-list.component.scss'],
    standalone: true,
    imports: [
        MatTable,
        MatColumnDef,
        MatHeaderCellDef,
        MatHeaderCell,
        MatCellDef,
        MatCell,
        MatIcon,
        MatMiniFabButton,
        MatIconButton,
        MatHeaderRowDef,
        MatHeaderRow,
        MatRowDef,
        MatRow,
        CategoryPipe,
    ],
})
export class CoursesListComponent {
  @Input() courses: Course[] = [];

  @Output() add = new EventEmitter(false);

  @Output() edit = new EventEmitter(false);

  @Output() delete = new EventEmitter(false);

  readonly displayedColumns = ['name', 'category', 'actions'];

  onAdd(): void {
    this.add.emit(true);
  }

  onEdit(course: Course): void {
    this.edit.emit(course);
  }

  onDelete(course: Course): void {
    this.delete.emit(course);
  }
}
