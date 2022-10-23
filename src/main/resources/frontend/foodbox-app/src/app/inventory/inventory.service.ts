import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {catchError, tap} from "rxjs/operators";
import {IFood} from "../model/food";

@Injectable({
    providedIn: 'root'
})
export class InventoryService {
    urlSave: string = "https://62e8570a249bb1284ead379a.mockapi.io/api/v1/foods";
    urlDelete: string = "https://62e8570a249bb1284ead379a.mockapi.io/api/v1/foods";
    urlGet: string = 'https://62e8570a249bb1284ead379a.mockapi.io/api/v1/foods';
    admin: boolean = false;

    constructor(private http: HttpClient) {
    }

    saveNewItem(inventoryGroup: any): Observable<any> {
        return this.http.post(this.urlSave, inventoryGroup).pipe(
            tap(data => (data)),
            catchError(this.handleError)
        );
    }

    deleteItem(foodId: number): Observable<any> {
        return this.http.delete(this.urlDelete + "/" + foodId).pipe(
            tap(data => (data)),
            catchError(this.handleError)
        );
    }

    getFoods(): Observable<IFood[]> {
        return this.http.get<IFood[]>(this.urlGet).pipe(
            tap(data => data),
            catchError(this.handleError)
        )
    }

    handleError(err: HttpErrorResponse) {
        let errorMessage = '';
        if (err.error instanceof ErrorEvent) {
            errorMessage = `An error occurred: ${err.error.message}`;
        } else {
            errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
        }
        console.error(errorMessage);
        return throwError(() => errorMessage);
    }
}
