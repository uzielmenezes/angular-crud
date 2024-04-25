import { Component } from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MatToolbar, RouterOutlet, RouterLink],
  template: `<mat-toolbar color="primary">
      <span [routerLink]="['/']" style="cursor: pointer">{{ title }}</span>
    </mat-toolbar>
    <router-outlet></router-outlet>`,
})
export class AppComponent {
  title = 'Crud Angular / Spring';
}
