import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {SearchService} from "../search/search.service";
import {IUser} from "../model/user";
import {IFood} from "../model/food";

@Component({
    selector: 'ks-purchase',
    templateUrl: './purchase.component.html',
    styleUrls: ['./purchase.component.css']
})
export class PurchaseComponent implements OnInit {

    user!: IUser;
    cart!: IFood[];
    absoluteTotal: number = 0;

    constructor(private router: Router,
                private searchService: SearchService) {
    }

    ngOnInit(): void {
        this.user = this.searchService.orden.user
        this.cart = this.searchService.orden.cart
        this.absoluteTotal = this.searchService.absoluteTotal
    }

    jumpToSearch() {
        this.router.navigate(['/search'])
    }
}
