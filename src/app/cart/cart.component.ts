import { Component } from '@angular/core';
import { CartService } from '../cart.service';
import { Title } from '@angular/platform-browser';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent {
  //variables
  allProductCart!: any
  loading: boolean = true
  loaded: boolean = false
  emptyCart: boolean = false
  totalCartPrice!: number
  numOfCartItems!: number
  countItem!: number
  cartId!: string
  isWrong: boolean = false
  //variables

  constructor(private titleService: Title, private _CartService: CartService) { titleService.setTitle("Cart") }
  ngOnInit(): void {
    //get all cart
    this._CartService.getAllCart().subscribe({
      next: (res) => {
        this.cartId = res.data._id
        this._CartService.numberOfCartItems.next(res.numOfCartItems)
        this.numOfCartItems = res.numOfCartItems
        this.totalCartPrice = res.data.totalCartPrice
        this.allProductCart = res.data.products
        this.loaded = true
        this.loading = false
        //handle the case if no products or null
        if (res.data.products.length == 0) {
          this.emptyCart = true
          this.allProductCart = null
        }
        if (res.data.products == null || res.data.products == undefined) {
          this.isWrong = true
        }
      },
      error: (error) => {
        //handle the error 
        this.loading = false
        this._CartService.numberOfCartItems.next(0)
        this.isWrong = true
      }
    })
  }
  //clear all cart
  clearCart() {
    this._CartService.cleartAllCart().subscribe(
      () => {
        this.loaded = true
        this.loading = false
        this.allProductCart = null
        this.emptyCart = true
        this._CartService.numberOfCartItems.next(0)
        document.querySelector("strong")?.classList.add("animate")
        setTimeout(function () {
          document.querySelector("strong")?.classList.remove("animate")
        }, 2000);
        const element: HTMLElement = document.querySelector('strong small') as HTMLElement
        element.innerHTML = "deleted<i class='fa-solid fa-check d-block'></i>"
      })
  }
  //clear one item from the cart
  clearOneItem(pId: string) {
    this._CartService.cleartSpecItem(pId).subscribe({
      next: (res) => {
        this._CartService.numberOfCartItems.next(res.numOfCartItems)
        this.allProductCart = res.data.products
        this.totalCartPrice = res.data.totalCartPrice
        document.querySelector("strong")?.classList.add("animate")
        setTimeout(function () {
          document.querySelector("strong")?.classList.remove("animate")
        }, 2000);
        const element: HTMLElement = document.querySelector('strong small') as HTMLElement
        element.innerHTML = "deleted<i class='fa-solid fa-check d-block'></i>"
        //show message if no proudcts
        if (res.numOfCartItems == 0) {
          this.allProductCart = null
          this.emptyCart = true
          this._CartService.numberOfCartItems.next(res.numOfCartItems)
        }
      },
    })
  }
  //icrease and decrease the quantity
  updateQuantity(pCount: number, pId: string) {
    this._CartService.updateCart(pCount, pId).subscribe({
      next: (res) => {
        //clear items if count ==0
        if (pCount == 0) {
          this._CartService.cleartSpecItem(pId).subscribe({
            next: (res) => {
              this.allProductCart = res.data.products
              this.totalCartPrice = res.data.totalCartPrice
              this._CartService.numberOfCartItems.next(res.numOfCartItems)
              document.querySelector("strong")?.classList.add("animate")
              setTimeout(function () {
                document.querySelector("strong")?.classList.remove("animate")
              }, 2000);
              const element: HTMLElement = document.querySelector('strong small') as HTMLElement
              element.innerHTML = "deleted<i class='fa-solid fa-check d-block'></i>"
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
  };
  //reload the page by user in there is error
  reload() {
    location.reload()
  }
}











