import { Component, OnInit } from '@angular/core';
import { HttpClientService } from '@/app/provider/services/http-client.service';
import { CommonService } from '@/app/provider/services/common.service';
import { Role } from '@/app/provider/interface/AdminInterface';

@Component({
  selector: 'app-role-access',
  standalone: true,
  imports: [],
  templateUrl: './role-access.component.html',
  styleUrl: './role-access.component.css'
})
export class RoleAccessComponent implements OnInit {
  Role: Role[] = [];

  constructor(private httpClient: HttpClientService, private commonService: CommonService) { }

  ngOnInit() {
    this.getRole()
  }

  getRole() {
    this.commonService.getRole().subscribe((res) => {
      this.Role = res
    })
  }
}
