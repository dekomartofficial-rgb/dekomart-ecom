import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { Observable } from 'rxjs';
import { baseUrl } from '../../assets/config.json'

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {
  private baseUrl = baseUrl 

  constructor(private http: HttpClient) { }
  
  get<T>(endpoint: string): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}/${endpoint}`);
  }

  post<T>(endpoint: string, body: any): Observable<T> {
    return this.http.post<T>(`${this.baseUrl}/${endpoint}`, body);
  }

 
}
