import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpParams,
} from '@angular/common/http';
import { take, exhaustMap } from 'rxjs/operators';

import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return this.authService.user.pipe(
      take(1),
      exhaustMap((user) => {
        if (!user || localStorage.getItem('userData') === null) {
          return next.handle(req);
        }
        let localUserData = localStorage.getItem('userData');
        const userData: any = JSON.parse(localUserData || '');
        const modifiedReq = req.clone({
          headers: req.headers.set(
            'Authorization',
            userData.token ? 'jwt ' + userData.token : ''
          ),
        });
        return next.handle(modifiedReq);
      })
    );
  }
}
