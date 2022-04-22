import { Component, Input, OnInit } from '@angular/core';
import { Answer } from '../answer.model';

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.scss'],
})
export class AnswerComponent implements OnInit {
  @Input() answer?: Answer;
  @Input() editMode: boolean = true;
  answerInput?: string = '';
  constructor() {}

  ngOnInit(): void {
    this.answerInput = this.answer?.answer;
  }
}
