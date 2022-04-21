import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, catchError, throwError, tap, Subject } from 'rxjs';
import { Question } from './question.model';

@Injectable({
  providedIn: 'root',
})
export class FaqService {
  private url: string = 'http://localhost:4000/api/v1/faq/';
  queryList: Subject<Question[]> = new Subject<Question[]>();

  constructor(private http: HttpClient) {}

  getQueryList(serviceId: string) {
    this.http.get<any>(this.url + serviceId, {}).subscribe((response) => {
      this.queryList.next(response.faqList);
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
