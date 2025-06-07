import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  imports: [CommonModule, FormsModule]
})
export class FooterComponent {
  currentYear: number = new Date().getFullYear();
  email: string = '';

  subscribe() {
    if (this.email) {
      console.log('Subscribed with:', this.email);
      // Call API here if needed
    }
  }
}
