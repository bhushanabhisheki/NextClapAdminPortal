import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import * as moment from 'moment';
import { Question } from 'src/app/faq/question.model';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
})
export class QuestionComponent implements OnInit {
  @Input() query?: Question;
  @Output('edit') editQuery = new EventEmitter();
  @Output('delete') deleteQuery = new EventEmitter<Question>();

  ngOnInit() {
    console.log('Question component initialized');
  }

  onEditQuery() {
    this.editQuery.emit(this.query);
  }

  onDeleteQuestion() {
    this.deleteQuery.emit(this.query);
  }

  getFormattedCreationDate() {
    if (this.query) {
      return moment(new Date(this.query.created_date)).format('DD-MMM-YYYY');
    }
    return 'Not Known';
  }

  getFormattedLastDate() {
    if (this.query) {
      return moment(new Date(this.query.last_modified)).format('DD-MMM-YYYY');
    }
    return 'Not Known';
  }
}
