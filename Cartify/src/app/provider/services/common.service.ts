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

  getRefGroupData(groupName: string): Observable<any> {
    return this.http.get<any>('admin/GetRefGroupData', { GroupName: groupName });
  }

  getLightColour(hex: string, percent: number): string {
    hex = hex.replace(/^#/, '');

    if (hex.length === 3) {
      hex = hex.split('').map(c => c + c).join('');
    }

    const num = parseInt(hex, 16);
    const r = Math.min(255, (num >> 16) + Math.round(255 * percent));
    const g = Math.min(255, ((num >> 8) & 0x00FF) + Math.round(255 * percent));
    const b = Math.min(255, (num & 0x0000FF) + Math.round(255 * percent));

    return `#${(r << 16 | g << 8 | b).toString(16).padStart(6, '0')}`;
  }

  getDocument(KeyId: number, KeyType: string): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this.http.get<any[]>('admin/GetDocument', { KeyId: KeyId, KeyType: KeyType }).subscribe({
        next: (response) => {
          const baseUrl = 'http://localhost:3000/';
          const updatedDocs = response.map(doc => {
            if (doc.docPath && !doc.docPath.startsWith('http')) {
              doc.docPath = baseUrl + doc.docPath;
            }
            return doc;
          });
          resolve(updatedDocs);
        },
        error: (error) => reject(error)
      });
    });
  }



}
