import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface ConfirmationDialogData {
  title: string;
  message: string;
  confirmText: string;
  cancelText: string;
  closeOnOverlayClick: boolean;
}

@Component({
  standalone: true,
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.css'],
  imports: [CommonModule]
})
export class ConfirmationDialogComponent implements OnInit, OnDestroy {
  isVisible = false;
  dialogData: ConfirmationDialogData = {
    title: 'Confirm Action',
    message: 'Are you sure you want to proceed?',
    confirmText: 'Confirm',
    cancelText: 'Cancel',
    closeOnOverlayClick: true
  };

  private resolveRef: ((result: boolean) => void) | null = null;

  constructor() { }

  ngOnInit(): void { }

  ngOnDestroy(): void { 
    if (this.resolveRef) {
      this.resolveRef(false);
      this.resolveRef = null;
    }
  }

  open(data: Partial<ConfirmationDialogData> = {}): Promise<boolean> { 
    this.dialogData = { ...this.dialogData, ...data };
    this.isVisible = true;

    return new Promise<boolean>(resolve => {
      this.resolveRef = resolve;
    });
  }

  close(result: boolean): void {
    this.isVisible = false;
    if (this.resolveRef) {
      this.resolveRef(result);
      this.resolveRef = null;
    }
  }

  onOverlayClick(event: MouseEvent): void {
    if (this.dialogData.closeOnOverlayClick && event.target === event.currentTarget) {
      this.close(false);
    }
  }
}