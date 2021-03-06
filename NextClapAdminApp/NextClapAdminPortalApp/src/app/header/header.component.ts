import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  userLoggedIn = false;
  authServiceSubscription!: Subscription;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authServiceSubscription = this.authService.userLoggedIn.subscribe(
      (loggedIn) => {
        this.userLoggedIn = loggedIn;
      }
    );
  }

  logout() {
    this.authService.logout();
  }

  ngOnDestroy(): void {
    this.authServiceSubscription.unsubscribe();
  }
}
