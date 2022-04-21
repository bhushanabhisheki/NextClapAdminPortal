import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Question } from '../shared/models/question';

@Injectable({
  providedIn: 'root',
})
export class FaqService {
  private url: string = 'http://localhost:4000/api/v1/faq/1';

  constructor(private http: HttpClient) {}

  getQuestionList(): Observable<Question[]> {
    return this.http.get<Question[]>(this.url).pipe(
      map((response) => {
        console.log(response);
        return response;
      })
    );
  }
}
