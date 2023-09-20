import { Component } from '@angular/core';
import { ProductService } from '../_services/product.service';

@Component({
  selector: 'app-all-order-details',
  templateUrl: './all-order-details.component.html',
  styleUrls: ['./all-order-details.component.css']
})
export class AllOrderDetailsComponent {

  displayedColumns: string[] = ['order Id','Product Name', 'Customer Name', 'Address', 'Contact No','Status' , 'Delivery Status', ];

  dataSource:any [] =[];

  constructor(private productService:ProductService){}

  ngOnInit():void{
    this.getAllOrderDetails();
  }

  delivered(orderId:any){
    console.log(orderId);
    this.productService.delivered(orderId).subscribe(
      (resp)=>{
          console.log(resp);
          this.getAllOrderDetails();
          
      },(err)=>{
          console.log(err);
          
      }
    );
    
  }

  getAllOrderDetails(){
    this.productService.getAllOrdersDetails().subscribe(
      (resp)=>{
        console.log(resp);
        this.dataSource = resp
        
      },(err)=>{
        console.log(err);
        
      }
    );
  }

}
