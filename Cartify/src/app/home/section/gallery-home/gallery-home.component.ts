import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-gallery-home',
  imports: [CarouselModule, CommonModule],
  templateUrl: './gallery-home.component.html',
  styleUrl: './gallery-home.component.css'
})
export class GalleryHomeComponent implements OnInit {

  @Output() wishlistUpdated = new EventEmitter<number>()
  @Output() addToCartUpdated = new EventEmitter<any[]>()
  wishlistedItems = new Set<number>();
  cartItems = new Set<number>();


  imageCircle = [
    { name: 'Metal Wall Art', image: 'assets/landing-page-images/metal-wall.jpg' },
    { name: 'Designer Shelves', image: 'assets/landing-page-images/shelves.jpg' },
    { name: 'Wall Clocks', image: 'assets/landing-page-images/home-round1.jpg' },
    { name: 'Designer Tables', image: 'assets/landing-page-images/table-round.jpg' },
    { name: 'Photo Frame Sets', image: 'assets/landing-page-images/photo-frame.jpg' },
    { name: 'Wallpaper', image: 'assets/landing-page-images/wallpaper.jpg' },
    { name: 'Temples', image: 'assets/landing-page-images/temple.jpg' },
  ];

  productvdio = [
    { video: 'assets/landing-page-images/hsv-temple.mp4' },
    { video: 'assets/landing-page-images/hmetal-art.mp4' },
    { video: 'assets/landing-page-images/hv-shelves.mp4' },
    { video: 'assets/landing-page-images/hv-clock.mp4' },
    { video: 'assets/landing-page-images/hv-table.mp4' },
    { video: 'assets/landing-page-images/hv-temple.mp4' },
  ];

  bestSelling = [
    {
      name: 'Luxury Wall Clock',
      image: 'assets/landing-page-images/home-round1.jpg',
      description: 'Premium wooden clock',
      originalPrice: 2999,
      offerPrice: 2499,
      wishlisted: false,
      addToCart: false,
    },
    {
      name: 'Modern Art Painting',
      image: 'assets/landing-page-images/photo-frame.jpg',
      description: 'Canvas painting for home',
      originalPrice: 4499,
      offerPrice: 3999,
      wishlisted: false,
      addToCart: false
    },
    {
      name: 'Wooden Wall Shelf',
      image: 'assets/landing-page-images/shelves.jpg',
      description: 'Stylish wooden shelf',
      originalPrice: 1999,
      offerPrice: 1499,
      wishlisted: false,
      addToCart: false
    },
    {
      name: 'Designer Lamp',
      image: 'assets/landing-page-images/metal-wall.jpg',
      description: 'Ambient LED lamp',
      originalPrice: 1299,
      offerPrice: 999,
      wishlisted: false,
      addToCart: false
    },
    {
      name: 'Vintage Mirror',
      image: 'assets/landing-page-images/wallpaper.jpg',
      description: 'Classic wall mirror',
      originalPrice: 3499,
      offerPrice: 2799,
      wishlisted: false,
      addToCart: false
    },
    {
      name: 'Wooden Wall Shelf',
      image: 'assets/landing-page-images/shelves.jpg',
      description: 'Stylish wooden shelf',
      originalPrice: 1999,
      offerPrice: 1499,
      wishlisted: false,
      addToCart: false
    },
    {
      name: 'Luxury Wall Clock',
      image: 'assets/landing-page-images/home-round1.jpg',
      description: 'Premium wooden clock',
      originalPrice: 2999,
      offerPrice: 2499,
      wishlisted: false,
      addToCart: false
    },
    {
      name: 'Modern Art Painting',
      image: 'assets/landing-page-images/photo-frame.jpg',
      description: 'Canvas painting for home',
      originalPrice: 4499,
      offerPrice: 3999,
      wishlisted: false,
      addToCart: false

    },
  ];

  canvasPaintings = [
    {
      name: 'Luxury Wall Clock',
      image: 'assets/landing-page-images/home-round1.jpg',
      description: 'Premium wooden clock',
      originalPrice: 2999,
      offerPrice: 2499,
    },
    {
      name: 'Modern Art Painting',
      image: 'assets/landing-page-images/photo-frame.jpg',
      description: 'Canvas painting for home',
      originalPrice: 4499,
      offerPrice: 3999,
    },
    {
      name: 'Wooden Wall Shelf',
      image: 'assets/landing-page-images/shelves.jpg',
      description: 'Stylish wooden shelf',
      originalPrice: 1999,
      offerPrice: 1499,
    },
    {
      name: 'Designer Lamp',
      image: 'assets/landing-page-images/metal-wall.jpg',
      description: 'Ambient LED lamp',
      originalPrice: 1299,
      offerPrice: 999,
    }
  ];
  loungeChairs = [
    {
      name: 'Luxury Wall Clock',
      image: 'assets/landing-page-images/home-round1.jpg',
      description: 'Premium wooden clock',
      originalPrice: 2999,
      offerPrice: 2499,
    },
    {
      name: 'Modern Art Painting',
      image: 'assets/landing-page-images/photo-frame.jpg',
      description: 'Canvas painting for home',
      originalPrice: 4499,
      offerPrice: 3999,
    },
    {
      name: 'Wooden Wall Shelf',
      image: 'assets/landing-page-images/shelves.jpg',
      description: 'Stylish wooden shelf',
      originalPrice: 1999,
      offerPrice: 1499,
    },
    {
      name: 'Designer Lamp',
      image: 'assets/landing-page-images/metal-wall.jpg',
      description: 'Ambient LED lamp',
      originalPrice: 1299,
      offerPrice: 999,
    }
  ];

  sections = [
    {
      title: 'Best Selling',
      items: this.bestSelling
    },
    {
      title: 'Canvas Paintings',
      items: this.canvasPaintings
    },
    {
      title: 'Lounge Chairs',
      items: this.loungeChairs
    }
  ];


  getDiscount(original: number, offer: number): number {
    return Math.round(((original - offer) / original) * 100);
  }

  toggleWishlist(item: any) {
    if (this.wishlistedItems.has(item.id)) {
      this.wishlistedItems.delete(item.id);
    } else {
      this.wishlistedItems.add(item.id);
    }
  }

  toggleAddToCart(item: any) {
    if (this.cartItems.has(item.id)) {
      this.cartItems.delete(item.id);
    } else {
      this.cartItems.add(item.id);
    }
  }

  isWishlisted(item: any): boolean {
    return this.wishlistedItems.has(item.id);
  }

  isInCart(item: any): boolean {
    return this.cartItems.has(item.id);
  }



  ngOnInit() { }
}