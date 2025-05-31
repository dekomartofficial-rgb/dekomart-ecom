import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms'; // Needed for [(ngModel)]

@Component({
  selector: 'system-parm',
  imports: [TableModule,InputTextModule,CommonModule, DialogModule, CheckboxModule, ButtonModule, FormsModule],
  templateUrl: './system-param.component.html',
  styleUrl: './system-param.component.css'
})
export class SystemParamComponent {
isEditPopupVisible = false;
sysParmChild: any = {};

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
