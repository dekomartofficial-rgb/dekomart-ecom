import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { HttpClientService } from '@/app/provider/services/http-client.service';
import { TableModule } from 'primeng/table';
import { Table } from 'primeng/table';
import { SortEvent } from 'primeng/api';

@Component({
  selector: 'app-reference-data',
  standalone: true,
  imports: [CommonModule, TableModule],
  templateUrl: './reference-data.component.html',
  styleUrl: './reference-data.component.css'
})
export class ReferenceDataComponent implements OnInit {
  GroupData: any[] = [];
  ChildData: any[] = [];
  ActiveGroup: string = ''
  ActiveGroupDesc: string = ''
  constructor(private httpClient: HttpClientService) { }

  ngOnInit() {
    this.getAllGroupName()
  }

  getAllGroupName() {
    this.httpClient.get<any>('admin/GetAllGroupName').subscribe((res) => {
      this.GroupData = res
      this.ActiveGroup = this.GroupData[0].GroupName
      this.ActiveGroupDesc = this.GroupData[0].GroupNameDesc
      this.getChildData(this.ActiveGroup)
      console.log(this.ActiveGroup)
    })
  }

  getChildData(GroupData: string) {
    this.ActiveGroup = GroupData
    this.ActiveGroupDesc = this.GroupData.find((r) => r.GroupName === GroupData)?.GroupNameDesc

    this.httpClient.get<any>('admin/GetRefData', { GroupName: this.ActiveGroup }).subscribe((res) => {
      this.ChildData = res
    })
  }

  
}
