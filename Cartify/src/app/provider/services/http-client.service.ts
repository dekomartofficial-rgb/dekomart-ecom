import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { baseUrl } from '../../assets/config.json'
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {
  private baseUrl = baseUrl

  constructor(private http: HttpClient, private Router: Router) { }

  get<T>(endpoint: string, params?: { [key: string]: string | number | boolean }): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}/${endpoint}`, { params });
  }

  post<T>(endpoint: string, body: any): Observable<T> {
    return this.http.post<T>(`${this.baseUrl}/${endpoint}`, body);
  }

  getUserId() {
    var getJson = localStorage.getItem('userData')
    if (getJson) {
      const parsedData = JSON.parse(getJson)
      return parsedData.UserId
    }
  }

  getToken() {
    var getJson = localStorage.getItem('userData')
    if (getJson) {
      const parsedData = JSON.parse(getJson)
      return parsedData.Token
    }
  }

  LogOut() {
    localStorage.clear();
    this.Router.navigate(['/'])
  }

  isLoggedIn() {
    if (this.getUserId()) {
      return true
    }
    return false
  }
}
