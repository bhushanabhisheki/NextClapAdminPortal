import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Question } from '../models/question';

@Injectable({
  providedIn: 'root',
})
export class FAQService {
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
