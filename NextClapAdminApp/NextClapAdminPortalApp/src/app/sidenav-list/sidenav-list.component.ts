import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  OnDestroy,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { User } from '../auth/user.model';
import { UtilsService } from '../shared/services/utils.service';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.scss'],
})
export class SidenavListComponent implements OnInit, OnDestroy {
  userLoggedIn = false;
  authServiceSubscription!: Subscription;
  @Output() sidenavClose = new EventEmitter();
  currentUser?: User;

  constructor(
    private authService: AuthService,
    private utilservice: UtilsService
  ) {}

  ngOnInit() {
    this.authServiceSubscription = this.authService.userLoggedIn.subscribe(
      (loggedIn) => {
        this.userLoggedIn = loggedIn;
      }
    );
    this.authService.user.subscribe((response: any) => {
      this.currentUser = response;
    });
  }

  public onSidenavClose = () => {
    this.sidenavClose.emit();
  };

  logout() {
    this.authService.logout();
  }

  getProfileImageUrl() {
    let profilePicUrl = '';

    if (this.currentUser)
      profilePicUrl = this.utilservice.getDisplayedImage(
        this.currentUser.profilePic,
        this.currentUser.gender
      );

    return profilePicUrl;
  }

  ngOnDestroy(): void {
    this.authServiceSubscription.unsubscribe();
  }
}
