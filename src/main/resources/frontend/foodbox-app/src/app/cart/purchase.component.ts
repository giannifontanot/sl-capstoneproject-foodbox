import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {SearchService} from "../search/search.service";
import {IClient} from "../model/client";
import {IFood} from "../model/food";

@Component({
    selector: 'ks-purchase',
    templateUrl: './purchase.component.html',
    styleUrls: ['./purchase.component.css']
})
export class PurchaseComponent implements OnInit {

    client!: IClient;
    cart!: IFood[];
    absoluteTotal: number = 0;

    constructor(private router: Router,
                private searchService: SearchService) {
    }

    ngOnInit(): void {
        this.client = this.searchService.order.client
        this.cart = this.searchService.order.cart
        this.absoluteTotal = this.searchService.absoluteTotal
    }

    jumpToSearch() {
        this.router.navigate(['/search'])
    }
}
