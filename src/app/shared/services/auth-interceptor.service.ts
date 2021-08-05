import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PersistenceService } from './persistence.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private persistence: PersistenceService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.persistence.get('auth');
    request = request.clone({
      setParams: {
        auth_token: token ? `${token.auth_token}` : '',
      },
    });
    return next.handle(request);
  }
}
