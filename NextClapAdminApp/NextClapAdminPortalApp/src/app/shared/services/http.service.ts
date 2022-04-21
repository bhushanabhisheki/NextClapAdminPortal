import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, shareReplay } from 'rxjs/operators';
import { HttpOptions } from '../models/http-options.model';
//import { timer } from 'rxjs';

const CACHE_SIZE = 1; //  the number of elements that are cached and replayed for every subscriber
// const REFRESH_INTERVAL = 1000000; // in milliseconds
@Injectable({ providedIn: 'root' })
export class ApiService {
  public responseCache = new Map();
  constructor(private http: HttpClient) {}

  get(path: string, options: HttpOptions = {}): Observable<any> {
    // const refreshTimer = timer(0, REFRESH_INTERVAL);
    let fromCache = this.responseCache.get(path + options.params?.toString());

    if (!fromCache) {
      /* ToDo: Implementation of auto-refresh
      fromCache = refreshTimer.pipe(
        switchMap(_ => this.getRequest(path, options)),
        shareReplay(CACHE_SIZE)
      ); */

      fromCache = this.getRequest(path, options).pipe(shareReplay(CACHE_SIZE));
      this.responseCache.set(path + options.params?.toString(), fromCache);
    }
    return fromCache;
  }

  private getRequest(path: string, options: HttpOptions = {}) {
    return this.http
      .get(`${path}`, options)
      .pipe(catchError(this.formatErrors));
  }

  put(
    path: string,
    body: Object = {},
    options: HttpOptions = {}
  ): Observable<any> {
    return this.http
      .put(`${path}`, JSON.stringify(body), options)
      .pipe(catchError(this.formatErrors));
  }

  post(path: string, body: Object = {}): Observable<any> {
    return this.http
      .post(`${path}`, JSON.stringify(body))
      .pipe(catchError(this.formatErrors));
  }

  delete(path: string, options: HttpOptions = {}): Observable<any> {
    return this.http
      .delete(`${path}`, options)
      .pipe(catchError(this.formatErrors));
  }

  private formatErrors(error: any) {
    return throwError(error.error);
  }
}
