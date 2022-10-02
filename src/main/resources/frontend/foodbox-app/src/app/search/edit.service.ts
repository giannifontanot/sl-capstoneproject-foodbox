import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {IFood} from "../model/food";
import {catchError, tap} from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})
export class EditService {
    getFoodItemUrl: string = 'http://localhost:8080/food/getFoodItem/';
    updateFoodItemUrl: string = 'http://localhost:8080/food/updateFoodItem/';

    httpOptions = {
        headers: new HttpHeaders({
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        })
    };
    constructor(private http: HttpClient) {
    }

    getFoodItem(id: string | null): Observable<IFood> {
        console.log("getFood: " + id);
        return this.http.get<IFood>(this.getFoodItemUrl + id);
    }

    updateFoodItem(food: IFood): Observable<IFood> {


        return this.http.post<IFood>(this.updateFoodItemUrl, food, this.httpOptions).pipe(
            tap(data => console.log(JSON.stringify(data))),
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
