import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import { importProvidersFrom } from '@angular/core';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import Aura from '@primeng/themes/aura';
import { routes } from './app.routes';
import { ErrorHandlerInterceptor } from './provider/interceptor/error-handler.interceptor';
import { authInterceptor } from './provider/interceptor/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(
      withInterceptors([ErrorHandlerInterceptor, authInterceptor]), 
    ),
    provideRouter(routes),
    provideAnimationsAsync(),
    providePrimeNG({ theme: { preset: Aura } }),
    importProvidersFrom(ToastModule),
    MessageService,
    importProvidersFrom(BrowserAnimationsModule), 
  ]
};