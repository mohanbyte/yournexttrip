import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  trigger,
  transition,
  style,
  animate,
} from '@angular/animations';
@Component({
  selector: 'app-header',
  imports: [RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  animations:[trigger('collapseAnimation', [
      transition(':enter', [
        style({ height: 0, opacity: 0 }),
        animate('300ms ease-out', style({ height: '*', opacity: 1 })),
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ height: 0, opacity: 0 })),
      ]),
    ]),]
})
export class HeaderComponent {
  toggleActive: boolean = false;
  toggleMenu() {
    this.toggleActive = !this.toggleActive;
  }
}
