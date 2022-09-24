import {Injectable} from '@angular/core';
import {IFood} from "../model/food";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {catchError, tap} from "rxjs/operators";
import {IOrder} from "../model/order";
import {NotificationType} from "../notification/notification.message";
import {NotificationService} from "../notification/notification.service";


@Injectable({
    providedIn: 'root'
})
export class SearchService {
    // foodUrl: string = 'api/foods.json';
    foodUrl: string = 'http://localhost:8080/food/getAllFoods';
    postPurchaseUrl: string = 'https://62e8570a249bb1284ead379a.mockapi.io/api/v1/purchase';
    cart: IFood[] = [];
    order!: IOrder;
    absoluteTotal: number = 0;

    constructor(private http: HttpClient, private notificationService: NotificationService) {
    }

    getFoods(): Observable<IFood[]> {
        return this.http.get<IFood[]>(this.foodUrl).pipe(
            tap(data => data),
            catchError(this.handleError)
        );
    }

    postPurchase(order: any): Observable<any> {
        return this.http.post<any>(this.postPurchaseUrl, order).pipe(
            tap(data => console.log(JSON.stringify(data))),
            catchError(this.handleError)
        );
    }

    handleError(error: HttpErrorResponse) {
        let errorMessage
        if (error.error instanceof ErrorEvent) {
            errorMessage = `An error occurred: ${error.error.message}`;
        } else {
            errorMessage = `Server returned code: ${error.status}, error message is: ${error.message}`;
        }
        console.error(errorMessage);
        return throwError(errorMessage);
    }

    addToCart(food: IFood) {
        this.cart.push(food);
        this.notificationService.sendMessage({text: food.foodName + " added to cart", type: NotificationType.success});

    }

    getCart(): IFood[] {
        return this.cart;
    }

    removeItem(food: IFood) {

        let foodIdToDelete = (element: { id: number; }) => food.id === element.id;

        let index = this.cart.findIndex(foodIdToDelete)
        this.cart.splice(index, 1)
        this.notificationService.sendMessage({
            text: food.foodName + " removed from cart",
            type: NotificationType.error
        });
    }

    getTotal(): number {
        this.absoluteTotal = 0;
        this.cart.forEach(item => this.absoluteTotal += item.price)
        return this.absoluteTotal;
    }
}