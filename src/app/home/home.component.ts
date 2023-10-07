import { Component } from '@angular/core';
import { ProductsService } from '../products.service';
import { Router } from '@angular/router';
import { products } from '../product';

declare let $:any

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {



  allProducts!: products[]
  loading:boolean=true
  loaded:boolean=false
  

  constructor(private _Router: Router, private _ProductsService: ProductsService) { 
     $(document).ready(function(){
    $(".owl-carousel").owlCarousel(
      {
        loop:true,
        margin:0,
        responsive:{
            0:{
                items:1
            },
            600:{
                items:2
            },
            1000:{
                items:3
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
       
        this.allProducts=res.data
        this.loaded=true
        this.loading=false
      
      },
      error: (error) => {
       
        this.loading=true
      
      }
    })
  }










}


