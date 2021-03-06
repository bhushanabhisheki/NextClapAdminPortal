import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';

import { ConfirmDialogData } from 'src/app/shared/models/confirm-dialog-data';
import { PasswordValidator } from 'src/app/shared/validators/password.validator';
import { UserDialogData } from 'src/app/shared/models/user-dialog-data';
import { ElementSchemaRegistry } from '@angular/compiler';
import { UsersService } from '../users.service';
import { User } from 'src/app/auth/user.model';

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.scss'],
})
export class UserDialogComponent implements OnInit {
  editMode: boolean = false;
  userDetailsForm?: FormGroup;
  accountDetailsForm!: FormGroup;

  matching_passwords_group?: FormGroup;

  account_validation_messages = {
    username: [
      { type: 'required', message: 'Username is required' },
      {
        type: 'minlength',
        message: 'Username must be at least 5 characters long',
      },
      {
        type: 'maxlength',
        message: 'Username cannot be more than 25 characters long',
      },
      {
        type: 'pattern',
        message: 'Username must contain only digits and letters',
      },
      {
        type: 'validUsername',
        message: 'Your username has already been taken',
      },
    ],
    email: [
      { type: 'required', message: 'Email is required' },
      { type: 'pattern', message: 'Enter a valid mail' },
    ],
    confirm_password: [
      { type: 'required', message: 'Confirm password is required' },
      { type: 'areEqual', message: 'Pasword mismatch' },
    ],
    password: [
      { type: 'required', message: 'Pasword is required' },
      {
        type: 'minlength',
        message: 'Password must be at least 5 characters long',
      },
      {
        type: 'pattern',
        message:
          'Password must contain at least one uppercase, one lowercase, and one number',
      },
    ],
    terms: [
      { type: 'pattern', message: 'You must accept terms and conditions' },
    ],
  };

  roles = [
    { name: 'Admin', value: 2 },
    { name: 'Call Center', value: 3 },
    { name: 'Area Manager', value: 4 },
    { name: 'Manging Director', value: 5 },
  ];

  getRoleBasedonName(rolename: string) {
    return this.roles.find((role: any) => role.name === rolename)?.value;
  }

  constructor(
    public usersService: UsersService,
    public dialogRef: MatDialogRef<UserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UserDialogData,
    private _snackBar: MatSnackBar,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    if (this.data?.user?.username) this.editMode = true;
    else this.editMode = false;
    console.log('Role' + this.data?.user?.role?.role_name);
    this.accountDetailsForm = this.fb.group({
      id: this.data.user ? this.data.user.id : null,
      active: 'active',
      registration_date: new Date().toISOString(),
      username: new FormControl(
        this.data.user ? this.data?.user?.username : '',
        Validators.compose([
          Validators.maxLength(25),
          Validators.minLength(5),
          Validators.pattern('^(?=.*[a-zA-Z])[a-zA-Z0-9]+$'),
          Validators.required,
        ])
      ),

      email: new FormControl(
        this.data.user ? this.data?.user?.email : '',
        Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'),
        ])
      ),

      role: new FormControl(
        this.data.user
          ? this.getRoleBasedonName(this.data?.user?.role?.role_name)
          : this.roles[0].value,
        Validators.required
      ),
      password: new FormControl(
        this.data.user ? this.data?.user?.password : '',
        Validators.compose([Validators.minLength(8)])
      ),
      company: new FormControl(this.data.user ? this.data?.user?.company : ''),
      gender: new FormControl(
        this.data.user ? this.data?.user?.gender : 1,
        Validators.compose([Validators.minLength(8), Validators.required])
      ),
      phone: new FormControl(this.data.user ? this.data?.user?.phone : ''),
      birthdate: new FormControl(
        this.data.user ? this.data?.user?.birthdate : ''
      ),
      firstname: new FormControl(
        this.data.user ? this.data?.user?.firstname : ''
      ),
      lastname: new FormControl(
        this.data.user ? this.data?.user?.lastname : ''
      ),
      state: new FormControl(this.data.user ? this.data?.user?.state : ''),
      region: new FormControl(this.data.user ? this.data?.user?.region : ''),
    });
  }

  closeDialog() {
    this.dialogRef.close({ event: 'close', data: 'user data' });
  }

  onSubmitAccountDetails(user: User): void {
    if (this.editMode) this.usersService.updateUser(user.id, user);
    else {
      user.address = '';
      this.usersService.addUser(user);
    }
    this.dialogRef.close({ event: 'close' });
  }
}
