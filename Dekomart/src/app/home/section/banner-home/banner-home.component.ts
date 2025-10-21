import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'app-banner-home',
    templateUrl: './banner-home.component.html',
    imports: [CommonModule, ButtonModule],
    styleUrls: ['./banner-home.component.css']
})
export class BannerHomeComponent {

}
