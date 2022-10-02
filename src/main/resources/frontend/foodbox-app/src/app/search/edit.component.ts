import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {EditService} from "./edit.service";
import {FormBuilder, Validators} from "@angular/forms";
import {IFood} from "../model/food";

@Component({
    selector: 'ks-edit',
    templateUrl: './edit.component.html',
    styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {


    editFood = this.formBuilder.group({
        id: [0, Validators.required],
        description: ['', Validators.required],
        foodName: ['', Validators.required],
        price: [0, Validators.required],
        imageUrl: ['', Validators.required],
        cuisine: ['', Validators.required],
        isEnabled: ['', Validators.required],
    });


    constructor(private formBuilder: FormBuilder,
                private activatedRoute: ActivatedRoute,
                private editService: EditService) {
    }

    ngOnInit(): void {
        console.log("edit ngOnInit")
        this.activatedRoute.paramMap.subscribe(params => {
            this.editService.getFoodItem(params.get("id")).subscribe(data => {

                this.editFood.setValue({
                    id: data.id,
                    description: data.description,
                    foodName: data.foodName,
                    price: data.price,
                    imageUrl: data.imageUrl,
                    cuisine: data.cuisine,
                    isEnabled: data.isEnabled
                });
            })
        })
    }

    onSubmit(): void {

        const editedFood = <IFood><unknown>{
            id: this.editFood.controls.id.value,
            foodName: this.editFood.controls.foodName.value,
            price: this.editFood.controls.price.value,
            cuisine: this.editFood.controls.cuisine.value,
            description: this.editFood.controls.description.value,
            isEnabled: this.editFood.controls.isEnabled.value,
            imageUrl: this.editFood.controls.imageUrl.value
        }
        this.editService.updateFoodItem(editedFood).subscribe(data => {
console.log("data", data)
        })
    }
}
