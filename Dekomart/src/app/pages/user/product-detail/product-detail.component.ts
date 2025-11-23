import { Component, OnInit } from '@angular/core';
import { NavHomeComponent } from "@/app/home/section/nav-home/nav-home.component";
import { FooterHomeComponent } from "@/app/home/section/footer-home/footer-home.component";
import { HttpClientService } from '@/app/provider/services/http-client.service';
import { LoaderService } from '@/app/provider/services/loader.service';

@Component({
  selector: 'app-product-detail',
  imports: [NavHomeComponent, FooterHomeComponent],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent implements OnInit {
  ProductID: number = 0
  constructor(private httpClient: HttpClientService, private loader: LoaderService) { }

  ngOnInit(): void {
    this.ProductID = history.state['productId'];
    console.log(this.ProductID)
  }
 
  product = {
    name: 'Classic Wooden Tray',
    price: 55,
    mainImage: 'assets/tray1.jpg',
    images: [
      'assets/tray1.jpg',
      'assets/tray2.jpg',
      'assets/tray3.jpg'
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    description:
      'A minimalist wooden serving tray perfect for coffee or decor arrangements.'
  };


} 
