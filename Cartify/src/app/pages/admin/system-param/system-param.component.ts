import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'system-parm',
  imports: [TableModule,InputTextModule,CommonModule],
  templateUrl: './system-param.component.html',
  styleUrl: './system-param.component.css'
})
export class SystemParamComponent {

}
