import {
  animate,
  group,
  query,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('routeAnim', [
      transition('* <=> *', [
        query(':enter, :leave', [style({ position: 'fixed', width: '100%' })], {
          optional: true,
        }),
        group([
          query(
            ':enter',
            [
              style({ transform: 'translateX(100%)' }),
              animate('1s ease-in-out', style({ transform: 'translateX(0%)' })),
            ],
            { optional: true }
          ),
          query(
            ':leave',
            [
              style({ transform: 'translateX(0%)' }),
              animate(
                '1s ease-in-out',
                style({ transform: 'translateX(-100%)' })
              ),
            ],
            { optional: true }
          ),
        ]),
      ]),
    ]),
  ],
})
export class AppComponent implements OnInit {
  title = 'Next Clap Admin Portal';
  authServiceSubscription!: Subscription;
  userLoggedIn = false;
  isLoading = false;
  error?: string;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.authService.autoLogin();
    this.authServiceSubscription = this.authService.userLoggedIn.subscribe(
      (loggedIn) => {
        this.userLoggedIn = loggedIn;
        console.log('loggd in ' + loggedIn);
      }
    );
  }

  loggedIn() {
    return this.userLoggedIn && localStorage.getItem('userData');
  }

  prepareRoute(outlet: RouterOutlet) {
    if (outlet.isActivated) return outlet.activatedRoute.snapshot.url;

    return;
  }

  ngOnDestroy(): void {
    this.authServiceSubscription.unsubscribe();
  }
}
