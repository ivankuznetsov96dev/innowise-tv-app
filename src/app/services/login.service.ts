import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient) {}

  public getUserLoginToken(email: string, password: string): Observable<any> {
    const params = new HttpParams()
      .set('email', email)
      .set('password', password)
      .set('nocookie', '1');
    return this.http.get('https://api.persik.by/v1/account/login', { params });
  }

  public setNewUserOnBack(email: string, password: string): void {
    const params = new HttpParams().set('email', email).set('password', password);
    this.http
      .get('https://api.persik.by/v1/account/login', { params })
      .subscribe((value) => console.log(value));
  }
}
