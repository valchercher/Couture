import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { environement } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export abstract class  RestserviseService<T> {

  constructor(private _http:HttpClient) { }

  all(uri:string):Observable<T>{
    return this._http.get<T>(environement.urlart+`${uri}`).pipe(
      tap(response=>console.log(response)
      ),
      catchError(this.handleError)
    )
  }
  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else {
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}
