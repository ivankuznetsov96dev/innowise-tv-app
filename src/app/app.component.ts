import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { ViewportScroller } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import {Observable, Subject} from 'rxjs';
import {select, Store} from '@ngrx/store';
import { LoginFormComponent } from './shared/components/login-form/login-form.component';
import { AuthService } from './shared/services/auth.service';
import { PersistenceService } from './shared/services/persistence.service';
import { favoriteChannelsListAction } from './store/actions/favorite-channels-list.action';
import {isLoggedInSelector} from "./store/selectors";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit, OnDestroy {
  public dialogRef: any;

  public destroyerSubj: Subject<any> = new Subject<any>();

  public isLoggedIn$!: Observable<boolean>;

  constructor(
    private viewportScroller: ViewportScroller,
    private dialog: MatDialog,
    private alertBar: MatSnackBar,
    private router: Router,
    private auth: AuthService,
    private persistence: PersistenceService,
    private store: Store,
  ) {}

  ngOnInit(): void {
    this.store.dispatch(favoriteChannelsListAction());
    this.isLoggedIn$ = this.store.pipe(select(isLoggedInSelector));
  }

  public goToUp(): void {
    this.viewportScroller.scrollToPosition([0, 0]);
  }

  public openRegistrModalWindow(): void {
    // if (localStorage.getItem('auth')) {
    if (this.persistence.get('auth')) {
      this.auth.userLogout();
      this.router.navigate(['channels', 0]);
      this.alertBar.open('Log out', 'Close', { duration: 3000 });
      this.store.dispatch(favoriteChannelsListAction());
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
