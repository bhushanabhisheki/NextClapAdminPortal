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
import { Question } from '../question.model';

@Component({
  selector: 'app-new-faq',
  templateUrl: './new-faq-dialog.component.html',
  styleUrls: ['./new-faq-dialog.component.scss'],
})
export class NewFaqDialog implements OnInit {
  updateMode?: boolean;
  answers: Answer[] = [];
  questionField?: string;

  @ViewChild('dynamicAnswer', { read: ViewContainerRef })
  view?: ViewContainerRef;

  constructor(
    public componentFactoryService: ComponentFactoryService,
    public dialogRef: MatDialogRef<NewFaqDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Question
  ) {}

  public ngOnInit(): void {
    if (this.data == null) {
      this.updateMode = false;
      this.questionField = '';
    } else {
      this.questionField = this.data.question;
    }
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

  submitData() {}
}
