import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ToastService {
  toasts: any[] = [];
  delay: number = 3000

  show(header: string, body: string) {
    const classname = this.getIconClass(header.toLowerCase());
    const toast = { header, body, type :header.toLowerCase(), classname, closing: false };

    this.toasts.push(toast);

    setTimeout(() => this.startClose(toast), this.delay);
  }

  startClose(toast: any) {
    toast.closing = true;
    setTimeout(() => this.remove(toast), 500);
  }

  remove(toast: any) {
    this.toasts = this.toasts.filter(t => t !== toast);
  }

  private getIconClass(type: string): string {
    switch (type) {
      case 'success': return 'fa-check-circle';
      case 'error': return 'fa-times-circle';
      case 'info': return 'fa-info-circle';
      case 'warning': return 'fa-exclamation-circle';
      default: return 'fa-info-circle';
    }
  }
}
