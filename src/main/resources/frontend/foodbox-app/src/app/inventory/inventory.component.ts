import {Component, OnInit} from '@angular/core';
import {UntypedFormBuilder} from "@angular/forms";
import {IFood} from "../model/food";
import {Subscription} from "rxjs";
import {InventoryService} from "./inventory.service";
import {Router} from "@angular/router";
import {NotificationService} from "../notification/notification.service";
import {LoginService} from "../login/login.service";

@Component({
    selector: 'fb-inventory',
    templateUrl: '/inventory.component.html',
    styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {
    inventoryGroup = this.formBuilder.group({
        foodId: '',
        foodName: '',
        price: ''
    })

    sub!: Subscription;
    errMsg!: string;
    foods: IFood[] = [];
    result: any;
    admin: boolean = this.inventoryService.admin;

    constructor(private formBuilder: UntypedFormBuilder,
                private inventoryService: InventoryService,
                private router: Router,
                private loginService: LoginService,
                private notificationService: NotificationService
    ) {
    }

    onSubmit(): void {
        this.inventoryService.saveNewItem(this.inventoryGroup.value).subscribe({
            next: (data: any) => {
                const parsed = JSON.parse(JSON.stringify(data))
                let retVal: string = parsed.return
                if (retVal === ("OK")) {
                    alert("Item saved successfully.")
                    this.refreshList();
                } else {
                    alert("error: ");
                }
            },
            error: (error: any) => {
                alert("error: " + error.message)
            }
        });
    }

    onDelete(item: IFood) {
        this.inventoryService.deleteItem(item.id).subscribe({
            next: (data) => {
                const deleteOp = JSON.parse(JSON.stringify(data))
                let retVal = deleteOp.return
                if (retVal === ("OK")) {
                    alert("Item deleted successfully.")
                    this.refreshList();
                } else {
                    alert("error:")
                }
            },
            error: (error: any) => {
                alert("error: " + error.message)
            }
        });
    }

    ngOnInit(): void {
        this.refreshList();
    }

    refreshList(): void {
        this.sub = this.inventoryService.getFoods().subscribe({
            next: data => {
                this.foods = data
            },
            error: error => this.errMsg = error
        });
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

    jumpToLogin() {
        this.router.navigate(["/login"])
    }
}
