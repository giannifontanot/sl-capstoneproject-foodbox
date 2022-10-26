import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {IFood} from "../model/food";
import {catchError, tap} from "rxjs/operators";
import {LoginService} from "../login/login.service";

@Injectable({
  providedIn: 'root'
})
export class DeleteService {
  baseUrl: string = this.loginService.baseUrl;
  getFoodItemUrl: string = this.baseUrl + '/food/getFoodItem/';
  deleteFoodItemUrl: string = this.baseUrl + '/food/deleteFoodItem/';

  httpOptions = {
    headers: new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    })
  };
  constructor(private http: HttpClient,
              private loginService: LoginService) {
  }

  getFoodItem(foodId: string | null): Observable<IFood> {
    return this.http.get<IFood>(this.getFoodItemUrl + foodId);
  }

  deleteFoodItem(foodId: number | null): Observable<IFood> {


    return this.http.delete<IFood>(this.deleteFoodItemUrl + foodId, this.httpOptions).pipe(
        tap(data => data),
        catchError(this.handleError)
    )
  }


  private handleError(err: HttpErrorResponse) {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      errorMessage = ` ------> An error occurred: ${err.error.message}`;
    } else {
      errorMessage = ` ------> Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(() => errorMessage);
  }
}
