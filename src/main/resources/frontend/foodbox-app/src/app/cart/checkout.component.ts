import {Component, OnInit} from '@angular/core';
import {SearchService} from "../search/search.service";
import {IFood} from "../model/food";
import {UntypedFormBuilder} from "@angular/forms";
import {Router} from "@angular/router";
import {IOrder} from "../model/order";

@Component({
    selector: 'ks-checkout',
    templateUrl: './checkout.component.html',
    styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
    cart: IFood[] = []
    cartTotal = this.searchService.absoluteTotal
    checkoutForm = this.formBuilder.group({
        name: '',
        address: '',
        credit: ''
    });

    constructor(private searchService: SearchService,
                private formBuilder: UntypedFormBuilder,
                private router: Router) {
    }

    ngOnInit(): void {
        this.cart = this.searchService.getCart()
    }

    onSubmit(): void {
        this.searchService.postPurchase(this.createOrder()).subscribe({
            next: (data: any) => {
                const parsed = JSON.parse(JSON.stringify(data))


                let retVal = parsed.return
                console.log(">>> " + retVal)
                if (retVal === ("OK")) {

                    this.router.navigate(["/purchase"])
                }
            },
            error: err => {
                console.error(err.message)
                alert("error: " + err.message);
            }
        });
    }

    createOrder(): IOrder {
        this.searchService.order = {client: this.checkoutForm.value, cart: this.searchService.cart}
        return this.searchService.order;
    }
}