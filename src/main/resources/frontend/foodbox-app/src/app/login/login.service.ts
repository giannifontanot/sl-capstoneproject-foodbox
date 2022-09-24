import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {catchError, tap} from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})
 export class LoginService {
    userUrl: string = 'http://localhost:8080/login';
    putUrl: string = 'https://62e8570a249bb1284ead379a.mockapi.io/api/v1/users/';
    private isAdmin: boolean = false;
    private isLoggedIn: boolean = false;

    constructor(private http: HttpClient) {
    }

    set admin(isAdmin:boolean){
        this.isAdmin = isAdmin;
    }

    get admin():boolean{
        return this.isAdmin;
    }

    set loggedIn(isLoggedIn:boolean){
        this.isLoggedIn = isLoggedIn;
    }

    get loggedIn():boolean{
        return this.isLoggedIn;
    }


    submitLogin(formValue: any): Observable<any> {
        return this.http.post(this.userUrl, formValue,{responseType: 'text' }).pipe(
            tap(data => {
                console.log("result is: "+data)

            }),
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
