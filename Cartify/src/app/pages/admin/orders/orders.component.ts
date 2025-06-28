import { Component, OnInit } from '@angular/core';
import { DatePickerModule } from 'primeng/datepicker';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { LoaderService } from '@/app/provider/services/loader.service';
import { InrPipe } from "../../../provider/pipe/inr.pipe";
import { Router } from '@angular/router';
import { HttpClientService } from '@/app/provider/services/http-client.service';
import { CommonModule } from '@angular/common';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'app-orders',
  imports: [DatePickerModule, AutoCompleteModule, InrPipe, CommonModule, TooltipModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent implements OnInit {
  OrderList: any[] = []
  constructor(private httpClient: HttpClientService, private loader: LoaderService, private router: Router,) { }
  ngOnInit(): void {
    this.getAllUserOrder()
  }

  getAllUserOrder() {
    this.loader.show()
    this.httpClient.get<any[]>('admin/GetAllUserOrder').subscribe((res) => {
      if (res) {
        this.OrderList = res[0]
        this.loader.hide()
      }
    })
  }

  reDirectToDetails(OrderID: Number) {
    this.router.navigate(['/admin/orders-detials'], { state: { OrderId: OrderID } });
  }
}
