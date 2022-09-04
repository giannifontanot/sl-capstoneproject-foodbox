import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';
import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {SearchComponent} from './search/search.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {CartComponent} from './cart/cart.component';
import {CheckoutComponent} from './cart/checkout.component';
import {InventoryComponent} from './inventory/inventory.component';
import {PurchaseComponent} from './cart/purchase.component';
import {ChangeComponent} from './login/change.component';
import {DemoComponent} from './demo/demo.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ToastrModule} from 'ngx-toastr';

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        SearchComponent,
        CartComponent,
        CheckoutComponent,
        InventoryComponent,
        PurchaseComponent,
        ChangeComponent,
        DemoComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        BrowserAnimationsModule,
        ToastrModule.forRoot(),
        RouterModule.forRoot([
            {path: '', component: SearchComponent},
            {path: 'demo', component: DemoComponent},
            {path: 'search', component: SearchComponent},
            {path: 'login', component: LoginComponent},
            {path: 'inventory', component: InventoryComponent},
            {path: 'cart', component: CartComponent},
            {path: 'checkout', component: CheckoutComponent},
            {path: 'purchase', component: PurchaseComponent},
            {path: 'changePassword', component: ChangeComponent},
        ]),
        FormsModule,
        ReactiveFormsModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}


