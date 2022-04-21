import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  OnDestroy,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.scss'],
})
export class SidenavListComponent implements OnInit, OnDestroy {
  userLoggedIn = false;
  authServiceSubscription!: Subscription;
  @Output() sidenavClose = new EventEmitter();

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authServiceSubscription = this.authService.userLoggedIn.subscribe(
      (loggedIn) => {
        this.userLoggedIn = loggedIn;
      }
    );
  }

  public onSidenavClose = () => {
    this.sidenavClose.emit();
  };

  logout() {
    this.authService.logout();
  }

  ngOnDestroy(): void {
    this.authServiceSubscription.unsubscribe();
  }
}
