import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {DeleteService} from "./delete.service";
import {FormBuilder, Validators} from "@angular/forms";
import {IFood} from "../model/food";

@Component({
  selector: 'ks-edit',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {


  deleteFood = this.formBuilder.group({
    id: [0, Validators.required],
    description: ['', Validators.required],
    foodName: ['', Validators.required],
    price: [0, Validators.required],
    imageUrl: ['', Validators.required],
    cuisine: ['', Validators.required],
    isEnabled: ['Y', Validators.required],
  });


  constructor(private formBuilder: FormBuilder,
              private activatedRoute: ActivatedRoute,
              private deleteService: DeleteService,
              private router: Router) {
  }

  ngOnInit(): void {
    console.log("delete ngOnInit")
    this.activatedRoute.paramMap.subscribe(params => {
      this.deleteService.getFoodItem(params.get("id")).subscribe(data => {

        this.deleteFood.setValue({
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

  ;
  onSubmit(): void {


    this.deleteService.deleteFoodItem(Number(this.deleteFood.controls.id.value)).subscribe(data => {
      alert('Dish was deleted successfully')
      this.router.navigate(['/search'])
    })
  }
}
