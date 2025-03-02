import { Component } from '@angular/core';
import { HttpClientService } from '../provider/services/http-client.service'
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  constructor(private http: HttpClientService) { }

}
