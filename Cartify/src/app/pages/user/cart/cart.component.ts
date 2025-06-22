import { Component, Input, OnInit } from '@angular/core';
import { NavHomeComponent } from '@/app/home/section/nav-home/nav-home.component';
import { FooterHomeComponent } from "../../../home/section/footer-home/footer-home.component";
import { HttpClientService } from '@/app/provider/services/http-client.service';
import { LoaderService } from '@/app/provider/services/loader.service';
import { baseUrl } from '../../../../assets/config.json'
import { InrPipe } from "../../../provider/pipe/inr.pipe";

@Component({
  selector: 'app-cart',
  imports: [NavHomeComponent, FooterHomeComponent, InrPipe],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  @Input() isShowHeaderAndFooter: string = 'Y';
  CartData: any[] = []
  CartSummary: any[] = []
  baseUrl: string = baseUrl



  constructor(private httpClient: HttpClientService, private loader: LoaderService) { }
  ngOnInit() {
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
}
