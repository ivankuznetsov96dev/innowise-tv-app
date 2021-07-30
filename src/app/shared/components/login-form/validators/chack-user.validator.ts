import { AbstractControl } from '@angular/forms';
import { map } from 'rxjs/operators';
import { AccountResponceModel } from '../../../interfaces/account-responce.model';

export function CheckUserAtLoginValidator(this: any, control: AbstractControl) {
  return this.checkUserUnique(control.value).pipe(
    map((response: AccountResponceModel) => {
      return response.name ? null : { error: true };
    }),
  );
}

export function CheckUserAtRegistrationValidator(this: any, control: AbstractControl) {
  return this.checkUserUnique(control.value).pipe(
    map((response: AccountResponceModel) => {
      return response.name ? { error: true } : null;
    }),
  );
}
