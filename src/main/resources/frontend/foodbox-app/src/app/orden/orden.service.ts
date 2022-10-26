import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {catchError, tap} from "rxjs/operators";
import {Observable, throwError} from "rxjs";
import {IDisplayOrden} from "../model/displayOrden";
import {LoginService} from "../login/login.service";


@Injectable({
  providedIn: 'root'
})
export class OrdenService {
  httpOptions = {
    headers: new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    })
  };

  baseUrl: string = this.loginService.baseUrl;
  ordenUrl: string = this.baseUrl + '/cart/getDisplayOrden/';
  constructor(private http: HttpClient,
              private loginService: LoginService) {

  }


  getDisplayOrden(ordenNum: number): Observable<IDisplayOrden[]> {
    return this.http.get<IDisplayOrden[]>(this.ordenUrl + ordenNum, this.httpOptions).pipe(
        tap(data => data),
        catchError(this.handleError)

    );
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
