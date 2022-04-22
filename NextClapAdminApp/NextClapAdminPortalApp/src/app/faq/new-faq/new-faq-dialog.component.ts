import {
  Component,
  Inject,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';

import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ComponentFactoryService } from 'src/app/shared/services/component-factory.service';
import { Answer } from '../answer.model';
import { AnswerComponent } from '../answer/answer.component';

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
  answers: Answer[] = [];
  @ViewChild('dynamicAnswer', { read: ViewContainerRef })
  view?: ViewContainerRef;

  constructor(
    public componentFactoryService: ComponentFactoryService,
    public dialogRef: MatDialogRef<NewFaqDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  public ngOnInit(): void {
    this.editMode = this.data.question != null && this.data.question != '';
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  addNewAnswer() {
    if (this.view) {
      this.componentFactoryService.setRootViewContainerRef(this.view);
      this.componentFactoryService.insertComponent(AnswerComponent);
    }
  }
}
