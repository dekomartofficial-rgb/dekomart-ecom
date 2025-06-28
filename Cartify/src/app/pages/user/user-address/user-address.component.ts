import { Component, OnInit } from '@angular/core';
import { Checkbox } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserAddress } from '@/app/provider/class/UserClass';
import { CommonService } from '@/app/provider/services/common.service';
import { DropdownModule } from 'primeng/dropdown';
import { HttpClientService } from '@/app/provider/services/http-client.service';
import { LoaderService } from '@/app/provider/services/loader.service';
import { ToastService } from '@/app/provider/services/toast.service';
import { ConfirmationDialogService } from '@/app/provider/services/confirmation-dialog.service';


@Component({
  selector: 'app-user-address',
  imports: [Checkbox, FormsModule, CommonModule, DropdownModule],
  templateUrl: './user-address.component.html',
  styleUrl: './user-address.component.css'
})
export class UserAddressComponent implements OnInit {
  popupOverlay: boolean = false
  UserAddress: UserAddress = new UserAddress()
  UserAddressDetails: any[] = []
  isSubmitted = true;
  State: any[] = []

  ngOnInit(): void {
    this.GetRefData()
    this.GetUserAddress()
  }
  constructor(private commonService: CommonService, private http: HttpClientService, private Loader: LoaderService, private _messageservice: ToastService, private ConfirmationService: ConfirmationDialogService) { }

  GetRefData() {
    this.commonService.getRefGroupData('STATE').subscribe({
      next: (res: any[]) => {
        this.State = res
      }
    });
  }
  OpenPopup() {
    this.popupOverlay = true
  }
  ClosePopup() {
    this.UserAddress = new UserAddress()
    this.popupOverlay = false
    this.GetUserAddress()
  }

  GetUserAddress() {
    this.Loader.show()
    this.http.get<any[]>('user/GetUserAddress', { AddressId: this.UserAddress.AddressId ?? 0 }).subscribe({
      next: (res) => {
        this.UserAddressDetails = res[0]
        if (this.UserAddress.AddressId > 0) {
          this.UserAddress.FullName = this.UserAddressDetails[0]?.FullName
          this.UserAddress.MobileNumber = this.UserAddressDetails[0]?.MobileNumber
          this.UserAddress.Pincode = this.UserAddressDetails[0]?.Pincode
          this.UserAddress.AddressId = this.UserAddressDetails[0]?.AddressId
          this.UserAddress.AreaStrtVillage = this.UserAddressDetails[0]?.AreaStreetVillage
          this.UserAddress.CityTown = this.UserAddressDetails[0]?.CityTown
          this.UserAddress.Country = this.UserAddressDetails[0]?.Country
          this.UserAddress.FlatHouseBuildCompany = this.UserAddressDetails[0]?.FlatHouseBuildCompany
          this.UserAddress.LandMark = this.UserAddressDetails[0]?.LandMark
          this.UserAddress.State = this.UserAddressDetails[0]?.State
          this.UserAddress.IsDefualt = this.UserAddressDetails[0]?.IsPermanet
        }
        this.Loader.hide()
      },
      error: (err) => {
        this._messageservice.show('Error', err)
      }
    })
  }

  UpdateAddress(id: number) {
    this.UserAddress.AddressId = id
    this.GetUserAddress()
    this.OpenPopup()
  }

  SaveUserAddress() {
    this.Loader.show()
    this.UserAddress.OpsMode = this.UserAddress.AddressId === 0 ? 'INSERT' : 'UPDATE'
    this.http.post('user/SaveUserAddress', this.UserAddress).subscribe((res: any) => {
      if (res.MessageType === 2) {
        this._messageservice.show('Success', res.Message);
        this.UserAddress = new UserAddress()
        this.GetUserAddress()
        this.ClosePopup()
        this.Loader.hide()
      } else {
        this._messageservice.show('Error', res.Message);
        this.Loader.hide()
      }
    });
  }

  DeleteUserAddress(id: number) {
    this.ConfirmationService.confirm({
      title: 'Delete Confirmation',
      message: 'Are you sure you want to delete this Address? This Address cannot be undone.',
      confirmText: 'Delete',
      cancelText: 'Cancel'
    }).then((confirmed) => {
      if (confirmed) {
        if (id > 0) {
          this.UserAddress.AddressId = id
          this.UserAddress.OpsMode = 'DELETE'
          this.http.post('user/SaveUserAddress', this.UserAddress).subscribe((res: any) => {
            if (res.MessageType === 2) {
              this._messageservice.show('Success', res.Message);
              this.UserAddress = new UserAddress()
              this.GetUserAddress()
              this.Loader.hide()
            } else {
              this._messageservice.show('Error', res.Message);
              this.Loader.hide()
            }
          });
        }
      } else {
        console.log('Rejected');
      }
    });

  }
}
