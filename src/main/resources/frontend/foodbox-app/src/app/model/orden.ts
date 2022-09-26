import {IFood} from "./food";
import {IUser} from "./user";

export interface IOrden {
    user: IUser;
    cart: IFood[];
    status: string;
}
