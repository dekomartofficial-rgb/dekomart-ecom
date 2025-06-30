import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BlockUrlService {
  private isHaveAccess: boolean = false
  constructor() { }

  giveAccess() {
    this.isHaveAccess = true
  }

  revokeAcess() {
    this.isHaveAccess = false
  }
  
  checkHaveAcess(): boolean {
    return this.isHaveAccess
  }
}
