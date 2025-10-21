import { Component, OnInit } from '@angular/core';
import { LoaderService } from '@/app/provider/services/loader.service';
import { HttpClientService } from '@/app/provider/services/http-client.service';
import { CommonModule } from '@angular/common';
import { InrPipe } from '@/app/provider/pipe/inr.pipe';
import { baseUrl } from '../../../../assets/config.json'


@Component({
  selector: 'app-user-orders',
  imports: [CommonModule, InrPipe],
  templateUrl: './user-orders.component.html',
  styleUrl: './user-orders.component.css'
})
export class UserOrdersComponent implements OnInit {
  OrderDetails: any[] = []
  OrderItemDetails: any[] = []
  baseUrl: string = baseUrl

  constructor(private httpClient: HttpClientService, private loader: LoaderService) { }
  ngOnInit(): void {
    this.getUserOrderDetails()
  }

  getUserOrderDetails() {
    this.loader.show()
    this.httpClient.get<any[]>('user/GetOrderDetails', { OrderId: 0, Status: '' }).subscribe((res) => {
      if (res) {
        this.OrderDetails = res[0]
        this.OrderItemDetails = res[1]
        this.loader.hide()
      }
    })
  }

  downloadInvoice(orderId: number) {
    this.loader.show()
    this.httpClient.getBlob('user/GenerateInvoice', { OrderId: orderId }).subscribe(res => {
      const blob = new Blob([res], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'invoice.pdf';
      link.click();
      window.URL.revokeObjectURL(url);
      this.loader.hide()
    }); 
  }



}
