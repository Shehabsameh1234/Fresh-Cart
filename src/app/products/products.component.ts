import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../products.service';
import { products } from '../product';
import { WishListService } from '../wish-list.service';
import { CartService } from '../cart.service';
import { Title } from '@angular/platform-browser';

declare let $: any
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {
  //vars
  productId!: string;
  productImg0!: []
  productImg1!: []
  productImg2!: []
  product!: products
  loadingCenter: boolean = false;
  //vars
  constructor(private titleService: Title, private _ActivatedRoute: ActivatedRoute, private _CartService: CartService, private _ProductsService: ProductsService, private _WishListService: WishListService) {
    titleService.setTitle("Product Details")
    //using the owlCarsouel library
    $(document).ready(function () {
      $(".owl-carousel").owlCarousel(
        {
          responsive: {
            0: {
              items: 1
            },
            600: {
              items: 1
            },
            1000: {
              items: 1
            }
          }
        }
      );
    });
  }
  ngOnInit(): void {
    this.productId = this._ActivatedRoute.snapshot.params['id']
    //display the product details and photos alone
    this._ProductsService.getSpecProducts(this.productId).subscribe({
      next: (res) => {
        this.product = res.data
        this.productImg0 = res.data.images[0]
        this.productImg1 = res.data.images[1]
        this.productImg2 = res.data.images[2]
        if (this.productImg2 == null) {
          this.productImg2 = this.productImg1
        }
        //chek if the produc in wishList 
        this._WishListService.getUserWishList().subscribe({
          next: (res) => {
            for (let i = 0; i < res.data.length; i++) {
              document.getElementById(res.data[i]._id)?.classList.add("text-danger")
            }
          }
        })
      },
    })
  }
  //add and remove  from wishList
  wishListAddAndRemove(pId: string, event: any) {
    if (Array.from(event.srcElement.classList).includes("text-danger") == false) {
      this._WishListService.addToWishList(pId).subscribe(() => {
        document.querySelector(".fa-heart")?.classList.add("text-danger")
        document.querySelector("strong")?.classList.add("animate")
        console.log("hi");
        setTimeout(() => {
          document.querySelector("strong")?.classList.remove("animate")
        }, 2000);
        const element: HTMLElement = document.querySelector('strong small') as HTMLElement
        element.innerHTML = ' Adedd<i class="fa-solid d-block fa-check"></i>'
      })
    }
    else if (Array.from(event.srcElement.classList).includes("text-danger") == true) {
      this._WishListService.deleteItemWishList(pId).subscribe(() => {
        document.querySelector(".fa-heart")?.classList.remove("text-danger")
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
        this._CartService.numberOfCartItems.next(res.numOfCartItems)
        this.loadingCenter = false
        document.querySelector("strong")?.classList.add("animate")
        setTimeout(() => {
          document.querySelector("strong")?.classList.remove("animate")
        }, 2000);
        const element: HTMLElement = document.querySelector('strong small') as HTMLElement
        element.innerHTML = ' Adedd<i class="fa-solid d-block fa-check"></i>'
      }, error: () => { this.loadingCenter = false }
    })
  }
}


