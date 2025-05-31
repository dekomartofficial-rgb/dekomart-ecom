import { Component , OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { HttpClientService } from '@/app/provider/services/http-client.service';
import { LoaderService } from '@/app/provider/services/loader.service';
import { FormsModule } from '@angular/forms'; // Needed for [(ngModel)]

@Component({
  selector: 'system-parm',
  imports: [TableModule,InputTextModule,CommonModule, DialogModule, CheckboxModule, ButtonModule, FormsModule],
  templateUrl: './system-param.component.html',
  styleUrl: './system-param.component.css'
})
export class SystemParamComponent implements OnInit {
isEditPopupVisible = false;
sysData: any[] = [];
sysParmChild: any = {};

// constructor(private httpClient: HttpClientService, private LoaderService: LoaderService) {
//   this.sysParmChild = {
//     code: '',
//     description: '',
//     displayOrder: 0,
//     codeActicveDesc: '',
//     status: 0
//   }}
ngOnInit() {
    this. getParmData() 
  }
 getParmData() {
    // this.LoaderService.show()
    // this.httpClient.get<any>('admin/GetSysParm').subscribe((res) => {
    //   this.sysData = res
    //   this.LoaderService.hide()
    // })
  }


systemParams = [
    {
      code: 'Param1',
      description: 'Value for Param1',
      displayOrder: 1,
      codeActicveDesc: 'Active',
      status: 0  
    },
    {
      code: 'Param2',
      description: 'Value for Param2',
      displayOrder: 2,
      codeActicveDesc: 'Inactive',
      status: 1
    }
  ];

 onEdit(childData: any) {
  console.log('Editing row:', childData);
  this.sysParmChild = { ...childData }; 
  this.isEditPopupVisible = true;       
}

saveEdit() {
  const index = this.systemParams.findIndex(item => item.code === this.sysParmChild.code);
  if (index > -1) {
    this.systemParams[index] = { ...this.sysParmChild };
    this.isEditPopupVisible = false;
  }
}
closePopup() {
  this.isEditPopupVisible = false;
  
}


}
