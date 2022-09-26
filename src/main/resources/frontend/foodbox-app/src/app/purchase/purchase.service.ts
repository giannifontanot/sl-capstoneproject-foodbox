import {Injectable} from '@angular/core';
import {IFood} from "../model/food";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {catchError, tap} from "rxjs/operators";
import {IOrden} from "../model/orden";

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {
  // foodUrl: string = 'api/foods.json';
  foodUrl: string = 'http://localhost:8080/food/getAllFoods';
  postPurchaseUrl: string = 'http://localhost:8080/cart/placeOrden';
  cart: IFood[] = [];
  absoluteTotal: number = 0;

  constructor(private http: HttpClient) {
  }

  postPurchase(orden: IOrden): Observable<any> {
    return this.http.post<any>(this.postPurchaseUrl, orden).pipe(
        tap(data => console.log(JSON.stringify(data))),
        catchError(this.handleError)
    );
  }

  handleError(error: HttpErrorResponse) {
    let errorMessage
    if (error.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${error.error.message}`;
    } else {
      errorMessage = `Server returned code: ${error.status}, error message is: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }

}