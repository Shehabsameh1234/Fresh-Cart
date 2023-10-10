import { Component } from '@angular/core';
import { ProductsService } from '../products.service';
import { Router } from '@angular/router';
import { products } from '../product';
import { WishListService } from '../wish-list.service';
import { CartService } from '../cart.service';

declare let $: any

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  allProducts!: products[]
  loading: boolean = true
  loaded: boolean = false
  allId: string[] = []
  whishId: string[] = []
  intersection: string[] = []
  heart: boolean = true
  loadingCenter: boolean = false;
  userWord: string = ""
  
  constructor(private _Router: Router, private _ProductsService: ProductsService, private _WishListService: WishListService, private _CartService: CartService) {
    $(document).ready(function () {
      $(".owl-carousel").owlCarousel(
        {
          loop: true,
          margin: 0,
          responsive: {
            0: {
              items: 1
            },
            600: {
              items: 2
            },
            1000: {
              items: 3
            }
          }
        }
      );
    });
  }

  ngOnInit(): void {
    localStorage.setItem("currentPage", "/home")
    this._ProductsService.getAllProducts().subscribe({
      next: (res) => {
        this.allProducts = res.data
        this.loaded = true
        this.loading = false
        this._WishListService.getUserWishList().subscribe({
          next: (res) => {
            for (let i = 0; i < res.data.length; i++) {
              document.getElementById(res.data[i]._id)?.classList.add("text-danger")
            }
          }
        })
      },
      error: (error) => {
        this.loading = true
      }
    })
  }

  wishListAddAndRemove(pId: string, event: any, i: number) {
    if (Array.from(event.srcElement.classList).includes("text-danger") == false) {
      this._WishListService.addToWishList(pId).subscribe(() => {
        document.querySelectorAll(".fa-heart")[i].classList.add("text-danger")
      })
    }
    else if (Array.from(event.srcElement.classList).includes("text-danger") == true) {
      this._WishListService.deleteItemWishList(pId).subscribe(() => {
        document.querySelectorAll(".fa-heart")[i].classList.remove("text-danger")
      })
    }
  }
  addToCart(pId: string) {
    this.loadingCenter = true
    return this._CartService.addToCart(pId).subscribe({
      next: (res) => {
        console.log(res.numOfCartItems);
        this.loadingCenter = false
        this._CartService.numberOfCartItems.next(res.numOfCartItems)
      },
      error: () => {
        this.loadingCenter = false
      }
    })

  }


















}







