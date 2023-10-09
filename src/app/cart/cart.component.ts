import { Component } from '@angular/core';
import { CartService } from '../cart.service';



@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {


  allProductCart!: any
  loading: boolean = true
  loaded: boolean = false
  emptyCart: boolean = false
  totalCartPrice!: number
  numOfCartItems!: number
  countItem!: number

  constructor(private _CartService: CartService) { }

  ngOnInit(): void {
    localStorage.setItem("currentPage", "/cart")
    this._CartService.getAllCart().subscribe({
      next: (res) => {
        this.numOfCartItems = res.numOfCartItems
        this.totalCartPrice = res.data.totalCartPrice
        this.allProductCart = res.data.products
        this.loaded = true
        this.loading = false
        if (res.data.products.length == 0) {
          this.emptyCart = true
          this.allProductCart = null
        }
      },
      error: (error) => {
        this.loading = false
        this.emptyCart = true
      }
    })
  }



  clearCart() {
    this._CartService.cleartAllCart().subscribe(
      (res) => {
        console.log(res);
        this.loaded = true
        this.loading = false
        this.allProductCart = null
        this.emptyCart = true
        this._CartService.numberOfCartItems.next(res.numOfCartItems)
      })
  }


  clearOneItem(pId: string) {
    this._CartService.cleartSpecItem(pId).subscribe({
      next: (res) => {
        this._CartService.numberOfCartItems.next(res.numOfCartItems)
        this.allProductCart = res.data.products
        this.totalCartPrice = res.data.totalCartPrice
        if (res.numOfCartItems == 0) {
          this.allProductCart = null
          this.emptyCart = true
          this._CartService.numberOfCartItems.next(res.numOfCartItems)
        }
      },
    })
  }


  updateQuantity(pCount: number, pId: string) {
    this._CartService.updateCart(pCount, pId).subscribe({
      next: (res) => {
      if (pCount == 0) {
          this._CartService.cleartSpecItem(pId).subscribe({
            next: (res) => {
              this.allProductCart = res.data.products
              this.totalCartPrice = res.data.totalCartPrice
              this._CartService.numberOfCartItems.next(res.numOfCartItems)
              if (res.numOfCartItems == 0) {
                this.allProductCart = null
                this.emptyCart = true
                this._CartService.numberOfCartItems.next(res.numOfCartItems)
              }
            },
          })
        } else {
          this.allProductCart = res.data.products
          this.totalCartPrice = res.data.totalCartPrice
          this._CartService.numberOfCartItems.next(res.numOfCartItems)
        }
      },
    })
  }
}











