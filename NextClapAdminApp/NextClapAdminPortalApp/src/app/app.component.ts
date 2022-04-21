import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth/auth.service';
import { User } from './auth/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'NextClapAdminPortalApp';
  isLoading = false;
  error?: string;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.authService.autoLogin();
  }

  // onSubmit(form: NgForm) {
  login() {
    // if (!form.valid) {
    //   return;
    // }
    const username = 'admin'; // = form.value.email;
    const password = 'admin1'; // = form.value.password;

    this.isLoading = true;
    let authObs: Observable<User> = this.authService.login(username, password);

    authObs.subscribe(
      (resData) => {
        console.log(resData);
        this.isLoading = false;
        this.router.navigate(['/dashboard']);
      },
      (errorMessage) => {
        this.error = errorMessage;
        this.isLoading = false;
      }
    );

    //form.reset();
  }
}
