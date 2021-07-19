import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { of, Subject } from 'rxjs';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  filter,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { AccountResponceModel } from '../../interfaces/account-responce.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginFormComponent implements OnInit, OnDestroy {
  public loginForm!: FormGroup;

  public registerForm!: FormGroup;

  public inputSubject$: Subject<string> = new Subject();

  public subjDestroyer$: Subject<any> = new Subject<any>();

  public userExistFlag = false;

  public invalidUserToken = true;

  public isAuthFormType = false;

  public formType = 'Sign In';

  public isUserAlreadyExists = false;

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private cd: ChangeDetectorRef,
    private login: AuthService,
  ) {}

  ngOnInit(): void {
    this.initForm();
    const url = 'https://api.persik.by/v2/auth/check?email=';
    this.inputSubject$
      .pipe(
        takeUntil(this.subjDestroyer$),
        debounceTime(600),
        filter((value: string) => value.length > 3),
        distinctUntilChanged(),
        switchMap((value: string) =>
          ajax.getJSON<AccountResponceModel>(url + value).pipe(
            catchError(() => {
              this.cd.detectChanges();
              return of('Error: getJSON');
            }),
            tap(() => console.log(value)),
          ),
        ),
        tap((data: AccountResponceModel | any) => {
          console.log(data);
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
    this.loginForm = this.fb.group({
      loginID: [
        null,
        [
          Validators.required,
          Validators.pattern(
            '^([a-z0-9_-]+\\.)*[a-z0-9_-]+@[a-z0-9_-]+(\\.[a-z0-9_-]+)*\\.[a-z]{2,6}$',
          ),
          RxwebValidators.minLength({ value: 10 }),
          RxwebValidators.maxLength({ value: 25 }),
        ],
      ],
      passwordID: [
        null,
        [
          Validators.required,
          RxwebValidators.minLength({ value: 6 }),
          RxwebValidators.maxLength({ value: 15 }),
        ],
      ],
    });

    this.registerForm = this.fb.group({
      newLoginID: [
        null,
        [
          Validators.required,
          Validators.pattern(
            '^([a-z0-9_-]+\\.)*[a-z0-9_-]+@[a-z0-9_-]+(\\.[a-z0-9_-]+)*\\.[a-z]{2,6}$',
          ),
          RxwebValidators.minLength({ value: 10 }),
          RxwebValidators.maxLength({ value: 25 }),
        ],
      ],
      newPasswordID: [
        null,
        [
          Validators.required,
          RxwebValidators.minLength({ value: 6 }),
          RxwebValidators.maxLength({ value: 15 }),
        ],
      ],
      repeatPasswordID: [
        null,
        [
          Validators.required,
          RxwebValidators.minLength({ value: 6 }),
          RxwebValidators.maxLength({ value: 15 }),
          RxwebValidators.compare({ fieldName: 'newPasswordID' }),
        ],
      ],
    });
  }

  public onLoginSubmit() {
    if (this.userExistFlag) return;
    const { controls } = this.loginForm;
    if (this.loginForm.invalid) {
      Object.keys(controls).forEach((controlName) => controls[controlName].markAsTouched());
      return;
    }
    this.login
      .getUserLoginToken(this.loginForm.value.loginID, this.loginForm.value.passwordID)
      .subscribe((value) => {
        if (!value) {
          this.invalidUserToken = value;
          this.cd.detectChanges();
        } else {
          this.invalidUserToken = true;
          this.cd.detectChanges();
          localStorage.setItem('auth', JSON.stringify(value));
          this.dialog.closeAll();
        }
      });
  }

  public onRegistrationSubmit(): void {
    const { controls } = this.registerForm;
    if (this.registerForm.invalid) {
      Object.keys(controls).forEach((controlName) => controls[controlName].markAsTouched());
      return;
    }
    this.login
      .setNewUserOnBack(this.registerForm.value.newLoginID, this.registerForm.value.newPasswordID)
      .subscribe((value) => {
        if (value === null) {
          this.login
            .getUserLoginToken(
              this.registerForm.value.newLoginID,
              this.registerForm.value.newPasswordID,
            )
            .subscribe((data) => {
              console.log(data);
              localStorage.setItem('auth', JSON.stringify(data));
              this.dialog.closeAll();
            });
        } else {
          this.isUserAlreadyExists = true;
          this.cd.detectChanges();
        }
      });
  }

  public pushInputText(event: string): void {
    this.inputSubject$.next(event);
    this.invalidUserToken = true;
    this.isUserAlreadyExists = false;
  }

  public pushPasswordInput(): void {
    this.invalidUserToken = true;
  }

  public changeForm(event: any): void {
    this.isAuthFormType = event.checked;
    this.formType = this.isAuthFormType ? 'Sign Up' : 'Sign In';
    this.cd.detectChanges();
  }

  ngOnDestroy() {
    this.subjDestroyer$.next();
  }
}
