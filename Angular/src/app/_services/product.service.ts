import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../_model/poduct.model';
import { OrderDetails } from '../_model/order-details-model';
import { UserOrderDetails } from '../_model/userOrder.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpclient:HttpClient) { }

  public addProduct(product:FormData){
    return this.httpclient.post<Product>("http://localhost:9007/addNewProduct",product);
  }

  public getAllProducts(pageNumber:number,searchKeyword:string =""){
    return this.httpclient.get<Product[]>("http://localhost:9007/getAllProducts?pageNumber="+pageNumber+"&searchKey="+searchKeyword);
  }

  public deleteProduct(productId:any){
    return this.httpclient.delete("http://localhost:9007/deleteProductDetails/"+productId);
  }

  public getProductDetailsById(productId:number){
    return this.httpclient.get<Product>("http://localhost:9007/getProductDetailsById/"+productId);
  }

  public getProductDetails(isSingleProductCheckout:any,productId:any){
    return this.httpclient.get<Product[]>("http://localhost:9007/getProductDetails/"+isSingleProductCheckout+"/"+productId)

  }

  public placeOrdeer(orderDetails:OrderDetails, isCartCheckout:any){
    return this.httpclient.post("http://localhost:9007/placeOrder/"+isCartCheckout,orderDetails)
  }

  public addToCart(productId:number){
    return this.httpclient.get("http://localhost:9007/addToCart/"+productId);
  }

  public getCartDetails(){
    return this.httpclient.get("http://localhost:9007/getCartDetails");
  }

  public deleteCartItem(cartId:any){
    return this.httpclient.delete("http://localhost:9007/deleteCartItem/"+cartId);
  }

  public getMyOrders():Observable<UserOrderDetails[]>{
    return this.httpclient.get<UserOrderDetails[]>("http://localhost:9007/getOrderDetails");
  }

  public getAllOrdersDetails():Observable<UserOrderDetails[]>{
    return this.httpclient.get<UserOrderDetails[]>("http://localhost:9007/getAllOrderDetails");
  }

  public delivered(orderId:any){
      return this.httpclient.get("http://localhost:9007/orderAsDelivered/"+orderId);
  }


}
