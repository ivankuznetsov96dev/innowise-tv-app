import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-register-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginFormComponent implements OnInit {
  public loginAndRegisterForm!: FormGroup;

  constructor(private fb: FormBuilder, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.initForm();
  }

  private initForm() {
    this.loginAndRegisterForm = this.fb.group({
      loginID: [
        '',
        [Validators.required, Validators.email, Validators.min(10), Validators.max(25)],
      ],
      passwordID: ['', [Validators.required, Validators.min(6), Validators.max(15)]],
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
}
