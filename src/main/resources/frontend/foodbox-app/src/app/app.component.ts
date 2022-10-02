import {Component, OnInit} from '@angular/core';
import {LoginService} from './login/login.service';
import {Router} from "@angular/router";
import {UntypedFormBuilder, Validators} from '@angular/forms';
import {IOrden} from "./model/orden";


@Component({
    selector: 'fb-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
    pageTitle = 'FoodBox';
    activeTab = 'search';
    isAdmin: boolean = false;
    isLoggedIn: boolean = false;

    loginForm = this.formBuilder.group({
        username: ['', Validators.required],
        password: ['', Validators.required]
    })

    constructor(private loginService: LoginService,
                private router: Router,
                private formBuilder: UntypedFormBuilder) {
    }

    onSubmit(): void {

        this.loginService.submitLogin(this.loginForm.value).subscribe({
            next: (data) => {
                data !== "F"?this.isLoggedIn = true:this.isLoggedIn = false;
                data === "A"?this.isAdmin = true:this.isAdmin = false;

                this.getLoginService().loggedIn = this.isLoggedIn;
                this.getLoginService().admin = this.isAdmin;
            },
            error: (err => console.log("ERROR: > " + err))
        });
    }

    getLoginService(): LoginService {
        return this.loginService;
    }

    getUsername(): string{

        // @ts-ignore
        return this.loginForm.get('username').value;
    }

    getUsernameClass(): string{

        return this.getLoginService().admin?"bg-danger text-light":"bg-warning text-light";
    }

    getUsernameProfile(): string{

        return this.getLoginService().admin?" - ADMIN":"";
    }

    search(activeTab: string) {
        this.activeTab = activeTab;
    }

    result(activeTab: string) {
        this.activeTab = activeTab;
    }

    ngOnInit(): void {
    }


}
