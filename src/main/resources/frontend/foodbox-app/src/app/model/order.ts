import {IFood} from "./food";
import {IClient} from "./client";

export interface IOrder {
    client: IClient;
    cart: IFood[];
}
