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
        username: [this.loginService.name, Validators.required],
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
        this.purchaseService.postPurchase(this.createOrder()).subscribe({
            next: (data: any) => {


                let retVal = JSON.parse(JSON.stringify(data))
                // let retVal = JSON.stringify(data)
                if (retVal === ("OK")) {

                    this.router.navigate(["/purchase"])
                }
            },
            error: err => {
                console.error(err.message)
                alert("onSubmit error: " + err.message);
            }
        });
    }

    createOrder(): IOrden {
        this.searchService.orden = {user: this.checkoutForm.value, cart: this.searchService.cart, status: "PEND"}

        console.log("this.searchService.order: " + JSON.stringify(this.searchService.orden))
        console.log("this.checkoutForm.value: " + JSON.stringify(this.checkoutForm.value))
        console.log("this.searchService.cart: " + JSON.stringify(this.searchService.cart))
        return this.searchService.orden;
        //    this.searchService.order: {"client":{"name":"","address":"","credit":""},"cart":[{"id":2,"foodName":"2 Mole Verde","price":20,"cuisine":"CUBAN","description":"2Receta de la abuelita de mole verde","isEnabled":"Y","imageUrl":"tinyurl.com/moleVerdeImagex"},{"id":1,"foodName":"Kebab","price":10,"cuisine":"ARAB","description":"como una gordita guenisima","isEnabled":"Y","imageUrl":"tinyurl.com/moleVerdeImagex"}]}
    }
}
