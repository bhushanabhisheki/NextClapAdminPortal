import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, catchError, throwError, tap, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Question } from './question.model';

@Injectable({
  providedIn: 'root',
})
export class FaqService {
  private url: string = environment.apiURL + '/api/v1/faq/';
  private queryList?: Question[];
  queryListChanged = new Subject<Question[] | undefined>();

  constructor(private http: HttpClient) {}

  getAllQueries(serviceID: number) {
    this.http.get<any>(this.url + serviceID, {}).subscribe((response) => {
      this.queryList = response.faqList;
      this.queryListChanged?.next(this.queryList);
      console.log(this.queryList);
    });
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    console.log(errorRes);
    if (!errorRes.error) {
      return throwError(() => new Error(errorMessage));
    }
    return throwError(() => new Error(errorRes.error.message));
  }
}
