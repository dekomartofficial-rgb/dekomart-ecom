import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, RouterLink } from '@angular/router';
import { HttpClientService } from '../../provider/services/http-client.service';
import { ScreenList } from '../../provider/interface/AdminInterface';



@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterLink,],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  ScreenList: ScreenList[] = [];
  activeUrl: string = '';
  expandedGroups: { [key: string]: boolean } = {};
  isCollapsed = false;
  activeHeader: string | null = null;
  UserId: number = 0;
  constructor(private router: Router, private httpClient: HttpClientService) { }

  ngOnInit(): void {
    this.UserId = this.httpClient.getUserId();
    this.GetScreenList() 
  }

  GetScreenList() {
    if (this.UserId) {
      this.httpClient.get<any>('admin/GetScreenList', { UserId: this.UserId }).subscribe((res) => {
        this.ScreenList = res.groupName.map((GroupName: any) => {
          return {
            GroupName: GroupName.GroupName,
            GroupIcon: GroupName.GroupIcon,
            IsHaveChild: GroupName.IsHaveChild,
            Children: res.screenList.filter((child: any) => {
              return child.GroupName === GroupName.GroupName;
            })
          }
        });
      });

    }
  }

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }

  toggleGroup(groupName: string) {
    this.expandedGroups[groupName] = !this.expandedGroups[groupName];
  }

  isGroupExpanded(groupName: string): boolean {
    return this.expandedGroups[groupName] === true;
  }

  setActive(url: string) {
    this.activeUrl = url;
  }

  isActive(url: string): boolean {
    return this.activeUrl === url;
  }
  Logout() {
    this.httpClient.LogOut()
  }


}
