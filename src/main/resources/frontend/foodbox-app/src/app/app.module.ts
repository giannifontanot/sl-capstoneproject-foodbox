import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';
import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {SearchComponent} from './search/search.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {CartComponent} from './cart/cart.component';
import {CheckoutComponent} from './checkout/checkout.component';
import {InventoryComponent} from './inventory/inventory.component';
import {ChangeComponent} from './login/change.component';
import {DemoComponent} from './demo/demo.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ToastrModule} from 'ngx-toastr';
import { OrdenComponent } from './orden/orden.component';
import { LogoutComponent } from './login/logout.component';
import { EditComponent } from './search/edit.component';
import { DeleteComponent } from './search/delete.component';
import { NewComponent } from './search/new.component';
import { AboutComponent } from './about/about.component';

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        SearchComponent,
        CartComponent,
        CheckoutComponent,
        InventoryComponent,
        ChangeComponent,
        DemoComponent,
        OrdenComponent,
        LogoutComponent,
        EditComponent,
        DeleteComponent,
        NewComponent,
        AboutComponent
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
            {path: 'ordens', component: OrdenComponent},
            {path: 'inventory', component: InventoryComponent},
            {path: 'cart', component: CartComponent},
            {path: 'checkout', component: CheckoutComponent},
            {path: 'logout', component: LogoutComponent},
            {path: 'login', component: AppComponent},
            {path: 'editFood/:id', component: EditComponent},
            {path: 'deleteFood/:id', component: DeleteComponent},
            {path: 'newFood', component: NewComponent},
            {path: 'about', component: AboutComponent},
        ]),
        FormsModule,
        ReactiveFormsModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}


