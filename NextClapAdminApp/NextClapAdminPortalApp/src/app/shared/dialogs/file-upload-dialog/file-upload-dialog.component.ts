import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmDialogData } from '../../models/confirm-dialog-data';
import readXlsxFile from 'read-excel-file';

const schema = {
  QUESTION: {
    // JSON object property name.
    prop: 'question',
    type: String,
    required: true,
  },
  ANSWER1: {
    prop: 'answer1',
    type: String,
    required: true,
  },
  ANSWER2: {
    prop: 'answer2',
    type: String,
    required: true,
  },
  ANSWER3: {
    prop: 'answer3',
    type: String,
    required: true,
  },
  ANSWER4: {
    prop: 'answer4',
    type: String,
    required: true,
  },
};
@Component({
  selector: 'app-file-upload-dialog',
  templateUrl: './file-upload-dialog.component.html',
  styleUrls: ['./file-upload-dialog.component.scss'],
})
export class FileUploadDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<FileUploadDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogData,
    private _snackBar: MatSnackBar
  ) {}
  public files?: any[] = [];
  local_data?: any;
  fileContent: string = '';

  ngOnInit(): void {}

  onFileChange(pFileList: File[] | Event | any) {
    this.files = Object.keys(pFileList).map((key) => pFileList[key]);
    let file = pFileList[0];
    readXlsxFile(file, { schema }).then((questions) => {
      this.local_data = questions.rows;
    });
  }

  closeDialog() {
    this.dialogRef.close({ event: 'close', data: this.local_data });
  }
}
