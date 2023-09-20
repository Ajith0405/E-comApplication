import { Component } from '@angular/core';
import { ProductService } from '../_services/product.service';
import { UserOrderDetails } from '../_model/userOrder.model';

@Component({
  selector: 'app-user-order-details',
  templateUrl: './user-order-details.component.html',
  styleUrls: ['./user-order-details.component.css']
})
export class UserOrderDetailsComponent {
   
    constructor(private productService:ProductService){}

    displayedColumns: string[] = ['Name',"Product Name", 'Address', 'Contact No.', 'Amount',"Status"];

    userOrderDetails:UserOrderDetails[] = [];

    ngOnInit():void{
      this.getOrderDetails();
    }

    getOrderDetails(){
      this.productService.getMyOrders().subscribe(
        (resp:UserOrderDetails[])=>{
            console.log(resp);
            this.userOrderDetails = resp;
            
        },(err)=>{
            console.log(err);
            
        }
      )
    }
}
