import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { of, Subject } from 'rxjs';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  switchMap,
  tap,
} from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';
import { AccountResponceModel } from '../../interfaces/account-responce.model';

@Component({
  selector: 'app-register-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginFormComponent implements OnInit {
  public loginAndRegisterForm!: FormGroup;

  public inputSubject$: Subject<string> = new Subject();

  public errorFlag = false;

  public userExistFlag = false;

  constructor(private fb: FormBuilder, private dialog: MatDialog, private cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.initForm();
    const url = 'https://api.persik.by/v2/auth/check?email=';
    this.inputSubject$
      .pipe(
        debounceTime(600),
        filter((value: string) => value.length > 3),
        distinctUntilChanged(),
        switchMap((value: string) =>
          ajax.getJSON<AccountResponceModel>(url + value).pipe(
            catchError(() => {
              this.errorFlag = true;
              this.cd.detectChanges();
              return of('some error');
            }),
            tap(() => console.log(value)),
          ),
        ),
        tap((data: AccountResponceModel | any) => {
          console.log(data);
          this.errorFlag = false;
          if (!data.exists) {
            console.log('this user does not exist');
            this.userExistFlag = true;
            return;
          }
          this.userExistFlag = false;
          this.cd.detectChanges();
        }),
      )
      .subscribe();
  }

  private initForm() {
    this.loginAndRegisterForm = this.fb.group({
      loginID: [
        null,
        [Validators.required, Validators.email, Validators.minLength(10), Validators.maxLength(25)],
      ],
      passwordID: [null, [Validators.required, Validators.minLength(6), Validators.maxLength(15)]],
    });
  }

  public isControlInvalid(controlName: string): boolean {
    const control = this.loginAndRegisterForm.controls[controlName];
    const result = control.invalid && control.touched;
    return result;
  }

  public onSubmit() {
    const { controls } = this.loginAndRegisterForm;
    if (this.loginAndRegisterForm.invalid) {
      Object.keys(controls).forEach((controlName) => controls[controlName].markAsTouched());
      return;
    }
    this.dialog.closeAll();
  }

  public pushInputText(event: string) {
    this.inputSubject$.next(event);
  }
}
