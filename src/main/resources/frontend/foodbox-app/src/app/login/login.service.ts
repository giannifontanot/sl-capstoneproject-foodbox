import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {catchError, tap} from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})
export class LoginService {
    userUrl: string = 'https://62e8570a249bb1284ead379a.mockapi.io/api/v1/users';
    putUrl: string = 'https://62e8570a249bb1284ead379a.mockapi.io/api/v1/users/';

    constructor(private http: HttpClient) {
    }

    submitLogin(formValue: any): Observable<any> {
        return this.http.post(this.userUrl, formValue).pipe(
            tap(data => data),
            catchError(err => this.handleError(err))
        )

    }

    changePassword(formValue: any): Observable<any> {
        return this.http.put(this.putUrl + "/" + formValue.idx, formValue).pipe(
            tap(data => data),
            catchError(err => this.handleError(err))
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
