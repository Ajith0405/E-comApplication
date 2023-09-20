import { Product } from "./poduct.model";

export interface UserOrderDetails{
    orderId:number;
    orderFullName:string;
    orderFullOrder:string;
    orderContactNumber:string;
    orderAlternateContactNumber:string;
    orderStatus:string;
    orderAmount:string;
    product:Product
    user:any;
}