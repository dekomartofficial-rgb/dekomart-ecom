import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';
import { CommonModule } from '@angular/common';

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  reviewCount: number;
  isNew: boolean;
}
@Component({
  selector: 'app-gallery-home',
  standalone: true,
  imports: [CarouselModule, CommonModule],
  templateUrl: './gallery-home.component.html',
  styleUrl: './gallery-home.component.css',
})
export class GalleryHomeComponent implements OnInit {

 @Output() wishlistUpdated = new EventEmitter<number>() 


  imageCircle = [
    { name: 'Metal Wall Art', image: 'images/metal-wall.jpg' },
    { name: 'Designer Shelves', image: 'images/shelves.jpg' },
    { name: 'Wall Clocks', image: 'images/home-round1.jpg' },
    { name: 'Designer Tables', image: 'images/table-round.jpg' },
    { name: 'Photo Frame Sets', image: 'images/photo-frame.jpg' },
    { name: 'Wallpaper', image: 'images/wallpaper.jpg' },
    { name: 'Temples', image: 'images/temple.jpg' },
  ];

  productvdio = [
    { video: 'asset/images/v-temple.mp4' },
    { video: 'asset/images/metal-art.mp4' },
    { video: 'asset/images/v-shelves.mp4' },
    { video: 'asset/images/v-clock.mp4' },
    { video: 'asset/images/v-table.mp4' },
    { video: 'asset/images/v-temple.mp4' },
  ];

  bestSelling = [
    {
      name: 'Luxury Wall Clock',
      image: 'images/home-round1.jpg',
      description: 'Premium wooden clock',
      originalPrice: 2999,
      offerPrice: 2499,
      wishlisted: false
    },
    {
      name: 'Modern Art Painting',
      image: 'images/photo-frame.jpg',
      description: 'Canvas painting for home',
      originalPrice: 4499,
      offerPrice: 3999,
      wishlisted: false
    },
    {
      name: 'Wooden Wall Shelf',
      image: 'images/shelves.jpg',
      description: 'Stylish wooden shelf',
      originalPrice: 1999,
      offerPrice: 1499,
      wishlisted: false
    },
    {
      name: 'Designer Lamp',
      image: 'images/metal-wall.jpg',
      description: 'Ambient LED lamp',
      originalPrice: 1299,
      offerPrice: 999,
      wishlisted: false
    },
    {
      name: 'Vintage Mirror',
      image: 'images/wallpaper.jpg',
      description: 'Classic wall mirror',
      originalPrice: 3499,
      offerPrice: 2799,
      wishlisted: false
    },
    {
      name: 'Wooden Wall Shelf',
      image: 'images/shelves.jpg',
      description: 'Stylish wooden shelf',
      originalPrice: 1999,
      offerPrice: 1499,
      wishlisted: false
    },
    {
      name: 'Luxury Wall Clock',
      image: 'images/home-round1.jpg',
      description: 'Premium wooden clock',
      originalPrice: 2999,
      offerPrice: 2499,
      wishlisted: false
    },
    {
      name: 'Modern Art Painting',
      image: 'images/photo-frame.jpg',
      description: 'Canvas painting for home',
      originalPrice: 4499,
      offerPrice: 3999,
      wishlisted: false

    },
  ];

  canvasPaintings = [
    {
      name: 'Luxury Wall Clock',
      image: 'images/home-round1.jpg',
      description: 'Premium wooden clock',
      originalPrice: 2999,
      offerPrice: 2499,
    },
    {
      name: 'Modern Art Painting',
      image: 'images/photo-frame.jpg',
      description: 'Canvas painting for home',
      originalPrice: 4499,
      offerPrice: 3999,
    },
    {
      name: 'Wooden Wall Shelf',
      image: 'images/shelves.jpg',
      description: 'Stylish wooden shelf',
      originalPrice: 1999,
      offerPrice: 1499,
    },
    {
      name: 'Designer Lamp',
      image: 'images/metal-wall.jpg',
      description: 'Ambient LED lamp',
      originalPrice: 1299,
      offerPrice: 999,
    }
  ];
     loungeChairs = [
    {
      name: 'Luxury Wall Clock',
      image: 'images/home-round1.jpg',
      description: 'Premium wooden clock',
      originalPrice: 2999,
      offerPrice: 2499,
    },
    {
      name: 'Modern Art Painting',
      image: 'images/photo-frame.jpg',
      description: 'Canvas painting for home',
      originalPrice: 4499,
      offerPrice: 3999,
    },
    {
      name: 'Wooden Wall Shelf',
      image: 'images/shelves.jpg',
      description: 'Stylish wooden shelf',
      originalPrice: 1999,
      offerPrice: 1499,
    },
    {
      name: 'Designer Lamp',
      image: 'images/metal-wall.jpg',
      description: 'Ambient LED lamp',
      originalPrice: 1299,
      offerPrice: 999,
    }
  ];

  getDiscount(original: number, offer: number): number {
    return Math.round(((original - offer) / original) * 100);
  }

  toggleWishlist(item: any) {

    item.wishlisted = !item.wishlisted; 

     // Update the bestSelling array with the modified item
  this.bestSelling = this.bestSelling.map((product) =>
    product.name === item.name ? { ...product, wishlisted: item.wishlisted } : product

  );


  const wishlistCount = this.bestSelling.filter(product => product.wishlisted).length;
  
  this.wishlistUpdated.emit(wishlistCount);  

  }  
  ngOnInit() {}
}
