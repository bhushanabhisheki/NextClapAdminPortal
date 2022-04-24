import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { remove } from 'lodash';
import { Subscription } from 'rxjs';
import { User } from '../auth/user.model';
import { DialogService } from '../shared/services/dialog.service';
import { UserDialogComponent } from './user-dialog/user-dialog.component';
import { UsersService } from './users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  usersSubscription: Subscription = new Subscription();
  userList?: User[];
  showSearchOption: boolean = false;
  searchUser: string = '';
  editMode = false;

  constructor(
    private usersService: UsersService,
    private dialog: MatDialog,
    private confirmDialogService: DialogService
  ) {}

  ngOnInit(): void {
    this.usersService.getAllUsers();
    this.usersSubscription = this.usersService.usersChanged.subscribe(
      (users) => {
        this.userList = users;
        console.log(this.userList);
      }
    );
  }

  showUserDialog(user: any) {
    let data = {
      title: 'Add User',
      message: 'Select the file to import questions :',
      confirmCaption: 'Yes',
      cancelCaption: 'No',
      user: user ? user : null,
    };

    const dialogRef = this.dialog.open(UserDialogComponent, {
      data,
      width: '40rem',
      height: '26rem',
      disableClose: false,
    });

    dialogRef.afterClosed().subscribe((response: any) => {
      const newUser = response;
      if (newUser.value) this.userList?.push(newUser.value);
    });
  }

  editCurrentUser(user: User) {
    this.editMode = true;
    this.showUserDialog(user);
  }

  removeItemsWithID(items: User[], id: string) {
    remove(items, (x) => x.id === id);
  }

  showSearch(value: boolean) {
    this.showSearchOption = value;
    if (!value) {
      this.searchUser = '';
    }
  }

  DeleteCurrentUser(user: User) {
    console.log('delete user dialog called');
    this.confirmDialogService
      .confirmDialog({
        title: 'Delete User',
        message: 'Are you sure you want to delete this user?',
        confirmCaption: 'Yes',
        cancelCaption: 'No',
      })
      .subscribe((response) => {
        if (this.userList && response) this.usersService.deleteUser(user.id);
      });
  }
}
