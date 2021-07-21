import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { AuthTokenModel } from '../interfaces/auth-token.model';
import { AccountResponceModel } from '../interfaces/account-responce.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public user$: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient) {}

  public getUserLoginToken(email: string, password: string): Observable<AuthTokenModel | boolean> {
    const params = new HttpParams()
      .set('email', email)
      .set('password', password)
      .set('nocookie', '1');
    return this.http.get<AuthTokenModel>('https://api.persik.by/v1/account/login', { params }).pipe(
      tap((value) => this.user$.next(value)),
      catchError(() => of(false)),
    );
  }

  public setNewUserOnBack(email: string, password: string): Observable<AuthTokenModel> {
    const params = new HttpParams().set('email', email).set('password', password);
    return this.http
      .get<null | boolean>('https://api.persik.by/v1/account/registration', { params })
      .pipe(
        switchMap(() =>
          this.http.get<AuthTokenModel>('https://api.persik.by/v1/account/login', { params }).pipe(
            tap((value) => {
              this.user$.next(value);
              localStorage.setItem('auth', JSON.stringify(value));
            }),
          ),
        ),
      );
  }

  public userLogout(): void {
    localStorage.removeItem('auth');
    this.user$.next(null);
  }

  public checkUserUnique(email: string): Observable<AccountResponceModel> {
    const params = new HttpParams().set('email', email);
    return this.http.get<AccountResponceModel>('https://api.persik.by/v2/auth/check', { params });
  }
}
