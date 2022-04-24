import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { User } from '../auth/user.model';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private url: string = 'http://localhost:4000/api/v1/user';
  usersChanged = new Subject<User[] | undefined>();
  private users?: User[];

  constructor(private http: HttpClient, private authService: AuthService) {}

  getAllUsers() {
    this.http.get<any>(this.url, {}).subscribe((response) => {
      this.users = response.users;
      this.usersChanged.next(this.users);
    });
  }

  addUser(user: User) {
    this.http.post<any>(this.url, user).subscribe((response) => {
      this.users?.push(user);
      this.usersChanged.next(this.users);
    });
  }

  updateUser(userid: string, user: User, fromSetting = false) {
    this.http.put<any>(this.url + '/' + userid, user).subscribe((response) => {
      if (fromSetting) this.authService.user.next(user);
      else this.getAllUsers();
    });
  }

  deleteUser(userid: string) {
    this.http.delete<any>(this.url + '/' + userid).subscribe((response) => {
      this.getAllUsers();
    });
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
