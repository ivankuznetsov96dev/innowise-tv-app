import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  public user$: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient) {}

  public getUserLoginToken(email: string, password: string): Observable<any> {
    const params = new HttpParams()
      .set('email', email)
      .set('password', password)
      .set('nocookie', '1');
    return this.http
      .get('https://api.persik.by/v1/account/login', { params })
      .pipe(tap((value) => this.user$.next(value)));
  }

  public setNewUserOnBack(email: string, password: string): void {
    const params = new HttpParams().set('email', email).set('password', password);
    this.http
      .get('https://api.persik.by/v1/account/login', { params })
      .subscribe((value) => console.log(value));
  }

  public userLogout(): void {
    localStorage.removeItem('auth');
    this.user$.next(null);
  }
}
