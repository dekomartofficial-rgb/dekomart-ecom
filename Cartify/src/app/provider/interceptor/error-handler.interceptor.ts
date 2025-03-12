import {
  HttpInterceptorFn,
  HttpErrorResponse
} from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { ToastService } from '../../provider/services/toast.service';
import { Router } from '@angular/router';

export const ErrorHandlerInterceptor: HttpInterceptorFn = (req, next) => {
  const toastService = inject(ToastService);
  const router = inject(Router);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let errorMessage = 'An unexpected error occurred.';

      if (error.error instanceof ErrorEvent) {
        errorMessage = `Client Error: ${error.error.message}`;
      } else {
        // Server-side error
        switch (error.status) {
          case 400:
            errorMessage = 'Bad Request: Please check your input.';
            break;
          case 401:
            errorMessage = 'Unauthorized: Please log in again.';
            localStorage.clear()
            router.navigate(['']);
            break;
          case 403:
            errorMessage = 'Forbidden: You do not have permission.';
            router.navigate(['/access-denied']);
            break;
          case 404:
            errorMessage = 'Not Found: The requested resource does not exist.';
            router.navigate(['']);
            break;
          case 500:
            errorMessage = 'Server Error: Please try again later.';
            break;
          default:
            errorMessage = `Error ${error.status}: ${error.message}`;
        }
      }

      // Show error message
      toastService.showError("Server Error", errorMessage);

      // Log error for debugging
      console.error('HTTP Error:', error);

      // Return an error observable
      return throwError(() => error);
    })
  );
};