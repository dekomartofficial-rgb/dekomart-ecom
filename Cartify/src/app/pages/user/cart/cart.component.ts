import { Component, Input, OnInit } from '@angular/core';
import { NavHomeComponent } from '@/app/home/section/nav-home/nav-home.component';
import { FooterHomeComponent } from "../../../home/section/footer-home/footer-home.component";
import { HttpClientService } from '@/app/provider/services/http-client.service';
import { LoaderService } from '@/app/provider/services/loader.service';
import { baseUrl } from '../../../../assets/config.json'
import { InrPipe } from "../../../provider/pipe/inr.pipe";
import { Router } from '@angular/router';
import { SaveOrder } from '@/app/provider/class/UserClass';
import { ToastService } from '@/app/provider/services/toast.service';
import { CartItem } from '@/app/provider/class/UserClass';
import { ConfirmationDialogService } from '@/app/provider/services/confirmation-dialog.service';
import { BlockUrlService } from '@/app/provider/services/block-url.service';



@Component({
  selector: 'app-cart',
  imports: [NavHomeComponent, FooterHomeComponent, InrPipe],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  @Input() isShowHeaderAndFooter: string = 'Y';
  SaveOrder: SaveOrder = new SaveOrder()
  CartItem: CartItem = new CartItem()
  CartData: any[] = []
  CartSummary: any[] = []
  UserId: number = 0;
  baseUrl: string = baseUrl



  constructor(private httpClient: HttpClientService, private loader: LoaderService, private router: Router, private _messageservice: ToastService, private ConfirmationService: ConfirmationDialogService, private blockurl: BlockUrlService) { }
  ngOnInit() {
    this.UserId = this.httpClient.getUserId()
    this.getCartData()
  }

  getCartData(UserId?: Number) {
    this.loader.show()
    this.httpClient.get<any[]>('user/GetUserCart').subscribe((res) => {
      if (res) {
        this.CartData = res[0]
        this.CartSummary = res[1]
        this.loader.hide()
      }
    })
  }

  checkOut() {
    this.loader.show()
    setTimeout(() => {
      this.SaveOrder.OpsMode = 'CREATE_ORDER'
      this.SaveOrder.UserId = this.UserId
      this.SaveOrder.CartId = this.CartData[0].CartId
      this.SaveOrder.OrderId = 0
      this.httpClient.post('user/SaveUserOrder', this.SaveOrder).subscribe((res: any) => {
        if (res.MessageType === 2) {
          this.blockurl.giveAccess()
          this.router.navigate(['user/checkout']);
          this._messageservice.show('Success', res.Message);
          this.loader.hide()
        } else {
          this._messageservice.show('Error', res.Message);
          this.loader.hide()
        }
      });
    }, 3000);
  }

  deleteCart(cartId: number) {
    this.ConfirmationService.confirm({
      title: 'Delete Confirmation',
      message: 'Are you sure you want to delete this item? This action cannot be undone.',
      confirmText: 'Delete',
      cancelText: 'Cancel'
    }).then((confirmed) => {
      if (confirmed) {
        this.CartItem.CartId = cartId
        this.CartItem.OpsMode = 'DELETE'
        this.httpClient.post('user/SaveAddToCart', this.CartItem).subscribe((res: any) => {
          if (res.MessageType === 2) {
            this.loader.hide()
            this.getCartData()
            this.CartItem = new CartItem()
            this._messageservice.show('Success', res.Message);
          } else {
            this._messageservice.show('Error', res.Message);
          }
        });
      }
    });

  }

  SaveCart() {
    if (!this.httpClient.isLoggedIn()) {
      this._messageservice.show('Error', 'You must be logged in to add items to your cart.');
      return
    }
    if (!this.CartItem.Size) {
      this._messageservice.show('Error', 'Please select atleast one size.');
      return
    }
    this.httpClient.post('user/SaveAddToCart', this.CartItem).subscribe((res: any) => {
      if (res.MessageType === 2) {
        this.loader.hide()
        this.CartItem = new CartItem()
        this._messageservice.show('Success', res.Message);
      } else {
        this._messageservice.show('Error', res.Message);
      }
    });
  }
}
