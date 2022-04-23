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

  constructor() {}

  ngOnInit(): void {
    this.user = {
      company: this.currentUser.company,
      email: this.currentUser.email,
      last_active_date: this.currentUser.last_active_date,
      firstname: this.currentUser.firstname,
      lastname: this.currentUser.lastname,
      username: this.currentUser.username,
      phone: this.currentUser.phone,
      active: this.currentUser.active,
      address: this.currentUser.address,
    };

    this.iconMap = {
      phone: 'local_phone',
      email: 'markunread',
      address: 'home',
      active: 'notifications_active',
      company: 'apartment',
      last_active_date: 'event_note',
    };
  }

  getIcon(attr: any) {
    const key = attr.key;
    let iconName = this.iconMap[key];
    if (!iconName) iconName = 'label_off';

    return iconName;
  }

  editUser() {
    this.editCurrentUser.emit(this.currentUser);
  }

  deleteUser() {
    console.log('current=' + this.currentUser);
    this.deleteCurrentUser.emit(this.currentUser);
  }
}
