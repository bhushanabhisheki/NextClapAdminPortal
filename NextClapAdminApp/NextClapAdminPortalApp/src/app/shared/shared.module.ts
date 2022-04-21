import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ConfirmationDialogComponent } from './dialogs/confirmation-dialog/confirmation-dialog.component';
import { FileUploadDialogComponent } from './dialogs/file-upload-dialog/file-upload-dialog.component';
import { FileDragNDropDirective } from './directives/file-drag-n-drop.directive';
import { MaterialModule } from '../material.module';

@NgModule({
  declarations: [
    ConfirmationDialogComponent,
    FileUploadDialogComponent,
    FileDragNDropDirective,
  ],
  imports: [CommonModule, MaterialModule, FlexLayoutModule],
  exports: [],
})
export class SharedModule {}
