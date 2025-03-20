import { Component,Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-home',
  standalone: true,
  imports: [],
  templateUrl: './nav-home.component.html',
  styleUrl: './nav-home.component.css'
})
export class NavHomeComponent {
constructor(private router: Router){}

  @Input() wishlistCount: number = 0;

  navigateToLogin() {
    this.router.navigate(['/login']);
  }


}
