import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from '../auth/user.model';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent {
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
  data?: User;

  constructor(private _snackBar: MatSnackBar, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.editMode = true;
    let userdata = JSON.parse(localStorage.getItem('userData') || '');
    if (userdata && userdata.user) this.data = userdata.user;

    console.log(this.data);

    console.log('editMode' + this.editMode);
    this.accountDetailsForm = this.fb.group({
      id: Math.random().toString(36).substring(3, 15),
      active: 'active',
      registration_date: new Date().toLocaleDateString(),
      username: new FormControl({ value: 'bhushan', disabled: true }),

      email: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'),
        ])
      ),

      role: new FormControl({ value: this.roles[0].value, disabled: true }),
      password: new FormControl(
        '',
        Validators.compose([Validators.minLength(8)])
      ),
      company: new FormControl(''),
      gender: new FormControl(
        1,
        Validators.compose([Validators.minLength(8), Validators.required])
      ),
      phone: new FormControl(''),
      birthdate: new FormControl(''),
      firstname: new FormControl(''),
      lastname: new FormControl(''),
      state: new FormControl(''),
      region: new FormControl(''),
    });
  }

  @ViewChild('fileInput') el?: ElementRef;
  imageUrl: any =
    'https://i.pinimg.com/236x/d6/27/d9/d627d9cda385317de4812a4f7bd922e9--man--iron-man.jpg';
  editFile: boolean = true;
  removeUpload: boolean = false;

  uploadFile(event: any) {
    let reader = new FileReader(); // HTML5 FileReader API
    let file = event.target.files[0];
    if (event.target.files && event.target.files[0]) {
      reader.readAsDataURL(file);

      // When file uploads set it to file formcontrol
      reader.onload = () => {
        this.imageUrl = reader.result;
        // this.registrationForm.patchValue({  //TODO
        //   file: reader.result,
        // });
        this.editFile = false;
        this.removeUpload = true;
      };
      // ChangeDetectorRef since file is loading outside the zone
      //TODO this.cd.markForCheck();
    }
  }

  // Function to remove uploaded file
  removeUploadedFile() {
    let newFileList = Array.from(this.el?.nativeElement.files);
    this.imageUrl =
      'https://i.pinimg.com/236x/d6/27/d9/d627d9cda385317de4812a4f7bd922e9--man--iron-man.jpg';
    this.editFile = true;
    this.removeUpload = false;
  }
}
