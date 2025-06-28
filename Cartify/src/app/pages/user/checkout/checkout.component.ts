import { Component, Input, OnInit } from '@angular/core';
import { LoaderService } from '@/app/provider/services/loader.service';
import { HttpClientService } from '@/app/provider/services/http-client.service';
import { InrPipe } from '@/app/provider/pipe/inr.pipe';
import { baseUrl } from '../../../../assets/config.json'
import { Router } from '@angular/router';
import { PaymentService } from '@/app/provider/services/payment.service';
import { CommonService } from '@/app/provider/services/common.service';
import { PlaceOrder } from '@/app/provider/class/UserClass';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastService } from '@/app/provider/services/toast.service';



declare var Razorpay: any;

@Component({
  selector: 'app-checkout',
  imports: [InrPipe, CommonModule, FormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit {
  IsHaveScreenPermistion: boolean = false
  AddressDetails: any[] = []
  ProductDetails: any[] = []
  SumamryDetails: any[] = []
  UserProfile: any[] = []
  baseUrl: string = baseUrl
  RefCode: any[] = []
  PlaceOrder: PlaceOrder = new PlaceOrder()
  constructor(private loader: LoaderService, private http: HttpClientService, private router: Router, private paymentService: PaymentService, private commonService: CommonService, private toastService: ToastService,
  ) { }

  ngOnInit(): void {
    this.IsHaveScreenPermistion = history.state['IsHaveScreenPermistion'];
    if (this.IsHaveScreenPermistion === false) {
      this.router.navigate(['user/not-found'])
      return;
    }
    this.GetCheckoutDetails()
    this.GetRefData()
    this.getUserProfile(this.http.getUserId())
  }

  GetRefData() {
    this.commonService.getRefGroupData('PAYMENT_MODE').subscribe({
      next: (res: any[]) => {
        this.RefCode = res
      }
    });
  }

  getUserProfile(id: number) {
    this.loader.show()
    this.http.get<any[]>('user/GetUserProfiler', { UserId: id }).subscribe((res) => {
      this.UserProfile = res
      this.loader.hide()
    })
  }

  GetCheckoutDetails() {
    this.loader.show()
    this.http.get<any[]>('user/GetCheckOutDetails').subscribe((res) => {
      if (res) {
        this.AddressDetails = res[0]
        this.ProductDetails = res[1]
        this.SumamryDetails = res[2]
        this.loader.hide()
      }
    })
  }
  RedirectToCart() {
    this.loader.show()
    this.IsHaveScreenPermistion = false
    setTimeout(() => {
      this.router.navigate(['user/user-cart']);
      this.loader.hide()
    }, 3000);
  }

  savePlaceOrder() {
    this.PlaceOrder.OrderId = this.SumamryDetails[0]?.OrderId
    this.PlaceOrder.OpsMode = 'PLACE_ORDER'
    this.PlaceOrder.TotalPayableAmount = this.SumamryDetails[0]?.Total
    this.PlaceOrder.UserName = this.UserProfile[0]?.UserName
    this.PlaceOrder.UserEmail = this.UserProfile[0]?.email
    this.PlaceOrder.UserPhone = this.UserProfile[0]?.PhoneNummber
    this.PlaceOrder.OrderNo = this.SumamryDetails[0]?.OrderNo
    if (this.PlaceOrder.PaymentMode === 'PAYONLINE') {
      this.payOnline()
    } else {
      this.http.post<any>('user/SavePlaceOrder', this.PlaceOrder)
        .subscribe({
          next: (res) => {
            if (res.MessageType === 2) {
              this.toastService.show('Success', res.Message);
              this.IsHaveScreenPermistion = false
              console.log(this.IsHaveScreenPermistion)
              this.router.navigate(['user/order-sucessfully'], { state: { IsHaveScreenPermistion: true } })
              this.loader.hide()
            } else {
              this.toastService.show('Error', res.Message);
              this.loader.hide()
            }
          },
          error: (err) => { throw err }
        })
    }
  }

  payOnline() {
    this.paymentService.CreateOrder(this.PlaceOrder.TotalPayableAmount).subscribe((order) => {
      const options = {
        key: 'rzp_test_01wjQrGrxO45cH',
        amount: order.amount,
        currency: order.currency,
        name: 'Dekomart',
        description: `Payment For Order No: ${this.PlaceOrder.OrderNo}`,
        order_id: order.id,
        handler: (response: any) => {
          this.PlaceOrder.RazorpayOrderId = response.razorpay_order_id
          this.PlaceOrder.RazorpayPaymentId = response.razorpay_payment_id
          this.PlaceOrder.RazorpaySignature = response.razorpay_signature
          this.http.post<any>('user/SavePlaceOrder', this.PlaceOrder)
            .subscribe({
              next: (res) => {
                if (res.MessageType === 2) {
                  this.toastService.show('Success', res.Message);
                  this.IsHaveScreenPermistion = false
                  this.router.navigate(['user/order-sucessfully'], { state: { IsHaveScreenPermistion: true } })
                  this.loader.hide()
                } else {
                  this.toastService.show('Error', res.Message);
                  this.loader.hide()
                }
              },
              error: (err) => { throw err }
            })
        },
        prefill: {
          name: this.PlaceOrder.UserName,
          email: this.PlaceOrder.UserEmail,
          contact: this.PlaceOrder.UserPhone,
        },
        theme: {
          color: '#3399cc',
        },
        method: {
          upi: true,
          card: true,
          netbanking: true,
          wallet: true,
        },
        upi: {
          flow: 'intent', // ⬅️ force mobile app selection
        }
      };


      const rzp = new Razorpay(options);
      rzp.open();
    });
  }
}
