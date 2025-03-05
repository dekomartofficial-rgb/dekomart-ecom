import { Component } from '@angular/core';
import { NavbarComponent } from "../../../shared/navbar/navbar.component";

@Component({
  selector: 'app-admin-home',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './admin-home.component.html',
  styleUrl: './admin-home.component.css'
})
export class AdminHomeComponent {

}
