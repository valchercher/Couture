import { Injectable } from '@angular/core';
import{HttpClient, HttpErrorResponse} from '@angular/common/http'
import { Observable, catchError, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment.development';
@Injectable({
  providedIn: 'root'
})
export abstract class RestService<T> {
    // protected abstract uri():string;
  constructor(private __http:HttpClient) { }

  all(uri:string):Observable<T>{
    return this.__http.get<T>(environment.apiUrl+`${uri}`).pipe(
      tap(reponse=>console.log(reponse)
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