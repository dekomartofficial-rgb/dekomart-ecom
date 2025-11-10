import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'safestringhtml'
})
export class SafestringhtmlPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) { }

  transform(value: string) {
    console.log(this.sanitizer.bypassSecurityTrustHtml(value))
    return this.sanitizer.bypassSecurityTrustHtml(value);
  }

}
