import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
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

  public isUserUnique = false;

  public isUserSignUp = false;

  public isInvalidUserToken = true;

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
    this.initLoginForm();
    this.initRegistrationForm();
    this.login
      .checkUserUnique(this.inputSubject$, this.subjDestroyer$)
      .subscribe((data: AccountResponceModel | any) => {
        console.log(data);
        if (!data.exists) {
          console.log('this user does not exist');
          this.isUserUnique = true;
          this.isUserSignUp = false;
          this.cd.detectChanges();
          return;
        }
        this.isUserUnique = false;
        this.isUserSignUp = true;
        this.cd.detectChanges();
      });
  }

  private initLoginForm(): void {
    this.loginForm = this.fb.group({
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

  private initRegistrationForm(): void {
    this.registerForm = this.fb.group({
      newLoginID: [
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
      newPasswordID: [
        null,
        [Validators.required, Validators.minLength(6), Validators.maxLength(15)],
      ],
      repeatPasswordID: [
        null,
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(15),
          RxwebValidators.compare({ fieldName: 'newPasswordID' }),
        ],
      ],
    });
  }

  public onLoginSubmit() {
    if (this.isUserUnique) return;
    const { controls } = this.loginForm;
    if (this.loginForm.invalid) {
      Object.keys(controls).forEach((controlName) => controls[controlName].markAsTouched());
      return;
    }
    this.login
      .getUserLoginToken(this.loginForm.value.loginID, this.loginForm.value.passwordID)
      .subscribe((value) => {
        if (!value) {
          this.isInvalidUserToken = value;
          this.cd.detectChanges();
        } else {
          this.isInvalidUserToken = true;
          this.cd.detectChanges();
          localStorage.setItem('auth', JSON.stringify(value));
          this.dialog.closeAll();
        }
      });
  }

  public onRegistrationSubmit(): void {
    if (this.isUserSignUp) return;
    const { controls } = this.registerForm;
    if (this.registerForm.invalid) {
      Object.keys(controls).forEach((controlName) => controls[controlName].markAsTouched());
      return;
    }
    this.login
      .setNewUserOnBack(this.registerForm.value.newLoginID, this.registerForm.value.newPasswordID)
      .subscribe((value) => {
        localStorage.setItem('auth', JSON.stringify(value));
        this.dialog.closeAll();
      });
  }

  public pushInputText(event: string): void {
    this.inputSubject$.next(event);
    this.isInvalidUserToken = true;
    this.isUserAlreadyExists = false;
  }

  public pushPasswordInput(): void {
    this.isInvalidUserToken = true;
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
