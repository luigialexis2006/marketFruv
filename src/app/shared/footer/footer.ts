import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.html',  // o './footer.component.html'
  styleUrls: ['./footer.css'] 
})
export class Footer {
  currentYear = new Date().getFullYear();
}
