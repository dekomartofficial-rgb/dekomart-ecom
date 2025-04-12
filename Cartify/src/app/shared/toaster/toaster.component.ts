import { Component, OnInit } from '@angular/core';
import { ToastService } from '../../provider/services/toast.service';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-toaster',
    imports: [CommonModule],
    templateUrl: './toaster.component.html',
    styleUrl: './toaster.component.css'
})
export class ToasterComponent {
  constructor(public toastService: ToastService) { } 

}
