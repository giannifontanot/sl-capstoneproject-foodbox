import {Component, OnDestroy, OnInit} from '@angular/core';
import {IFood} from "../model/food";
import {SearchService} from "./search.service";
import {Subscription} from "rxjs";
import {LoginService} from "../login/login.service";
import {Router} from "@angular/router";

@Component({
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit, OnDestroy {

    foodsFiltered: IFood[] = [];
    foodsOriginal: IFood[] = [];
    foods: IFood[] = [];
    cart: IFood [] = []
    listFilter: string = '';
    _dishFilter: string = '';
    _cuisineFilter: string = '';
    _descriptionFilter: string = '';
    _priceFilter!: number;
    sub!: Subscription;

    constructor(private searchService: SearchService,
                private loginService: LoginService,
                private router: Router) {
    }

    getLoginService() {
        return this.loginService;
    }

    ngOnInit(): void {
        this.sub = this.searchService.getFoods().subscribe({
            next: data => {
                this.foods = data;
                this.foodsFiltered = this.foods;
                this.foodsOriginal = this.foods;

                return this.foodsFiltered;
            },
            error: err => alert(err)
        });

    }


    get dishFilter(): string {

        return this._dishFilter;
    }

    set dishFilter(value: string) {
        this._dishFilter = value;
        this.foodsFiltered = this.foodsOriginal.filter(
            food => food.foodName.toLowerCase().includes(value.toLowerCase())
                && food.cuisine.toLowerCase().includes(this._cuisineFilter)
                && food.description.toLowerCase().includes(this._descriptionFilter)
                && (this._priceFilter === null || this._priceFilter === undefined ? food.price > 0 : food.price <= this._priceFilter)
        )
    }

    get cuisineFilter(): string {

        return this._cuisineFilter;
    }

    set cuisineFilter(value: string) {
        this._cuisineFilter = value;
        this.foodsFiltered = this.foodsOriginal.filter(
            food => food.cuisine.toLowerCase().includes(value.toLowerCase())
                && food.foodName.toLowerCase().includes(this._dishFilter)
                && food.description.toLowerCase().includes(this._descriptionFilter)
                && (this._priceFilter === null || this._priceFilter === undefined ? food.price > 0 : food.price <= this._priceFilter)
        )
    }

    get descriptionFilter(): string {

        return this._descriptionFilter;
    }

    set descriptionFilter(value: string) {
        console.log("this._priceFilter = " + this._priceFilter)
        this._descriptionFilter = value;
        this.foodsFiltered = this.foodsOriginal.filter(
            food => food.description.toLowerCase().includes(value.toLowerCase())
                && food.foodName.toLowerCase().includes(this._dishFilter)
                && food.cuisine.toLowerCase().includes(this._cuisineFilter)
                && (this._priceFilter === null || this._priceFilter === undefined ? food.price > 0 : food.price <= this._priceFilter)
        )
    }

    get priceFilter(): number {

        return this._priceFilter;
    }

    set priceFilter(value: number) {

        console.log("value: " + value)
        this._priceFilter = value;
        this.foodsFiltered = this.foodsOriginal.filter(
            food => (value === null ? food.price > 0 : food.price <= value)
                && food.foodName.toLowerCase().includes(this._dishFilter)
                && food.cuisine.toLowerCase().includes(this._cuisineFilter)
                && food.description.toLowerCase().includes(this._descriptionFilter)
        )
    }

    ngOnDestroy(): void {
        //this.sub.unsubscribe();
        //food => food.foodName.toLowerCase()
        // .includes(this.listFilter.toLowerCase()
    }

    select(food: IFood) {
        this.searchService.addToCart(food);
    }

    edit(food: IFood): void {
        this.router.navigate(['/editFood', food.id])
    }



    RandomTilt() {
    let tilt: number = 0;
        tilt = Math.floor(Math.random() * 5)+1;
        return "deg-" + tilt
    }

    delete(food: IFood) {
        this.router.navigate(['/deleteFood', food.id])

    }
}
