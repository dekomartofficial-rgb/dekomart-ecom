import { Component, OnInit } from '@angular/core';
import { HttpClientService } from '@/app/provider/services/http-client.service';
import { CommonService } from '@/app/provider/services/common.service';
import { Role, RoleScreen } from '@/app/provider/interface/AdminInterface';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-role-access',
  standalone: true,
  imports: [FormsModule],  
  templateUrl: './role-access.component.html',
  styleUrl: './role-access.component.css'
})
export class RoleAccessComponent implements OnInit {
  Role: Role[] = [];
  RoleScreen: RoleScreen[] = [];
  groupName: any[] = [];
  GroupChildList: any[] = [];
  clickedRole: string = '';
  showCildDropDown: boolean = false;
  clickGroupName: string = '';

  constructor(private httpClient: HttpClientService, private commonService: CommonService) {}

  ngOnInit() {
    this.getRole();
  }

  getRole() {
    this.commonService.getRole().subscribe((res) => {
      if (res && res.length > 0) {
        this.Role = res;
        this.clickedRole = this.Role[0].RoleCode;
        this.getRoleScreen(this.clickedRole);
      }
    });
  }

  getRoleScreen(rolecode: string) {
    this.clickedRole = rolecode;
    this.groupName = [];
    this.GroupChildList = [];
    
    if (rolecode) {
      this.httpClient.get<any[]>('admin/GetScreenRoleAccess', { RoleCode: rolecode }).subscribe((res) => {
        if (res && res.length > 0) {
          this.RoleScreen = res;
          this.groupName = [...new Set(
            this.RoleScreen.map((item) => JSON.stringify({ ScreenGroupName: item.ScreenGroupName, GroupIcon: item.GroupIcon }))
          )].map(item => JSON.parse(item));
        }
      });
    }
  }

  onShowChild(groupname: string) { 
    this.showCildDropDown = true;
    this.clickGroupName = groupname;
    this.GroupChildList = this.RoleScreen.filter(item => item.ScreenGroupName === this.clickGroupName);
  }

  updateAccess(event: any, item: any) {
    item.IsAccess = event.target.checked ? 'true' : 'false';
  }

  saveRole() {
    const selectedScreens = this.GroupChildList
      .filter(item => item.IsAccess === 'true')
      .map(item => item.WindowName);

    console.log('Selected Screens:', selectedScreens);

    // Send selectedScreens to API
  }
}
