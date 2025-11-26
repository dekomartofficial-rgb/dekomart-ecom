import { Component, OnInit } from '@angular/core';
import { NavHomeComponent } from "@/app/home/section/nav-home/nav-home.component";
import { FooterHomeComponent } from "@/app/home/section/footer-home/footer-home.component";
import { HttpClientService } from '@/app/provider/services/http-client.service';
import { LoaderService } from '@/app/provider/services/loader.service';
import { baseUrl } from '../../../../assets/config.json'
import { InrPipe } from "../../../provider/pipe/inr.pipe";
import { ToastService } from '@/app/provider/services/toast.service';
import { CommonModule } from '@angular/common';
import { CartItem } from '@/app/provider/class/UserClass';


@Component({
  selector: 'app-product-detail',
  imports: [CommonModule, NavHomeComponent, FooterHomeComponent, InrPipe],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent implements OnInit {
  ProductID: number = 0
  baseUrl: string = baseUrl;
  ClickedProduct: any[] = []
  ClickedProductImage: any[] = []
  ClickedImage: string = ''
  AvailableSize: any[] = []
  CartItem: CartItem = new CartItem()
  Quantity: number = 1;

  constructor(private httpClient: HttpClientService,
    private Loader: LoaderService,
    private _messageservice: ToastService) { }

  ngOnInit(): void {
    this.ProductID = history.state['productId'];
    if (this.ProductID) {
      this.GetProductDetails()
    }
  }

  GetProductDetails() {
    this.Loader.show()
    this.httpClient.get<any>('user/GetProductDetails', { ProductId: this.ProductID })
      .subscribe((res) => {
        this.ClickedProduct = res[0]
        this.ClickedProductImage = res[1]
        this.ClickedImage = this.ClickedProductImage[0].ProductImagePath
        this.AvailableSize = this.ClickedProduct[0]?.ProductSize.split(',')
        this.Loader.hide()
      });
  }

  incrementQuantity() {
    this.Quantity++;
  }

  decrementQuantity() {
    if (this.Quantity > 1) {
      this.Quantity--;
    }
  }

  AddtoCart() {
    if (!this.httpClient.isLoggedIn()) {
      this._messageservice.show('Error', 'You must be logged in to add items to your cart.');
      return
    }
    if (!this.CartItem.Size) {
      this._messageservice.show('Error', 'Please select atleast one size.');
      return
    }
    this.CartItem.ProductId = this.ClickedProduct[0]?.ProductId
    this.CartItem.Quantity = this.Quantity
    this.CartItem.OpsMode = 'ADD_TO_CART'
    this.httpClient.post('user/SaveAddToCart', this.CartItem).subscribe((res: any) => {
      if (res.MessageType === 2) {
        this.Loader.hide()
        this.CartItem = new CartItem()
        this.Quantity = 0
        this._messageservice.show('Success', res.Message);
      } else {
        this._messageservice.show('Error', res.Message);
      }
    });
  }
} 
