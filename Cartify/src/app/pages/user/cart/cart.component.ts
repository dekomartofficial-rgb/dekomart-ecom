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

@Component({
  selector: 'app-cart',
  imports: [NavHomeComponent, FooterHomeComponent, InrPipe],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  @Input() isShowHeaderAndFooter: string = 'Y';
  SaveOrder: SaveOrder = new SaveOrder()
  CartData: any[] = []
  CartSummary: any[] = []
  UserId: number = 0;
  baseUrl: string = baseUrl



  constructor(private httpClient: HttpClientService, private loader: LoaderService, private router: Router, private _messageservice: ToastService) { }
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
          this.router.navigate(['user/checkout'], { state: { IsHaveScreenPermistion: true } });
          this._messageservice.show('Success', res.Message);
          this.loader.hide()
        } else {
          this._messageservice.show('Error', res.Message);
          this.loader.hide()
        }
      });
    }, 3000);
  }
}
