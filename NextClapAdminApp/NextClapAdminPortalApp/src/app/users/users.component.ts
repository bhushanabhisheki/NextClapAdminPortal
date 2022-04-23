import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from '../auth/user.model';
import { UsersService } from './users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  usersSubscription: Subscription = new Subscription();
  userList?: User[];
  constructor(private usersService: UsersService) {}

  ngOnInit(): void {
    this.usersSubscription = this.usersService.userList.subscribe((users) => {
      this.userList = users;
    });
  }
}
