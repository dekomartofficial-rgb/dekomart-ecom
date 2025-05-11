import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import { importProvidersFrom } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import Aura from '@primeng/themes/aura';
import { routes } from './app.routes';
import { ErrorHandlerInterceptor } from './provider/interceptor/error-handler.interceptor';
import { authInterceptor } from './provider/interceptor/auth.interceptor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimationsAsync(),
    provideHttpClient(
      withInterceptors([ErrorHandlerInterceptor, authInterceptor]),
    ),
    provideRouter(routes),
    providePrimeNG({ theme: { preset: Aura } }),
    importProvidersFrom(NgbModule),
    importProvidersFrom(ToastModule),
    importProvidersFrom(FormsModule, ReactiveFormsModule), // Add this line
    MessageService,
    importProvidersFrom(BrowserAnimationsModule),
    providePrimeNG({
      theme: { preset: Aura, options: { darkModeSelector: '.p-dark' } },
    }),
  ],
};