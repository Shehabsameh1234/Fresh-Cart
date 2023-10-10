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
  i!: number;
  intersection: string[] = []
  heart: boolean = true
  loadingCenter: boolean = false;
  userWord: string = ""
  indexArr: number[] = []


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

        // res.data.forEach((values: any) => {
        //   this.allId.push(values._id)
        // })


        // this._WishListService.getUserWishList().subscribe({
        //   next: (res) => {
        //     res.data.forEach((values: any) => {
        //       this.whishId.push(values._id)
        //     })
        //     console.log(this.whishId); 
        //      console.log(this.allId);

        //      this.whishId.forEach( array1Ttem => {
        //       this.allId.forEach( array2Item => {
        //          if(array1Ttem == array2Item){
        //          this.heart=true;
        //         }
        //         else{

        //         }

        //       })
        //     })
        //   }, 

        // })
        $(document).ready(() => {
          this.indexArr.push(...JSON.parse(localStorage.getItem("indexArr")!))
          for (var i = 0; i < this.indexArr.length; i++) {
            document.querySelectorAll(".fa-heart")[this.indexArr[i]].classList.add("text-danger")
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
        this.indexArr.push(i)
        localStorage.setItem("indexArr", JSON.stringify(this.indexArr))
        document.querySelectorAll(".fa-heart")[i].classList.add("text-danger")
      })
    }
    else if (Array.from(event.srcElement.classList).includes("text-danger") == true) {
      document.querySelectorAll(".fa-heart")[i].classList.remove("text-danger")
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







