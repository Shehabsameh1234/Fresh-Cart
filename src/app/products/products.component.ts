import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../products.service';
import { products } from '../product';
declare let $: any
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {

  productId!: string;
  productImg0!: []
  productImg1!: []
  productImg2!: []
  product!: products

  constructor(private _ActivatedRoute: ActivatedRoute, private _ProductsService: ProductsService) {


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
    localStorage.setItem("currentPage", `/products/${this.productId}`)
    this._ProductsService.getSpecProducts(this.productId).subscribe({
      next: (res) => {
        this.product = res.data
        this.productImg0 = res.data.images[0]
        this.productImg1 = res.data.images[1]
        this.productImg2 = res.data.images[2]
        if (this.productImg2 == null) {
          this.productImg2 = this.productImg1
        }
      },
      error: (error) => { }
    })
  }
}


