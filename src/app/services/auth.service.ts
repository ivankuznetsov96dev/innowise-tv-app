import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  switchMap,
  take,
  takeUntil,
  tap,
} from 'rxjs/operators';
import { BehaviorSubject, iif, Observable, of, pipe, Subject } from 'rxjs';
import { ajax } from 'rxjs/ajax';
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

  public checkUserUnique(
    subj: Subject<string>,
    destroy: Subject<any>,
  ): Observable<AccountResponceModel | any> {
    const url = 'https://api.persik.by/v2/auth/check?email=';
    return subj.pipe(
      takeUntil(destroy),
      debounceTime(600),
      filter((value: string) => value.length > 3),
      distinctUntilChanged(),
      switchMap((value: string) =>
        ajax.getJSON<AccountResponceModel>(url + value).pipe(
          catchError(() => {
            return of('Error: getJSON');
          }),
          tap(() => console.log(value)),
        ),
      ),
    );
  }
}
