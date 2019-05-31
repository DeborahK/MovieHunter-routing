import { AbstractControl, ValidatorFn } from '@angular/forms';

export class NumberValidators {

  static rangeHardCoded(c: AbstractControl): { [key: string]: boolean } | null {
    if (c.value && (isNaN(c.value) || c.value < 1 || c.value > 5)) {
      return { range: true };
    }
    return null;
  }





  static range(min: number, max: number): ValidatorFn {
    return (c: AbstractControl): { [key: string]: boolean } | null => {
      if (c.value && (isNaN(c.value) || c.value < min || c.value > max)) {
        return { range: true };
      }
      return null;
    };
  }
}
