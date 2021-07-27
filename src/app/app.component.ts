import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { ViewportScroller } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { AuthService } from './services/auth.service';
import {PersistenceService} from "./services/persistence.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnDestroy {
  public dialogRef: any;

  public destroyerSubj: Subject<any> = new Subject<any>();

  constructor(
    private viewportScroller: ViewportScroller,
    private dialog: MatDialog,
    private alertBar: MatSnackBar,
    private router: Router,
    private auth: AuthService,
    private persistence: PersistenceService,
  ) {}

  public goToUp(): void {
    this.viewportScroller.scrollToPosition([0, 0]);
  }

  public openRegistrModalWindow(): void {
    // if (localStorage.getItem('auth')) {
    if (this.persistence.get('auth')) {
      this.auth.userLogout();
      this.router.navigate(['channels', 0]);
      this.alertBar.open('Log out', 'Close', { duration: 3000 });
    } else {
      this.dialogRef = this.dialog.open(LoginFormComponent);
      this.dialogRef
        .afterClosed()
        .pipe(takeUntil(this.destroyerSubj))
        .subscribe(() => {
          // if (localStorage.getItem('auth'))
          if (this.persistence.get('auth'))
            this.alertBar.open('You are logged in', 'Close', { duration: 3000 });
        });
    }
  }

  ngOnDestroy(): void {
    this.destroyerSubj.next();
  }
}
