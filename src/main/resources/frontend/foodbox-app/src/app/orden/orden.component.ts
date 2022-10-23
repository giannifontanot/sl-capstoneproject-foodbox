import {Component, OnInit} from '@angular/core';
import {OrdenService} from "./orden.service";
import {IDisplayOrden} from "../model/displayOrden";
import {Subscription} from "rxjs";
import {LoginService} from "../login/login.service";

@Component({
    selector: 'ks-orden',
    templateUrl: './orden.component.html',
    styleUrls: ['./orden.component.css']
})
export class OrdenComponent implements OnInit {

    displayOrdens: IDisplayOrden[] = [];
    sub!: Subscription;

    constructor(private loginService: LoginService,
                private ordenService: OrdenService) {
    }

    ngOnInit(): void {

        let ordenNum: number = this.loginService.id;

        this.sub = this.ordenService.getDisplayOrden(ordenNum).subscribe({
            next: data => {
                this.displayOrdens = data


                let titleUserName: string = "";
                let titleId: number = 0;
                let titleStatus: string = "";
                this.displayOrdens.forEach(orden => {
                    if (orden.id === titleId) {
                        orden.id = 0;
                    } else {
                        titleId = orden.id;
                        titleUserName = "";
                        titleStatus = "";
                    }
                    if (orden.username === titleUserName) {
                        orden.username = "";
                    } else {
                        titleUserName = orden.username
                    }
                    if (orden.status === titleStatus) {
                        orden.status = "";
                    } else {
                        titleStatus = orden.status
                    }


                })

                return this.displayOrdens;
            },
            error: err => alert(err)
        });
    }


    handleError(err: any): void {
        alert(err.message)
    }

    private retClass: string = "";
    private bGris: boolean = true;

    setClass() {

        this.retClass = this.bGris ? "pintaGris0" : "pintaGris1";
        this.bGris = !this.bGris;
        return this.retClass
    }

    getClass() {
        return this.retClass;
    }
}
