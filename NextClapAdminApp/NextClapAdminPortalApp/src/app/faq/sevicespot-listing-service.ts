import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Question } from './question.model';
import { ServiceModel } from './service.model';

@Injectable({
  providedIn: 'root',
})
export class SeviceSpotListingService {
  private url: string = environment.apiURL + '/api/v1/service';
  private serviceList?: ServiceModel[];
  serviceListChanged = new Subject<ServiceModel[] | undefined>();

  constructor(private http: HttpClient) {}

  getAllQueries() {
    this.http.get<any>(this.url, {}).subscribe((response) => {
      this.serviceList = response.services;
      this.serviceListChanged?.next(this.serviceList);
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
