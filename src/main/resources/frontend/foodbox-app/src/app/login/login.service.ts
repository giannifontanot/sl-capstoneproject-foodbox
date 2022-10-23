import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {catchError, tap} from "rxjs/operators";
import {IUser} from "../model/user";

@Injectable({
    providedIn: 'root'
})
export class LoginService {
    baseUrl: string = "http://foodboxapp-env.eba-5ye8smp8.us-west-2.elasticbeanstalk.com"
    userUrl: string = this.baseUrl + '/login';
    putUrl: string = 'https://62e8570a249bb1284ead379a.mockapi.io/api/v1/users/';
    private isAdmin: boolean = false;
    private isLoggedIn: boolean = false;
    private _id!: number;
    private _name!: string;
    private _contact!: string;
    private _credit!: string;



    constructor(private http: HttpClient) {
    }

    set credit(credit: string) {
        this._credit = credit;
    }

    get credit(): string {
        return this._credit;
    }

    set contact(contact: string) {
        this._contact = contact;
    }

    get contact(): string {
        return this._contact;
    }

    set name(name: string) {
        this._name = name;
    }

    get name(): string {
        return this._name;
    }

    set id(id: number) {
        this._id = id;
    }

    get id(): number {
        return this._id;
    }

    set admin(isAdmin: boolean) {
        this.isAdmin = isAdmin;
    }

    get admin(): boolean {
        return this.isAdmin;
    }

    set loggedIn(isLoggedIn: boolean) {
        this.isLoggedIn = isLoggedIn;
    }

    get loggedIn(): boolean {
        return this.isLoggedIn;
    }

    submitLogin(formValue: any): Observable<IUser> {
        const httpOptions = {
            headers: new HttpHeaders({'Accept': 'application/json', 'Content-Type': 'application/json'})
        };

        return this.http.post<IUser>(this.userUrl, formValue, httpOptions).pipe(
            tap(data => {(data)}),
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
        alert(`Login Error. \n\nVerify your username and password are correct.\nAlso verify you use the link provided for the application:\nhttp://foodbox.s3.us-west-2.amazonaws.com/index.html (http, not https)`);
        return throwError(errorMessage);
    }

}
