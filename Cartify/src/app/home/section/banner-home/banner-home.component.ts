import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-banner-home',
  templateUrl: './banner-home.component.html',
  standalone: true,
  imports: [CommonModule], 
  styleUrls: ['./banner-home.component.css'],
  
})
export class BannerHomeComponent {
  banners = [
    { image: 'assets/landing-page-images/banner1.jpg', title: 'Expressive ART PAINTINGS', subtitle: '20% OFF ON ENTIRE RANGE' },
    { image: 'assets/landing-page-images/banner2.jpg', title: 'Modern Home Decor', subtitle: 'Best Designs for Your Home' }
  ];
}
