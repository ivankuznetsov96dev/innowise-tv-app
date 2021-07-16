import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Observable, of, Subject } from 'rxjs';
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
import { AccountResponceModel } from '../../interfaces/account-responce.model';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-register-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginFormComponent implements OnInit, OnDestroy {
  public loginAndRegisterForm!: FormGroup;

  public inputSubject$: Subject<string> = new Subject();

  public subjDestroyer$: Subject<any> = new Subject<any>();

  public errorFlag = false;

  public userExistFlag = false;

  public invalidUserToken = true;

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private cd: ChangeDetectorRef,
    private login: LoginService,
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
        [
          Validators.required,
          Validators.pattern(
            '^([a-z0-9_-]+\\.)*[a-z0-9_-]+@[a-z0-9_-]+(\\.[a-z0-9_-]+)*\\.[a-z]{2,6}$',
          ),
          Validators.minLength(10),
          Validators.maxLength(25),
        ],
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
    if (this.userExistFlag) return;
    const { controls } = this.loginAndRegisterForm;
    if (this.loginAndRegisterForm.invalid) {
      Object.keys(controls).forEach((controlName) => controls[controlName].markAsTouched());
      return;
    }
    this.login
      .getUserLoginToken(
        this.loginAndRegisterForm.value.loginID,
        this.loginAndRegisterForm.value.passwordID,
      )
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

  public pushInputText(event: string): void {
    this.inputSubject$.next(event);
  }

  public pushPasswordInput(): void {
    this.invalidUserToken = true;
  }

  ngOnDestroy() {
    this.subjDestroyer$.next();
  }
}
