import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ConfirmationDialogComponent } from '../dialogs/confirmation-dialog/confirmation-dialog.component';
import { FileUploadDialogComponent } from '../dialogs/file-upload-dialog/file-upload-dialog.component';
import { ConfirmDialogData } from '../models/confirm-dialog-data';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  constructor(private dialog: MatDialog) {}

  confirmDialog(data: ConfirmDialogData): Observable<any> {
    return this.dialog
      .open(ConfirmationDialogComponent, {
        data,
        width: '32rem',
        height: '11rem',
        disableClose: false,
      })
      .afterClosed();
  }

  fileUploadDialog(data: ConfirmDialogData): Observable<boolean> {
    return this.dialog
      .open(FileUploadDialogComponent, {
        data,
        width: '37rem',
        height: '17rem',
        disableClose: false,
      })
      .afterClosed();
  }
}
