import { Component, Input, OnInit } from '@angular/core';
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
import { SocialAuthService } from '@abacritt/angularx-social-login';


@Component({
  selector: 'app-nav-home',
  imports: [MenubarModule, ButtonModule, InputTextModule, AvatarModule, BadgeModule, RippleModule, TooltipModule, CommonModule, RouterModule],
  templateUrl: './nav-home.component.html',
  styleUrl: './nav-home.component.css'
})
export class NavHomeComponent implements OnInit {
  @Input({ required: true }) isShowChild: string = 'N'
  cartCount: number = 0;
  isDropdownOpen = false;
  isMenuOpen = false;

  mainNavLinks = [
    { path: '/section/NEW', label: 'NEW IN' },
    { path: '/section/DIN', label: 'DINING' },
    { path: '/section/BD', label: 'BEDROOM' },
    { path: '/section/BAT', label: 'BATHROOM' },
    { path: '/section/FUN', label: 'FURNITURE' },
    { path: '/section/DEC', label: 'DECOR' },
    { path: '/section/CK', label: 'CLOCK' },
    { path: '/section/GF', label: 'GIFT' }
  ];

  categories = [
    { path: '/section/DECOR', label: 'Decor', image: 'decor.png' },
    { path: '/section/VASES', label: 'Vase', image: 'vase.png' },
    { path: '/section/CANDLEHOLDER', label: 'Vase', image: 'Candle holder.png' },
    { path: '/section/WALLDECOR', label: 'Wall Decor', image: 'wall-decor.png' },
    { path: '/section/MIRROR', label: 'Mirror', image: 'mirror.png' },
    { path: '/section/PLATTER', label: 'Platter', image: 'platter.png' },
    { path: '/section/PLOT', label: 'Pots', image: 'pots.png' },
    { path: '/section/TABLE', label: 'Table ware', image: 'Table ware.png' },
    { path: '/section/SOFTFUNC', label: 'Soft Furnishing', image: 'Soft furnishing.png' },
    { path: '/section/FUNC', label: 'Furniture', image: 'Furniture (1).png' },
  ];

  constructor(private http: HttpClientService, private router: Router, private authService: SocialAuthService) { }
  ngOnInit(): void {
    if (this.http.getUserId() > 0) {
      this.getUserProfile(this.http.getUserId())
    }
  }

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
    this.signOut()
    this.http.LogOut();
  }

  isUserLogged() {
    return this.http.isLoggedIn()
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu() {
    this.isMenuOpen = false;
  }

  getUserProfile(id: number) {
    this.http.get<any[]>('user/GetUserProfiler', { UserId: id }).subscribe((res) => {
      if (res) {
        this.cartCount = res[0]?.CartCount
      }
    })
  }
  signOut(): void {
    this.authService.signOut().then(() => {
      console.log('done')
    });
  }
}
