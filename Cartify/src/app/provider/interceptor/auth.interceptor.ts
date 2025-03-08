import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { HttpClientService } from '../services/http-client.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const httpClient = inject(HttpClientService);
  const token = httpClient.getToken();
  
  if (token) {
    const clonedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
        WindowPath : window.location.pathname,
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    });
    return next(clonedReq);
  }

  return next(req);
};