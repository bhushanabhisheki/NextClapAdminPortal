import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FaqRoutingModule } from './faq-routing.module';
import { FaqComponent } from './faq.component';
import { NewFaqDialog } from './new-faq/new-faq-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { QuestionComponent } from './question/question.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AnswerComponent } from './answer/answer.component';
import { MaterialModule } from '../material.module';
import { SharedModule } from '../shared/shared.module';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [
    FaqComponent,
    NewFaqDialog,
    QuestionComponent,
    AnswerComponent,
  ],
  imports: [
    CommonModule,
    FaqRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    MaterialModule,
    FormsModule,
    FlexLayoutModule,
    DragDropModule,
  ],
})
export class FaqModule {}
