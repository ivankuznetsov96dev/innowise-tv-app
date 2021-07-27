import { AbstractControl, ValidatorFn } from '@angular/forms';

export function EmailValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: boolean } | null => {
    const regEx: RegExp = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/;
    const valid = !control.value || regEx.test(control.value);
    return valid ? null : { invalidEmail: true };
  };
}
