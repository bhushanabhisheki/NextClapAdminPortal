export interface Question {
  id: string;
  question: string;
  answer: string;
  last_modified?: string;
  created_date?: string;
  created_by?: string;
  //corresponds to generic or service specific
  questionType?: string;
}
