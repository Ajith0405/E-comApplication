import { Component } from '@angular/core';
import { ProductService } from '../_services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {

  constructor(private productService:ProductService, private router:Router){}

  cartDetails=[];

  displayedColumns: string[] = ['Name','Description','Price','Discounted Price','Delete Item'];

  ngOnInit():void{
    this.getCartDetails();
  }

  getCartDetails(){
    this.productService.getCartDetails().subscribe(
      (resp:any)=>{
        console.log(resp);
        this.cartDetails = resp;
        
      },(err)=>{
        console.log(err);
        
      }
    );
  }

  checkOut(){

    this.router.navigate(['/buyProduct',{
      isSingleProductCheckout: false, id:0
    }]);
    
  }

  delete(cartId:any){
    console.log(cartId);
    this.productService.deleteCartItem(cartId).subscribe(
      (resp)=>{
        console.log(resp);
        this.getCartDetails();
      },(err)=>{
        console.log(err);
        
      }
    );

    
  }
}
