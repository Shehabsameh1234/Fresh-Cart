import { Component } from '@angular/core';
import { ProductsService } from '../products.service';
import { Router } from '@angular/router';
import { products } from '../product';
import { WishListService } from '../wish-list.service';


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

  constructor(private _Router: Router, private _ProductsService: ProductsService, private _WishListService: WishListService) {
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
      },
      error: (error) => {
        this.loading = true
      }
    })
  }

  wishListAddAndRemove(pId: string, event: any) {
    if (event.target.style.color == "red") {
      this._WishListService.deleteItemWishList(pId).subscribe({
        next: (res) => {
          alert("deleted")
          event.target.style.color = "black";
        }
      })
    } else {
      this._WishListService.addToWishList(pId).subscribe({
        next: (res) => {
          alert("added")
          event.target.style.color = "red";
         
        }
      })
    }
  }
















}



