import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from 'src/app/auth/user.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  @Output('edit') editCurrentUser = new EventEmitter<User>();
  @Output('delete') deleteCurrentUser = new EventEmitter<User>();

  @Input() currentUser!: User;
  user?: any;
  iconMap?: any;
  usermap: any;

  constructor() {}

  ngOnInit(): void {
    this.usermap = new Map();
    this.usermap.set(0, this.currentUser.role.role_name);
    this.usermap.set(1, this.currentUser.firstname);
    this.usermap.set(2, this.currentUser.lastname);
    this.usermap.set(3, this.currentUser.phone);
    this.usermap.set(4, this.currentUser.email);
    this.usermap.set(5, this.currentUser.group);
    this.usermap.set(6, this.currentUser.state);
    this.usermap.set(7, this.currentUser.region);
    this.usermap.set(8, this.currentUser.last_active_date);

    this.iconMap = [
      'approval',
      'F',
      'L',
      'local_phone',
      'email',
      'group',
      'location_city',
      'south_america',
      'circle_notifications',
    ];

    this.user = {
      firstname: this.currentUser.firstname,
      lastname: this.currentUser.lastname,
      company: this.currentUser.company,
      email: this.currentUser.email,
      last_active_date: this.currentUser.last_active_date,
      role: this.currentUser.role.role_name,
      phone: this.currentUser.phone,
      active: this.currentUser.active,
      address: this.currentUser.address,
    };
  }

  editUser() {
    this.editCurrentUser.emit(this.currentUser);
  }

  deleteUser() {
    console.log('current=' + this.currentUser);
    this.deleteCurrentUser.emit(this.currentUser);
  }

  getDisplayedImage() {
    let userImg: string = '../../../assets/profileimage/profile_male.png';

    if (this.currentUser?.profilePic)
      userImg = 'http://localhost:4000' + this.currentUser.profilePic;
    else if (this.currentUser.gender === 'Female')
      userImg = '../../../assets/profileimage/profile_male.png';
    return userImg;
  }
}
