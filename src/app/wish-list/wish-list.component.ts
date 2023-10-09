import { Component } from '@angular/core';
import { WishListService } from '../wish-list.service';
import { products } from '../product';
import { CartService } from '../cart.service';


@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.scss']
})
export class WishListComponent {

  emptyList: boolean = false
  loading: boolean = true
  loaded: boolean = false
  loadingCenter: boolean = false;


  allProductsWishList!: products[]
  constructor(private _WishListService: WishListService,private _CartService:CartService) {

  }

  ngOnInit(): void {
    localStorage.setItem("currentPage", "/wishList")
    this._WishListService.getUserWishList().subscribe({
      next: (res) => {
        console.log(res.data);
        this.loaded = true
        this.loading = false
        this.allProductsWishList = res.data
        if (res.data.length == 0) {
         this.emptyList=true
        }
      },
      error: (error) => {
        console.log(error);
        this.loading = true
      }
    })
  }

  deletItem(pId: string) {
    this._WishListService.deleteItemWishList(pId).subscribe({
      next: (res) => {
        console.log(res.data);
        this._WishListService.getUserWishList().subscribe({
          next: (res) => {
            console.log(res.data);
            this.allProductsWishList = res.data
            if (res.data.length == 0) {
              this.emptyList=true
             }
          },
          error: (error) => {
            console.log(error);
          }
        })
        alert("deleted")

      },
      error: (error) => {
        console.log(error);
      }
    })
  }


  
  addToCart(pId:string){
    this.loadingCenter=true

    return this._CartService.addToCart(pId).subscribe({
      next:(res)=>{
        this._CartService.numberOfCartItems.next(res.numOfCartItems)
        this.loadingCenter=false
      },error:()=>{
        this.loadingCenter=false

      }
    })

  }

}