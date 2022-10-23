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
        username: ['mike', Validators.required],
        password: ['chicago2022', Validators.required]
    })

    constructor(private loginService: LoginService,
                private router: Router,
                private formBuilder: UntypedFormBuilder) {
    }

    onSubmit(): void {

        this.loginService.submitLogin(this.loginForm.value).subscribe({
            next: (data) => {
                data.profile !== "F"?this.isLoggedIn = true:this.isLoggedIn = false;
                data.profile === "A"?this.isAdmin = true:this.isAdmin = false;

                this.getLoginService().loggedIn = this.isLoggedIn;
                this.getLoginService().admin = this.isAdmin;
                this.getLoginService().id = data.id;
                this.getLoginService().name = data.name;
                this.getLoginService().contact = data.contact;
                this.getLoginService().credit = data.credit;

            },
            error: (err => console.error("ERROR: > " + err))
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

        return this.getLoginService().admin?"bg-secondary text-light adminBorder":"bg-warning text-light";
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
