import { AbstractControl, FormGroup, ValidatorFn } from '@angular/forms';

export function ComparePasswordsValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: boolean } | null => {
    const password = control.get('newPasswordID')?.value;
    const comparePassword = control.get('repeatPasswordID')?.value;
    return password === comparePassword ? null : { compareError: true };
  };
}
