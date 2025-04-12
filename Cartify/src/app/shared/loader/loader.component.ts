import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-loader',
    imports: [CommonModule],
    templateUrl: './loader.component.html',
    styleUrl: './loader.component.css'
})
export class LoaderComponent {
  @Input() isFullscreen: boolean = false;
  @Input() size: number = 50;
  @Input() color: string = '#3498db';
  @Input() text: string = '';
  @Input() textColor: string = '#333333';
}
