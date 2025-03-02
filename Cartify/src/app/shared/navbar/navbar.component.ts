import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, RouterLink, RouterLinkActive } from '@angular/router';
import { HttpClientService } from '../../provider/services/http-client.service';
import { ScreenList } from '../../provider/interface/AdminInterface';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  ScreenList: ScreenList[] = [];
  activeUrl: string = '';
  expandedGroups: { [key: string]: boolean } = {};
  isCollapsed = false;
  activeHeader: string | null = null;

  constructor(private router: Router, private httpClient: HttpClientService) { }

  ngOnInit(): void {
    this.httpClient.get<any>('admin/GetScreenList').subscribe((res) => {
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
      console.log(this.ScreenList);
    });
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
}
