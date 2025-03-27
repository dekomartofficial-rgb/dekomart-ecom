import { Injectable } from '@angular/core';
import { HttpClientService } from './http-client.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private http: HttpClientService) { }

  getRole(): Observable<any> {
    return this.http.get<any>('admin/GetRole');
  }

}
