import {Injectable} from '@angular/core';
import {IFood} from "../model/food";
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {catchError, tap} from "rxjs/operators";
import {IOrden} from "../model/orden";

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {
  // foodUrl: string = 'api/foods.json';
  baseUrl: string = "http://foodboxapp-env.eba-5ye8smp8.us-west-2.elasticbeanstalk.com"
  foodUrl: string = this.baseUrl + '/food/getAllFoods';
  postPurchaseUrl: string = this.baseUrl + '/cart/postPurchase';
  cart: IFood[] = [];
  absoluteTotal: number = 0;

  constructor(private http: HttpClient) {
  }

  postPurchase(orden: IOrden): Observable<any> {

    const httpOptions = {
      headers: new HttpHeaders({ 'Accept': 'application/json', 'Content-Type': 'application/json' })
    };

    return this.http.post<any>(this.postPurchaseUrl, JSON.stringify(orden), httpOptions).pipe(
        tap(data => (data)),
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