import { Component } from '@angular/core';
import { CartService } from '../cart.service';
import { products } from '../product';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {


  allProductCart!:any
  loading: boolean = true
  loaded: boolean = false
  emptyCart: boolean = false
  totalCartPrice!:number

  constructor(private _CartService: CartService) { }

  ngOnInit(): void {
    localStorage.setItem("currentPage", "/cart")


    this._CartService.getAllCart().subscribe({
      next: (res) => {

        console.log(res.data.totalCartPrice);

        this.totalCartPrice=res.data.totalCartPrice
        

        this.allProductCart = res.data.products
        this.loaded = true
        this.loading = false
        if (res.data.length == 0) {
          this.emptyCart=true
         }

      },
      error: (error) => {

        console.log(error);
        this.loading = true
      }
    })


  }


}






