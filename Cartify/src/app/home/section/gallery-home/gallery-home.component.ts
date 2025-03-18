import { Component, OnInit } from '@angular/core';
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
    { video: 'images/v-temple.mp4' },
    { video: 'images/metal-art.mp4' },
    { video: 'images/v-shelves.mp4' },
    { video: 'images/v-clock.mp4' },
    { video: 'images/v-table.mp4' },
    { video: 'images/v-temple.mp4' },
  ];

  newArrivals = [
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
    },
    {
      name: 'Vintage Mirror',
      image: 'images/wallpaper.jpg',
      description: 'Classic wall mirror',
      originalPrice: 3499,
      offerPrice: 2799,
    },
    {
      name: 'Wooden Wall Shelf',
      image: 'images/shelves.jpg',
      description: 'Stylish wooden shelf',
      originalPrice: 1999,
      offerPrice: 1499,
    },
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
  ];

  getDiscount(original: number, offer: number): number {
    return Math.round(((original - offer) / original) * 100);
  }
  ngOnInit() {}
}
