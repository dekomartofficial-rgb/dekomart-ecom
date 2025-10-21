import { Component, EventEmitter, OnInit, Output, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { Router } from '@angular/router';
import { HttpClientService } from '@/app/provider/services/http-client.service';
import { LoaderService } from '@/app/provider/services/loader.service';
import { baseUrl } from '../../../../assets/config.json'
import { ToastService } from '@/app/provider/services/toast.service';
import { CartItem } from '@/app/provider/class/UserClass';
import { FormsModule } from '@angular/forms';
import { InrPipe } from "../../../provider/pipe/inr.pipe";


@Component({
  selector: 'app-gallery-home',
  imports: [CarouselModule, CommonModule, DialogModule, ButtonModule, CardModule, FormsModule, InrPipe],
  templateUrl: './gallery-home.component.html',
  styleUrl: './gallery-home.component.css',
})
export class GalleryHomeComponent implements OnInit {
  displayDialog: boolean = false;
  CartItem: CartItem = new CartItem()
  HomeData: any[] = []
  HomeHeaderData: any[] = []
  HomeData2: any[] = []
  FilterCardData: any[] = []
  baseUrl: string = baseUrl
  ClickedProduct: any[] = []
  ClickedProductImage: any[] = []
  ClickedImage: string = ''
  AvailableSize: any[] = []
  Quantity: number = 1;
  UserId: number = 0

  CustomerReview = [
    { name: 'Mohammed Sinan C', postition: 'Customer', feedback: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.', rating: '★★★★☆', date: '03/03/2023' },
    { name: 'Mohammed Shakeel', postition: 'Customer', feedback: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.', rating: '★★★★☆', date: '03/03/2023' },
    { name: 'Mohammed Sinan C', postition: 'Customer', feedback: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.', rating: '★★★★☆', date: '03/03/2023' },
  ]

  constructor(private router: Router, private httpClient: HttpClientService, private Loader: LoaderService, private _messageservice: ToastService) { }
  ngOnInit(): void {
    this.UserId = this.httpClient.getUserId() ?? 0
    this.GetHomeData()
  }

  GetHomeData() {
    this.Loader.show()
    this.httpClient.get<any>('user/GetUserHome', { UserId: this.UserId })
      .subscribe((res) => {
        this.HomeHeaderData = res[0]
        this.HomeData = res[1];
        this.Loader.hide()
      });
  }

  filterByHeaderTitle(headerTitle: string): any[] {
    return this.HomeData.filter(item => item.HeaderTitle === headerTitle);
  }

  GetProductDetails(ProductId: number) {
    this.displayDialog = true
    this.Loader.show()
    this.httpClient.get<any>('user/GetProductDetails', { ProductId: ProductId })
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
  closeModel() {
    this.displayDialog = false
    this.CartItem = new CartItem()
    this.Quantity = 0
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
        this.displayDialog = false
      } else {
        this._messageservice.show('Error', res.Message);
      }
    });
  }
}