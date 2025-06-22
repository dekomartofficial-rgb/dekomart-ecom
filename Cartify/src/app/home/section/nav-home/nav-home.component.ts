import { Component, Input } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { AvatarModule } from 'primeng/avatar';
import { BadgeModule } from 'primeng/badge';
import { RippleModule } from 'primeng/ripple';
import { TooltipModule } from 'primeng/tooltip';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { HttpClientService } from '@/app/provider/services/http-client.service';

@Component({
  selector: 'app-nav-home',
  imports: [MenubarModule, ButtonModule, InputTextModule, AvatarModule, BadgeModule, RippleModule, TooltipModule, CommonModule, RouterModule],
  templateUrl: './nav-home.component.html',
  styleUrl: './nav-home.component.css'
})
export class NavHomeComponent {
  @Input({ required: true }) isShowChild: string = 'N' 
  cartCount = 3; // Example cart count 

  mainNavLinks = [
    { path: '/', label: 'NEW IN' },
    { path: '/', label: 'DINING' },
    { path: '/', label: 'BEDROOM' },
    { path: '/', label: 'BATHROOM' },
    { path: '/', label: 'FURNITURE' },
    { path: '/', label: 'DECOR' },
    { path: '/', label: 'CLOCK' },
    { path: '/', label: 'GIFT' }
  ];

  categories = [
    { path: '/tables', label: 'Table ware', image: 'tableware.png' },
    { path: '/platter', label: 'Platter', image: 'platter.png' },
    { path: '/soft-furnishings', label: 'Soft Furnishing', image: 'soft-furnishing.png' },
    { path: '/decor', label: 'Decor', image: 'decor.png' },
    { path: '/furniture', label: 'Furniture', image: 'furniture.png' },
    { path: '/vases', label: 'Vase', image: 'vase.png' },
    { path: '/wall-decor', label: 'Wall Decor', image: 'wall-decor.png' },
    { path: '/mirrors', label: 'Mirror', image: 'mirror.png' }
  ];

  constructor(private http: HttpClientService, private router: Router) { }

  onLogin() {
    if (this.http.getUserData()) {
      if (this.http.getUserData().UserRole === 'US') {
        return this.router.navigateByUrl('/user')
      }
      else {
        return this.router.navigateByUrl('/admin')
      }
    } else {
      return this.router.navigateByUrl('/login')
    }
  }

  Logout() {
    this.http.LogOut();
  }

  isUserLogged() {
    return this.http.isLoggedIn()
  }
}
