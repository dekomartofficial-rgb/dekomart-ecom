import { Component } from '@angular/core';
import { BannerHomeComponent } from './section/banner-home/banner-home.component';
import { GalleryHomeComponent } from './section/gallery-home/gallery-home.component';
import { NavHomeComponent } from "./section/nav-home/nav-home.component";
import { FooterHomeComponent } from "./section/footer-home/footer-home.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [BannerHomeComponent, GalleryHomeComponent, NavHomeComponent, FooterHomeComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(private httpClient: HttpClientService) {
    // httpClient.LogOut()
  }

  wishlistCount: number = 0;



  featuredProducts: Product[] = [
    {
      id: 1,
      name: 'Wireless Headphones',
      price: 79.99,
      originalPrice: 99.99,
      reviewCount: 124,
      isNew: true
    },
    {
      id: 2,
      name: 'Smart Watch',
      price: 149.99,
      reviewCount: 86,
      isNew: false
    },
    {
      id: 3,
      name: 'Laptop Backpack',
      price: 45.99,
      originalPrice: 59.99,
      reviewCount: 214,
      isNew: false
    },
    {
      id: 4,
      name: 'Bluetooth Speaker',
      price: 55.99,
      reviewCount: 178,
      isNew: true
    }
  ];

  updateWishlistCount(count: number) {
    this.wishlistCount = count;  // Updates wishlist count
  }
}
