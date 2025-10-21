import { Component, OnInit } from '@angular/core';
import { HttpClientService } from '@/app/provider/services/http-client.service';
import { CommonService } from '@/app/provider/services/common.service';
import { Role, RoleScreen } from '@/app/provider/interface/AdminInterface';
import { FormsModule } from '@angular/forms';
import { ToastService } from '@/app/provider/services/toast.service';
import { LoaderService } from '@/app/provider/services/loader.service';

interface RoleRight {
  ROLE_CODE: string;
  SCREEN_CODE: string;
  IS_HAVE_ACCESS: number;
}
 
@Component({
    selector: 'app-role-access',
    imports: [FormsModule],
    templateUrl: './role-access.component.html',
    styleUrl: './role-access.component.css'
})
export class RoleAccessComponent implements OnInit {
  clickedRole: string = '';
  clickGroupName: string = '';
  RoleCode: string = ''
  ScreenCode: string = ''
  IshaveAcess: number = 0
  showCildDropDown: boolean = true;
  Role: Role[] = [];
  RoleScreen: RoleScreen[] = [];
  RoleRight: RoleRight[] = [];
  groupName: any[] = [];
  GroupChildList: any[] = [];


  constructor(private httpClient: HttpClientService, private commonService: CommonService, private toastService: ToastService, private LoaderService: LoaderService) { }

  ngOnInit() {
    this.getRole();
  }

  getRole() {
    this.LoaderService.show()
    this.commonService.getRole().subscribe((res) => {
      if (res && res.length > 0) {
        this.Role = res;
        this.clickedRole = this.Role[0].RoleCode;
        this.getRoleScreen(this.clickedRole);
        this.LoaderService.hide()
      }
    });
  }

  getRoleScreen(rolecode: string) {
    this.LoaderService.show()
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
          this.GroupChildList = [...this.RoleScreen];
          this.LoaderService.hide()
        }
      });
    }
  }
  updateAccess(event: any, index: number) {
    if (this.GroupChildList && this.GroupChildList[index]) {
      this.GroupChildList[index].IsAccess = event.target.checked === true ? 'true' : 'false';
    }
  }
  addRole() {
    this.toastService.show('Info', 'We Will Add Soon');
  }
  saveRole() {
    this.RoleRight = this.GroupChildList
      .map(item => ({
        ROLE_CODE: item.RoleCode,
        SCREEN_CODE: item.ScreenCode,
        IS_HAVE_ACCESS: item.IsAccess === 'true' ? 1 : 0
      }));

    this.httpClient.post<any>('admin/SaveRoleRight', { RoleRight: this.RoleRight }).subscribe({
      next: (res) => {
        if (res.MessageType === 2) {
         this.toastService.show('Success', res.Message);
          this.getRole();
        } else {
          this.toastService.show('Error', res.Message);
        }
      },
      error: (err) => {
        this.toastService.show('Error', err);
      }
    })
  }
}
