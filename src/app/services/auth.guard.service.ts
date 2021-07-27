import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { PersistenceService } from './persistence.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService {
  constructor(
    private auth: AuthService,
    private router: Router,
    private alertBar: MatSnackBar,
    private persistence: PersistenceService,
  ) {
    // if (localStorage.getItem('auth')) this.auth.user$.next(localStorage.getItem('auth'));
    if (this.persistence.get('auth')) this.auth.user$.next(this.persistence.get('auth'));
  }

  public canActivate(): Observable<boolean> {
    return this.auth.user$.pipe(
      take(1),
      map((value) => !!value),
      tap((isLogged) => {
        if (!isLogged) {
          // this.router.navigate(['channels', 0]).then(() => {
          //   this.alertBar.open('You are not logged. Please, Sign Up', 'Close', { duration: 3000 });
          // });
          this.router.navigate(['channels', 0]);
          this.alertBar.open('You are not logged. Please, Sign Up', 'Close', { duration: 3000 });
        }
      }),
    );
  }
}
