import { Component, OnInit } from '@angular/core';
import { InrPipe } from "../../../provider/pipe/inr.pipe";
import { ConfirmationDialogService } from '@/app/provider/services/confirmation-dialog.service';
import { HttpClientService } from '@/app/provider/services/http-client.service';
import { LoaderService } from '@/app/provider/services/loader.service';
import { ToastService } from '@/app/provider/services/toast.service';
import { baseUrl } from '../../../../assets/config.json'
import { CommonModule } from '@angular/common';
import { MoveToStep } from '@/app/provider/class/UserClass';
import { FormsModule } from '@angular/forms';



@Component({
  selector: 'app-orders-details',
  imports: [InrPipe, CommonModule, FormsModule],
  templateUrl: './orders-details.component.html',
  styleUrl: './orders-details.component.css'
})
export class OrdersDetailsComponent implements OnInit {
  StepperData: any[] = []
  ButtonData: any[] = []
  ProductDetails: any[] = []
  OrderDetails: any[] = []
  OrderDetails2: any[] = []
  ShippingAddress: any[] = []
  FlagDetails: any[] = []
  baseUrl: string = baseUrl
  MoveToStep: MoveToStep = new MoveToStep()


  constructor(private _messageservice: ToastService, private loader: LoaderService, private httpService: HttpClientService, private ConfirmationService: ConfirmationDialogService) { }
  ngOnInit(): void {
    const OrderId = history.state['OrderId'];
    if (OrderId ?? OrderId > 0) {
      this.MoveToStep.OrderId = OrderId
      this.getOrderDetails(OrderId)
    }

  }

  getOrderDetails(OrderId: number) {
    this.loader.show()
    this.httpService.get<any[]>('admin/GetOrderDetails', { OrderId: OrderId }).subscribe((res) => {
      this.StepperData = res[0]
      this.ButtonData = res[1]
      this.ProductDetails = res[2]
      this.OrderDetails = res[3]
      this.OrderDetails2 = res[4]
      this.ShippingAddress = res[5]
      this.FlagDetails = res[6]
      this.MoveToStep.DeliveryAgnetNumber = this.FlagDetails[0]?.DeliveryAgentNumber
      this.MoveToStep.ExpDeliveryDate = this.FlagDetails[0]?.ExpectedDeliverDate
      console.log(this.MoveToStep)
      this.loader.hide()
    })
  }

  moveToStep(btnmode: string) {
    this.loader.show()
    this.MoveToStep.OpsMode = btnmode
    this.httpService.post('admin/MoveToNextStep', this.MoveToStep).subscribe((res: any) => {
      if (res.MessageType === 2) {
        this._messageservice.show('Success', res.Message);
        this.getOrderDetails(this.MoveToStep.OrderId)
        this.loader.hide()
      } else {
        this._messageservice.show('Error', res.Message);
        this.loader.hide()
      }
    })
  }

}
