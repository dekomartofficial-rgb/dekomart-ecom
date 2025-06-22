import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'inr'
})
export class InrPipe implements PipeTransform {

  transform(value: number | string, showDecimals: boolean = true): string {
    if (value == null || value === '') return '₹0.00';

    let amount = parseFloat(value.toString());
    let formatted = showDecimals
      ? amount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
      : amount.toLocaleString('en-IN', { maximumFractionDigits: 0 });

    return `₹${formatted}`;
  }

}
