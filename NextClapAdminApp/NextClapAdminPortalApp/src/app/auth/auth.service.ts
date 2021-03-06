import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, tap } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs';

import { User } from './user.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  user: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
  userLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private tokenExpirationTimer: any;

  constructor(private http: HttpClient, private router: Router) {}

  login(username: string, password: string) {
    return this.http
      .post<User>('http://localhost:4000/login', {
        username: username,
        password: password,
      })
      .pipe(
        catchError(this.handleError),
        tap((resData) => {
          this.handleAuthentication(resData);
        })
      );
  }

  autoLogin() {
    let localUserData = localStorage.getItem('userData');
    if (localUserData === null) return;
    const userData: any = JSON.parse(localUserData || '');
    if (!userData) {
      return;
    }

    const loadedUser = userData;
    if (loadedUser.token) {
      this.user.next(loadedUser.user);
      this.userLoggedIn.next(true);
      const parsedTokenData = this.parseJwt(loadedUser.token);
      this.autoLogout(parsedTokenData.exp);
    }
  }

  logout() {
    this.user.next(null);
    localStorage.removeItem('userData');
    this.userLoggedIn.next(false);
    if (this.router.url != '/auth') {
      this.router.navigate(['/auth']);
    }
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  autoLogout(expirationTime: number) {
    let expDate = new Date(0); // The 0 there is the key, which sets the date to the epoch
    expDate.setUTCSeconds(expirationTime);

    let currentDate = new Date();
    let expirationDuration = expDate.getTime() - currentDate.getTime();

    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  parseJwt(token: string) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join('')
    );

    return JSON.parse(jsonPayload);
  }

  private handleAuthentication(authData: any) {
    const parsedTokenData = this.parseJwt(authData.token);
    this.autoLogout(parsedTokenData.exp);

    this.user.next(authData.user);
    this.userLoggedIn.next(true);
    localStorage.setItem('userData', JSON.stringify(authData));
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    console.log(errorRes);
    if (!errorRes.error) {
      return throwError(() => new Error(errorMessage));
    }
    return throwError(() => new Error(errorRes.error.message));
  }
}
