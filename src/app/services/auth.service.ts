import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { AuthTokenModel } from '../interfaces/auth-token.model';

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

  public setNewUserOnBack(email: string, password: string): Observable<any> {
    const params = new HttpParams().set('email', email).set('password', password);
    return this.http
      .get('https://api.persik.by/v1/account/registration', { params })
      .pipe(catchError(() => of(false)));
  }

  public userLogout(): void {
    localStorage.removeItem('auth');
    this.user$.next(null);
  }
}
