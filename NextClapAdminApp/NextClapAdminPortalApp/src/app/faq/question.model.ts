import { Answer } from './answer.model';

export class Question {
  constructor(
    public id: string,
    public question: string,
    public answers: Answer[],
    public created_date: string,
    public last_modified: string,
    public service: any
  ) {}
}
