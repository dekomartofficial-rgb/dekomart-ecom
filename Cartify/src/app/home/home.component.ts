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

  ngOnInit(): void {
    this.http.post('user/Validateuser', { AppUserId: 'sinanruzz9@gmail.com', Password: '123456', AuthType: 'W' }).subscribe((res) => {
      console.log(res)
    })
  }
}
