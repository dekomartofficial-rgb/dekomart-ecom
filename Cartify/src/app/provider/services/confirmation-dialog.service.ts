import { Injectable, ComponentRef, ApplicationRef, createComponent, EnvironmentInjector } from '@angular/core';
import { ConfirmationDialogComponent } from '@/app/shared/confirmation-dialog/confirmation-dialog.component'; 
import { ConfirmationDialogData } from '@/app/shared/confirmation-dialog/confirmation-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class ConfirmationDialogService {
  private dialogComponentRef: ComponentRef<ConfirmationDialogComponent> | null = null;

  constructor(
    private appRef: ApplicationRef,
    private injector: EnvironmentInjector
  ) {}

  /**
   * Opens a confirmation dialog
   * @param options Dialog configuration options
   * @returns Promise that resolves to true if confirmed, false otherwise
   */
  confirm(options: Partial<ConfirmationDialogData> = {}): Promise<boolean> {
    // Clean up any existing dialog
    this.destroyDialog();
    const dialogComponentRef = createComponent(ConfirmationDialogComponent, {
      environmentInjector: this.injector
    });
    
    document.body.appendChild(dialogComponentRef.location.nativeElement);
    this.appRef.attachView(dialogComponentRef.hostView);
    this.dialogComponentRef = dialogComponentRef;
    const result = dialogComponentRef.instance.open(options);
    result.then(() => this.destroyDialog());
    return result;
  }
  
  private destroyDialog(): void {
    if (this.dialogComponentRef) {
      this.appRef.detachView(this.dialogComponentRef.hostView);
      this.dialogComponentRef.location.nativeElement.remove();
      this.dialogComponentRef.destroy();
      this.dialogComponentRef = null;
    }
  }
}