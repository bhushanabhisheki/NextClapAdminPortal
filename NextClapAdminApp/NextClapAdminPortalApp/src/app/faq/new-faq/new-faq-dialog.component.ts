import { Component, Inject, OnInit } from '@angular/core';

import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  question: string;
  answer: string;
}

@Component({
  selector: 'app-new-faq',
  templateUrl: './new-faq-dialog.component.html',
  styleUrls: ['./new-faq-dialog.component.scss'],
})
export class NewFaqDialog implements OnInit {
  editMode?: boolean;

  constructor(
    public dialogRef: MatDialogRef<NewFaqDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  public ngOnInit(): void {
    this.editMode = this.data.question != null && this.data.question != '';
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
