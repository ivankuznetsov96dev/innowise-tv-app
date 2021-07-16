import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ViewportScroller } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginFormComponent } from './components/login-form/login-form.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  public dialogRef: any;

  constructor(
    private viewportScroller: ViewportScroller,
    private dialog: MatDialog,
    private alertBar: MatSnackBar,
  ) {}

  public goToUp(): void {
    this.viewportScroller.scrollToPosition([0, 0]);
  }

  public openRegistrModalWindow() {
    this.dialogRef = this.dialog.open(LoginFormComponent);

    this.dialogRef.afterClosed().subscribe(() => {
      if (localStorage.getItem('auth'))
        this.alertBar.open('You are logged in', 'Close', { duration: 3000 });
    });
  }
}
