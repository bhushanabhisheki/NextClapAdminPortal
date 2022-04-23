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
    { name: 'Admin', value: 'admin' },
    { name: 'Super Admin', value: 'super-admin' },
    { name: 'Call Center', value: 'call-center' },
    { name: 'Area Manager', value: 'area-manager' },
    { name: 'Manging Director', value: 'manging-director' },
  ];

  constructor(
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
    console.log('editMode' + this.editMode);
    this.accountDetailsForm = this.fb.group({
      id: Math.random().toString(36).substring(3, 15),
      active: 'active',
      registration_date: new Date().toLocaleDateString(),
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
        this.data.user ? this.data?.user?.role : this.roles[0].value,
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
    console.log('in close dialog');
    this.dialogRef.close({ event: 'close', data: 'user data' });
  }

  onSubmitAccountDetails(value: any): void {
    console.log('in submit');
    if (value) this.dialogRef.close({ event: 'close', value });
    else this.dialogRef.close({ event: 'close' });
  }
}
