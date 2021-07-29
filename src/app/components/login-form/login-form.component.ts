import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { AuthService } from '../../services/auth.service';
import { ComparePasswordsValidator } from './validators/compare-passwords.validator';
import { EmailValidator } from './validators/email.validator';
import {
  CheckUserAtLoginValidator,
  CheckUserAtRegistrationValidator,
} from './validators/chack-user.validator';
import { favoriteChannelsListAction } from '../../store/actions/favorite-channels-list.action';

@Component({
  selector: 'app-register-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginFormComponent implements OnInit {
  public loginForm!: FormGroup;

  public registerForm!: FormGroup;

  public isInvalidUserToken = true;

  public isAuthFormType = false;

  public formType = 'Sign In';

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private cd: ChangeDetectorRef,
    private login: AuthService,
    private store: Store,
  ) {}

  ngOnInit(): void {
    this.initLoginForm();
    this.initRegistrationForm();
  }

  private initLoginForm(): void {
    this.loginForm = this.fb.group({
      loginID: [
        null,
        [Validators.required, EmailValidator(), Validators.minLength(10), Validators.maxLength(25)],
        [CheckUserAtLoginValidator.bind(this.login)],
      ],
      passwordID: [null, [Validators.required, Validators.minLength(6), Validators.maxLength(15)]],
    });
  }

  private initRegistrationForm(): void {
    this.registerForm = this.fb.group(
      {
        newLoginID: [
          null,
          [
            Validators.required,
            EmailValidator(),
            Validators.minLength(10),
            Validators.maxLength(25),
          ],
          [CheckUserAtRegistrationValidator.bind(this.login)],
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
            // RxwebValidators.compare({ fieldName: 'newPasswordID' }),
          ],
        ],
      },
      {
        validator: ComparePasswordsValidator(),
      },
    );
  }

  public onLoginSubmit(): void {
    const isFlag = this.checkFormOnInvalid(this.loginForm);
    if (isFlag) {
      this.login
        .getUserLoginToken(this.loginForm.value.loginID, this.loginForm.value.passwordID)
        .subscribe((value) => {
          this.isInvalidUserToken = !!value;
          if (this.isInvalidUserToken) {
            localStorage.setItem('auth', JSON.stringify(value));
            this.getFavoriteChannelsInfo();
            this.dialog.closeAll();
          }
          this.cd.detectChanges();
        });
    }
  }

  public onRegistrationSubmit(): void {
    const isFlag = this.checkFormOnInvalid(this.registerForm);
    if (isFlag) {
      this.login
        .setNewUserOnBack(this.registerForm.value.newLoginID, this.registerForm.value.newPasswordID)
        .subscribe((value) => {
          localStorage.setItem('auth', JSON.stringify(value));
          this.getFavoriteChannelsInfo();
          this.dialog.closeAll();
        });
    }
  }

  public getFavoriteChannelsInfo(): void {
    this.store.dispatch(favoriteChannelsListAction());
  }

  public checkFormOnInvalid(fg: FormGroup): boolean {
    const { controls } = fg;
    if (fg.invalid) {
      Object.keys(controls).forEach((controlName) => controls[controlName].markAsTouched());
      return false;
    }
    return true;
  }

  public changeForm(event: any): void {
    this.isAuthFormType = event.checked;
    this.formType = this.isAuthFormType ? 'Sign Up' : 'Sign In';
    this.cd.detectChanges();
  }

  public changeIsInvalidUserTokenFlag(): void {
    this.isInvalidUserToken = true;
  }
}
