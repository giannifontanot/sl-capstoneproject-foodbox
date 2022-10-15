import {Component, OnInit} from '@angular/core';
import {PurchaseService} from "../purchase/purchase.service";
import {SearchService} from "../search/search.service";
import {IFood} from "../model/food";
import {UntypedFormBuilder, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {IOrden} from "../model/orden";
import {LoginService} from "../login/login.service";

@Component({
    selector: 'ks-checkout',
    templateUrl: './checkout.component.html',
    styleUrls: ['./checkout.component.css']
})

export class CheckoutComponent implements OnInit {
    cart: IFood[] = []
    cartTotal = this.searchService.absoluteTotal
    checkoutForm = this.formBuilder.group({
        id: [this.loginService.id, Validators.required],
        name: [this.loginService.name, Validators.required],
        contact: [this.loginService.contact, Validators.required],
        credit: [this.loginService.credit, Validators.required]
    });

    constructor(private loginService:LoginService,
                private searchService: SearchService,
                private purchaseService: PurchaseService,
                private formBuilder: UntypedFormBuilder,
                private router: Router) {
    }

    ngOnInit(): void {
        this.cart = this.searchService.getCart()
    }


    onSubmit(): void {

        this.loginService.name = this.checkoutForm.get("name")?.value;
        this.loginService.contact = this.checkoutForm.get("contact")?.value;
        this.loginService.credit = this.checkoutForm.get("credit")?.value;
        this.purchaseService.postPurchase(this.createOrder()).subscribe({
            next: (data: any) => {

                let retVal = JSON.parse(JSON.stringify(data))
                if (JSON.stringify(data) === ("1")) {
                    this.searchService.cart = [];
                    this.router.navigate(["/ordens"])
                }
            },
            error: err => {
                console.error(err.message)
                alert("onSubmit error: " + err.message);
            }
        });
    }

    createOrder(): IOrden {
        this.searchService.orden = {user: this.checkoutForm.value, cart: this.searchService.cart, status: "PENDING"}

        return this.searchService.orden;
    }
}
