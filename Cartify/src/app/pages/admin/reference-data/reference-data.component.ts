import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientService } from '@/app/provider/services/http-client.service';
import { TableModule } from 'primeng/table';
import { ConfirmationDialogService } from '@/app/provider/services/confirmation-dialog.service';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RefDataChild } from '@/app/provider/interface/AdminInterface';
import { FloatLabel } from 'primeng/floatlabel';
import { ToastService } from '@/app/provider/services/toast.service';
import { InputTextModule } from 'primeng/inputtext';
import { LoaderService } from '@/app/provider/services/loader.service';


@Component({
  selector: 'app-reference-data',
  imports: [CommonModule, TableModule, FormsModule, ReactiveFormsModule,FloatLabel, InputTextModule],
  templateUrl: './reference-data.component.html',
  styleUrl: './reference-data.component.css', 
})
export class ReferenceDataComponent implements OnInit {
  GroupData: any[] = [];
  ChildData: any[] = [];
  ActiveGroup: string = ''
  ActiveGroupDesc: string = ''
  isAddPopUp: boolean = false
  AddRefCode: FormGroup
  RefDataChild: RefDataChild = new RefDataChild();
  isDisableCode: boolean = true

  constructor(private httpClient: HttpClientService, private ConfirmationService: ConfirmationDialogService, private fb: FormBuilder, private ToastService: ToastService, private LoaderService: LoaderService) {
    this.AddRefCode = this.fb.group({
      code: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.getAllGroupName()
  }

  getAllGroupName() {
    this.LoaderService.show()
    this.httpClient.get<any>('admin/GetAllGroupName').subscribe((res) => {
      if (res) {
        this.GroupData = res
        this.ActiveGroup = this.GroupData[0].GroupName
        this.ActiveGroupDesc = this.GroupData[0].GroupNameDesc
        this.getChildData(this.ActiveGroup)
        this.LoaderService.hide()
      }
    })
  }

  getChildData(GroupData: string) {
    this.LoaderService.show()
    this.ActiveGroup = GroupData
    this.ActiveGroupDesc = this.GroupData.find((r) => r.GroupName === GroupData)?.GroupNameDesc 
    this.httpClient.get<any>('admin/GetRefData', { GroupName: this.ActiveGroup }).subscribe((res) => {
      this.ChildData = res
      this.LoaderService.hide()
    })
  }

  onEdit(ChildData: any) { 
    console.log(ChildData)
    this.isAddPopUp = true
    this.isDisableCode = true
    this.RefDataChild.Code = ChildData.code.toString()
    this.RefDataChild.Description = ChildData.description.toString()
    this.RefDataChild.DispOrder = ChildData.displayOrder
    this.RefDataChild.CodeActive = ChildData.codeActive === 1 ? true : false
  }
  onDelete(ChildData: any) {
    this.ConfirmationService.confirm({
      title: 'Delete Confirmation',
      message: 'Are you sure you want to delete this item? This action cannot be undone.',
      confirmText: 'Delete',
      cancelText: 'Cancel'
    }).then((confirmed) => {
      if (confirmed) {
        console.log('Accepted');
      } else {
        console.log('Rejected');
      }
    });
  }

  addRefData() { 
    this.isAddPopUp = true
    this.isDisableCode = false
    this.RefDataChild = new RefDataChild()
  }
  closePopup(){
    this.isAddPopUp = false
    this.RefDataChild = new RefDataChild()
  }
  saveRefData() {  
    this.LoaderService.hide()
    this.isDisableCode = true
    this.RefDataChild.OpsMode = this.RefDataChild.Code === '' ? 'INSERT' : 'UPDATE'
    this.RefDataChild.CodeActive = this.RefDataChild.CodeActive === true ? 1 : 0 
    this.RefDataChild.GroupName = this.ActiveGroup
    this.httpClient.post<any>('admin/SaveRefData', this.RefDataChild).subscribe((res) =>{
      if(res.MessageType === 2){
        this.isAddPopUp = false
        this.getChildData(this.ActiveGroup)
        this.ToastService.show('Success', res.Message)
        this.LoaderService.hide()
      } else {
        this.ToastService.show('Error', res.Message)
        this.LoaderService.hide()
      }
    })
  }
}
