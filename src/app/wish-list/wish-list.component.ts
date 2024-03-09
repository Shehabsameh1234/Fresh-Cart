import { Component } from '@angular/core';
import { WishListService } from '../wish-list.service';
import { products } from '../product';
import { CartService } from '../cart.service';
import { Title } from '@angular/platform-browser';
@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.scss']
})
export class WishListComponent {
  //vars
  emptyList: boolean = false
  loading: boolean = true
  loaded: boolean = false
  loadingCenter: boolean = false;
  allProductsWishList!: products[]
  isWrong: boolean = false
  //vars
  constructor(private titleService: Title, private _WishListService: WishListService, private _CartService: CartService) {
    titleService.setTitle("Wish List")
  }
  ngOnInit(): void {
    //get user wishList to diplay it in tha page
    this._WishListService.getUserWishList().subscribe({
      next: (res) => {
        console.log(res.data);
        this.loaded = true
        this.loading = false
        this.allProductsWishList = res.data
        if (res.data.length == 0) {
          this.emptyList = true
        }
        if (res.data == null || res.data == undefined) {
          this.isWrong = true
        }
      },
      error: (error) => {
        //handle the error
        this.loading = false
        this.isWrong = true
      }
    })
  }
  //delete product from wishList
  deletItem(pId: string) {
    this._WishListService.deleteItemWishList(pId).subscribe({
      next: (res) => {
        this._WishListService.getUserWishList().subscribe({
          next: (res) => {
            this.allProductsWishList = res.data
            if (res.data.length == 0) {
              this.emptyList = true
            }
            document.querySelector("strong")?.classList.add("animate")
            setTimeout(function () {
              document.querySelector("strong")?.classList.remove("animate")
            }, 2000);
            const element: HTMLElement = document.querySelector('strong small') as HTMLElement
            element.innerHTML = "deleted<i class='fa-solid fa-check d-block'></i>"
          }
        })
      }
    })
  }
  //add to cart
  addToCart(pId: string) {
    this.loadingCenter = true
    return this._CartService.addToCart(pId).subscribe({
      next: (res) => {
        this._CartService.numberOfCartItems.next(res.numOfCartItems)
        this.loadingCenter = false
        document.querySelector("strong")?.classList.add("animate")
        setTimeout(() => {
          document.querySelector("strong")?.classList.remove("animate")
        }, 2000);
        const element: HTMLElement = document.querySelector('strong small') as HTMLElement
        element.innerHTML = ' Adedd<i class="fa-solid d-block fa-check"></i>'
      }, error: () => {
        this.loadingCenter = false
      }
    })
  };
  //reload the page by user in errors 
  reload(){
    location.reload()
  }
}
