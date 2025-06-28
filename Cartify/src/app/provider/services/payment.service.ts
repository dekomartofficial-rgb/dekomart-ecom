import { Injectable } from '@angular/core';
import { HttpClientService } from './http-client.service';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private http: HttpClientService) { }

  CreateOrder(amount: number) {
    return this.http.post<any>('user/Payment/CreateOrder',{
      amount,
      currency: 'INR',
      receipt: 'receipt#123',
    })
  }
}
