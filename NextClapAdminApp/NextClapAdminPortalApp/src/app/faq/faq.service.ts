import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Question } from '../shared/models/question';

@Injectable({
  providedIn: 'root',
})
export class FaqService {
  private url: string = '/data/faqlist';

  constructor(private http: HttpClient) {}

  getQuestionList(): Observable<Question[]> {
    return this.http.get<Question[]>(this.url).pipe(
      map((response) => {
        return response;
      })
    );
  }
}
