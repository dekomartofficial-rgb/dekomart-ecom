import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { baseUrl } from '../../../assets/config.json'
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

  getBlob(endpoint: string, params?: { [key: string]: any }): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/${endpoint}`, {
      params,
      responseType: 'blob' as 'blob'
    });
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

  getUserData() {
    let userData = localStorage.getItem('userData');
    return !!userData ? JSON.parse(userData) : null;
  }
  getToken() {
    var getJson = localStorage.getItem('userData')
    if (getJson) {
      const parsedData = JSON.parse(getJson)
      return parsedData.Token
    }
  }

  LogOut() {
    localStorage.removeItem('userData');
    this.Router.navigate(['/'])
  }

  isLoggedIn() {
    if (this.getUserId()) {
      return true
    }
    return false
  }

  getUserRole(UserId: number) {
    return this.get<any>('user/GetUserRole', { UserId: UserId })
  }

  isAdmin(): Boolean {
    let userData = this.getUserData()
    return userData && userData.UserRole !== 'US'
  }
}
