import { Component } from '@angular/core';
import { BrandsService } from '../brands.service';
import { products } from '../product';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.scss']
})
export class BrandsComponent {
  allBrands!:products[]
  loading: boolean = true
  loaded: boolean = false
  constructor(private titleService:Title,private _BrandsService: BrandsService) {
    titleService.setTitle("Brands")
  }
  ngOnInit(): void {
    localStorage.setItem("currentPage", "/brands")
    this._BrandsService.getAllBrands().subscribe({
      next: (res) => {
        console.log(res.data.length);
        this.allBrands=res.data
        this.loaded = true
        this.loading = false
      },
      error: (error) => {
        console.log(error);
        this.loading = true
      }
    })
  }
}






