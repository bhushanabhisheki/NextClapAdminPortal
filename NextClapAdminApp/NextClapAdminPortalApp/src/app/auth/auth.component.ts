import { Component } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent {
  isLoading = false;
  error?: string | null = null;
  form!: FormGroup;
  private formSubmitAttempt!: boolean;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  isFieldInvalid(field: string) {
    let control = this.form.get(field);
    return !control?.valid && control?.touched;
  }

  onSubmit() {
    this.formSubmitAttempt = true;
    if (this.form.valid) {
      const username = this.form.value.userName;
      const password = this.form.value.password;
      this.isLoading = true;

      let authObs = this.authService.login(username, password);

      authObs.subscribe(
        (resData) => {
          this.isLoading = false;
          this.error = null;
          this.router.navigate(['/dashboard']);
        },
        (errorMessage) => {
          this.error = errorMessage;
          this.isLoading = false;
        }
      );
    }
  }
}
