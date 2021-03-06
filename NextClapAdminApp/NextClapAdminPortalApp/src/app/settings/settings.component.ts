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
import { UtilsService } from '../shared/services/utils.service';
import { UsersService } from '../users/users.service';

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

  constructor(
    private usersService: UsersService,
    private utilsService: UtilsService,
    private _snackBar: MatSnackBar,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    let userdata = JSON.parse(localStorage.getItem('userData') || '');
    if (userdata && userdata.user) this.data = userdata.user;
    this.createForm();
  }

  createForm(): void {
    this.editMode = true;

    this.accountDetailsForm = this.fb.group({
      id: this.data?.id,
      active: this.data?.active,
      registration_date: this.data?.registration_date,
      username: new FormControl({
        value: this.data?.username ? this.data?.username : 'Not Available',
        disabled: true,
      }),

      email: new FormControl(
        this.data?.email ? this.data?.email : 'Not Available',
        Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'),
        ])
      ),

      role: new FormControl({ value: this.roles[0].value, disabled: true }),
      password: new FormControl(
        this.data?.password ? this.data?.password : '',
        Validators.compose([Validators.minLength(8)])
      ),
      company: new FormControl(
        this.data?.company ? this.data?.company : 'Not Available'
      ),
      gender: new FormControl(
        this.data?.gender ? this.data?.gender : 'Male',
        Validators.compose([Validators.minLength(8), Validators.required])
      ),
      phone: new FormControl(
        this.data?.phone ? this.data?.phone : 'Not Available'
      ),
      birthdate: new FormControl(
        this.data?.birthdate ? this.data?.birthdate : 'Not Available'
      ),
      firstname: new FormControl(
        this.data?.firstname ? this.data?.firstname : 'Not Available'
      ),
      lastname: new FormControl(
        this.data?.lastname ? this.data?.lastname : 'Not Available'
      ),
      state: new FormControl(
        this.data?.state ? this.data?.state : 'Not Available'
      ),
      region: new FormControl(
        this.data?.region ? this.data?.region : 'Not Available'
      ),
    });

    if (this.data)
      this.imageUrl = this.utilsService.getDisplayedImage(
        this.data?.profilePic,
        this.data?.gender
      );
  }

  @ViewChild('fileInput') el?: ElementRef;

  imageUrl: any = '/assets/profileimage/profile_male.png';
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
    if (this.data)
      this.imageUrl = this.utilsService.getDisplayedImage(
        this.data?.profilePic,
        this.data?.gender
      );
    this.editFile = true;
    this.removeUpload = false;
  }

  onSubmitAccountDetails(user: User): void {
    user.address = '';
    this.usersService.updateUser(user.id, user, true);
  }
}
