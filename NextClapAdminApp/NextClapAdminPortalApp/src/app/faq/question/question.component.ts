import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Question } from 'src/app/shared/models/question';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
})
export class QuestionComponent {
  @Input() query?: Question;
  @Output('edit') editQuery = new EventEmitter();
  @Output('delete') deleteQuery = new EventEmitter<Question>();

  constructor() {}

  onEditQuery() {
    this.editQuery.emit(this.query);
  }

  onDeleteQuestion() {
    this.deleteQuery.emit(this.query);
  }
}
