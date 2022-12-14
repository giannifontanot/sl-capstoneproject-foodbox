import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {IFood} from "../model/food";
import {catchError, tap} from "rxjs/operators";
import {LoginService} from "../login/login.service";

@Injectable({
  providedIn: 'root'
})
export class NewService {
  baseUrl: string = this.loginService.baseUrl;
  addFoodItemUrl: string = this.baseUrl + '/food/addFoodItem/';

  httpOptions = {
    headers: new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    })
  };
  constructor(private http: HttpClient,
              private loginService: LoginService) {
  }



  addFoodItem(food: IFood): Observable<IFood> {


    return this.http.post<IFood>(this.addFoodItemUrl, food, this.httpOptions).pipe(
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
