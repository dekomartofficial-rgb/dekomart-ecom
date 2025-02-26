import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, RouterLink, RouterLinkActive } from '@angular/router';
import { HttpClientService } from '../../provider/services/http-client.service'


interface NavChild {
  name: string;
  url: string;
  icon?: string;
}

interface NavItem {
  header: string;
  icon: string;
  children: NavChild[];
  isCollapsed: boolean;
}


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule,RouterModule, RouterLink, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})


export class NavbarComponent {
  groupName: any;
  constructor(private router: Router, private httpClient : HttpClientService) { }

  ngOnInit(): void {
    this.httpClient.get('admin/GetScreenList').subscribe((res) => {
      
    })
  }

  activeHeader: string | null = null;

  navItems: NavItem[] = [
    {
      header: 'Dashboard',
      icon: 'bi-speedometer2',
      children: [
        { name: 'Analytics', url: '/dashboard/analytics', icon: 'bi-graph-up' },
        { name: 'Reports', url: '/dashboard/reports', icon: 'bi-file-text' },
        { name: 'Statistics', url: '/dashboard/statistics', icon: 'bi-bar-chart' }
      ],
      isCollapsed: true
    },
    {
      header: 'User Management',
      icon: 'bi-people',
      children: [
        { name: 'Profile', url: '/user/profile', icon: 'bi-person' },
        { name: 'Settings', url: '/user/settings', icon: 'bi-gear' },
        { name: 'Logout', url: '/auth/logout', icon: 'bi-box-arrow-right' }
      ],
      isCollapsed: true
    },
    {
      header: 'Content',
      icon: 'bi-file-earmark-text',
      children: [
        { name: 'Articles', url: '/content/articles', icon: 'bi-file-text' },
        { name: 'Media', url: '/content/media', icon: 'bi-images' },
        { name: 'Comments', url: '/content/comments', icon: 'bi-chat-dots' }
      ],
      isCollapsed: true
    }
  ];

  onHeaderClick(clickedItem: NavItem): void {
    // Close all other sections
    this.navItems.forEach(item => {
      if (item !== clickedItem) {
        item.isCollapsed = true;
      }
    });

    // Toggle clicked section
    clickedItem.isCollapsed = !clickedItem.isCollapsed;

    // Set active header
    this.activeHeader = clickedItem.isCollapsed ? null : clickedItem.header;

    // If expanding, navigate to first child
    if (!clickedItem.isCollapsed && clickedItem.children.length > 0) {
      this.router.navigate([clickedItem.children[0].url]);
    }
  }

  isActive(url: string): boolean {
    return this.router.url === url;
  }
}