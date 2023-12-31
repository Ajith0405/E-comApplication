import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { OrderDetails } from '../_model/order-details-model';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../_model/poduct.model';
import { ProductService } from '../_services/product.service';

@Component({
  selector: 'app-buy-product',
  templateUrl: './buy-product.component.html',
  styleUrls: ['./buy-product.component.css']
})
export class BuyProductComponent {

  productDetails:Product[] =[];

  orderDetails:OrderDetails ={
    fullName: '',
    fullAddress: '',
    contactNumber: '',
    alternateContactNumber: '',
    orderProductQuantityList: []
  }

  isSingleProductCheckout:any = '';

    constructor( private activatedRoute:ActivatedRoute,
      private productService:ProductService,
      private router:Router){}

    ngOnInit():void{
      this.productDetails = this.activatedRoute.snapshot.data['productDetails'];
      this.isSingleProductCheckout = this.activatedRoute.snapshot.paramMap.get("isSingleProductCheckout");

      

      this.productDetails.forEach(
        x => this.orderDetails.orderProductQuantityList.push(
          {productId:x.productId,quantity:1}
        )
      );
      console.log(this.productDetails);
      
      console.log(this.orderDetails);
      
    }

  placeOrder(orderForm:NgForm){
      this.productService.placeOrdeer(this.orderDetails,  this.isSingleProductCheckout).subscribe(
        (resp)=>{
          console.log(resp);
          orderForm.reset();
          this.router.navigate(["/orderConfirmation"]);
        },(err)=>{
          console.log(err);
          
        }
      )
  }

  getQuantityOfProduct(productId:any){
    const filteredProduct = this.orderDetails.orderProductQuantityList.filter(
      (productQuantity)=>productQuantity.productId === productId
    );

    return filteredProduct[0].quantity;
  }

  getCalculatedTotal(productId:any,productDiscountedPrice:any){
    const filteredProduct = this.orderDetails.orderProductQuantityList.filter(
      (productQuantity)=>productQuantity.productId === productId
    );
    return filteredProduct[0].quantity * productDiscountedPrice;
  }

  onQuantityChanged(quant:any,productId:any){

    this.orderDetails.orderProductQuantityList.filter(
      (orderProduct)=>orderProduct.productId === productId
    )[0].quantity = quant;

  }

  getCalculatedGrandTotal(){
    let grandTotal = 0;
    this.orderDetails.orderProductQuantityList.forEach(
      (productQuantity)=>{
        const price = this.productDetails.filter(product=>product.productId === productQuantity.productId)[0].productDiscountedPrice;
        grandTotal = grandTotal + price * productQuantity.quantity;
      }
    );
    return grandTotal;
  }

}
