import {Component, OnDestroy, OnInit} from '@angular/core';
import {IFood} from "../model/food";
import {SearchService} from "./search.service";
import {Subscription} from "rxjs";

@Component({
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit, OnDestroy {

    foodsFiltered: IFood[] = [];
    foods: IFood[] = [];
    cart: IFood [] = []
    listFilter: string = '';
    sub!: Subscription;

    constructor(private searchService: SearchService) {
    }

    ngOnInit(): void {
        this.sub = this.searchService.getFoods().subscribe({
            next: data => {
                this.foods = data;
                this.foodsFiltered = this.foods;
                return this.foodsFiltered;
            },
            error: err => alert(err)
        });

    }

    search() {
        this.sub = this.searchService.getFoods().subscribe({
            next: data => {
                this.foods = data
                this.foodsFiltered = this.foods.filter(
                    food => food.foodName.toLowerCase().includes(
                        this.listFilter.toLowerCase()
                    )
                )
            },
            error: err => alert(err),

        });
    }

    ngOnDestroy(): void {
        //this.sub.unsubscribe();
        //food => food.foodName.toLowerCase()
        // .includes(this.listFilter.toLowerCase()
    }

    select(food: IFood) {
        this.searchService.addToCart(food);
    }
}
