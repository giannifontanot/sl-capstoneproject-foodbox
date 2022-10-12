import { Component, OnInit } from '@angular/core';
import {SearchService} from "../search/search.service";
import {FormBuilder} from "@angular/forms";
import {IFood} from "../model/food";

@Component({
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cart: IFood[] = [];
  total: number = this.searchService.absoluteTotal;
  constructor(private searchService: SearchService) { }

  ngOnInit(): void {
    this.cart = this.searchService.getCart();
    this.searchService.getTotal();
    this.total = this.searchService.getTotal()
  }

  removeItem(food: IFood) {
    this.searchService.removeItem(food)
    this.total = this.searchService.getTotal()
  }

  RandomTilt() {
    let tilt: number = 0;
    tilt = Math.floor(Math.random() * 5)+1;
    return "deg-" + tilt
  }
}
