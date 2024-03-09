import { Component } from '@angular/core';
import { ProductsService } from '../products.service';
import { Router } from '@angular/router';

import { WishListService } from '../wish-list.service';
import { CartService } from '../cart.service';
import { Title } from '@angular/platform-browser';
import { products } from '../product';
declare let $: any

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  //variables
  allProducts!: products[]
  loading: boolean = true
  loaded: boolean = false
  allId: string[] = []
  whishId: string[] = []
  intersection: string[] = []
  heart: boolean = true
  loadingCenter: boolean = false;
  isWrong:boolean=false
  userWord: string = ""
  //variables

  constructor(private titleService: Title, private _Router: Router, private _ProductsService: ProductsService, private _WishListService: WishListService, private _CartService: CartService) {
    titleService.setTitle("Home ")
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
    //get all products
    this._ProductsService.getAllProducts().subscribe({
      next: (res) => {
        this.allProducts = res.data
        this.loaded = true
        this.loading = false
        if(res.data==null ||res.data==undefined){
          this.isWrong=true
        }
        //get the items are in the wishList
        this._WishListService.getUserWishList().subscribe({
          next: (res) => {
            for (let i = 0; i < res.data.length; i++) {
              document.getElementById(res.data[i]._id)?.classList.add("text-danger")
            }
          }
        })
      },
      error: () => {
        //handle the error
        this.loading = false
        this.isWrong=true
      }
    })
  }
  //and and remove in wish list using the heart icon
  wishListAddAndRemove(pId: string, event: any, i: number) {
    if (Array.from(event.srcElement.classList).includes("text-danger") == false) {
      //add to wish list
      this._WishListService.addToWishList(pId).subscribe(() => {
        document.querySelectorAll(".fa-heart")[i].classList.add("text-danger")
        document.querySelector("strong")?.classList.add("animate")
        setTimeout(() => {
          document.querySelector("strong")?.classList.remove("animate")
        }, 2000);
        const element: HTMLElement = document.querySelector('strong small') as HTMLElement
        element.innerHTML = ' Adedd<i class="fa-solid d-block fa-check"></i>'
      })
    }
    else if (Array.from(event.srcElement.classList).includes("text-danger") == true) {
      //remove from wish list
      this._WishListService.deleteItemWishList(pId).subscribe(() => {
        document.querySelectorAll(".fa-heart")[i].classList.remove("text-danger")
        document.querySelector("strong")?.classList.add("animate")
        setTimeout(function () {
          document.querySelector("strong")?.classList.remove("animate")
        }, 2000);
        const element: HTMLElement = document.querySelector('strong small') as HTMLElement
        element.innerHTML = "deleted<i class='fa-solid fa-check d-block'></i>"
      })
    }
  }
  //add to cart
  addToCart(pId: string) {
    this.loadingCenter = true
    return this._CartService.addToCart(pId).subscribe({
      next: (res) => {
        this.loadingCenter = false
        this._CartService.numberOfCartItems.next(res.numOfCartItems)
        document.querySelector("strong")?.classList.add("animate")
        setTimeout(() => {
          document.querySelector("strong")?.classList.remove("animate")
        }, 2000);
        const element: HTMLElement = document.querySelector('strong small') as HTMLElement
        element.innerHTML = ' Adedd<i class="fa-solid d-block fa-check"></i>'
      },
      error: () => {
        this.loadingCenter = false
      }
    })
  };
//refresh the page in errors by user 
  reload(){
    location.reload()
  }
}







