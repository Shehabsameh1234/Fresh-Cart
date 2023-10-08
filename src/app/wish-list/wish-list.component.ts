import { Component } from '@angular/core';
import { WishListService } from '../wish-list.service';
import { products } from '../product';


@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.scss']
})
export class WishListComponent {



  allProductsWishList!: products[]
  constructor(private _WishListService: WishListService) {

  }

  ngOnInit(): void {
    localStorage.setItem("currentPage", "/wishList")
    this._WishListService.getUserWishList().subscribe({
      next: (res) => {
        console.log(res.data);
        this.allProductsWishList = res.data
      },
      error: (error) => {
        console.log(error);
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

}
