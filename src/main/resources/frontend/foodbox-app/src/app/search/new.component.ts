  import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, Validators} from "@angular/forms";
  import {NewService} from "./new.service";
  import {IFood} from "../model/food";

@Component({
  selector: 'ks-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {

  private _myImageUrl: string = "http://tinyurl.com/dishBlankImage"

  addFood = this.formBuilder.group({
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
              private newService: NewService,
              private router: Router) {
  }

  get myImageUrl(): string {
    return this._myImageUrl;
  }

  set myImageUrl(value: string) {
    this._myImageUrl = value;

  }


  ngOnInit(): void {

  }


  onSubmit(): void {
    const newFoodItem = <IFood><unknown>{
      id: this.addFood.controls.id.value,
      foodName: this.addFood.controls.foodName.value,
      price: this.addFood.controls.price.value,
      cuisine: this.addFood.controls.cuisine.value,
      description: this.addFood.controls.description.value,
      isEnabled: this.addFood.controls.isEnabled.value,
      imageUrl: this.addFood.controls.imageUrl.value
    }
    this.newService.addFoodItem(newFoodItem).subscribe(data => {
      alert('Dish was added successfully')
      this.router.navigate(['/search'])
    })
  }
}

