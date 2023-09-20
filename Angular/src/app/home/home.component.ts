import { Component } from '@angular/core';
import { ProductService } from '../_services/product.service';
import { ImageProcessingService } from '../_services/image-processing.service';
import { Router } from '@angular/router';
import { Product } from '../_model/poduct.model';
import { map } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  constructor(
    private productService: ProductService,
    private imageProcessingService: ImageProcessingService,
    private router: Router
  ) {}

  productDetails: Product[] = [];
  
  pageNumber:number = 0;

  showLoadButton = false;

  ngOnInit(): void {
    this.getAllProducts();
  }

  searchByKeyword(searchKeyword:string){
    this.pageNumber = 0;
    this.productDetails = [];
    this.getAllProducts(searchKeyword);
    
  }

  public getAllProducts(searchKey:string ="") {
    this.productService
      .getAllProducts(this.pageNumber,searchKey)
      .pipe(
        map((x: Product[], i) =>
          x.map((product: Product) =>
            this.imageProcessingService.createImages(product)
          )
        )
      )
      .subscribe(
        (resp: Product[]) => {
          console.log(resp);
          if(resp.length == 8){
            this.showLoadButton = true;
          } else{
            this.showLoadButton = false;
          }
          resp.forEach(p=> this.productDetails.push(p));
          // this.productDetails = resp;
        },
        (error: HttpErrorResponse) => {
          console.log(error);
        }
      );
  }

  showProductDetails(pId: Product) {
    this.router.navigate(['/productViewDetails', { productId: pId }]);
    // console.log(pId);
    
    
  }
  loadMoreProduct(){
    this.pageNumber = this.pageNumber + 1;
    this.getAllProducts();
  }


}
