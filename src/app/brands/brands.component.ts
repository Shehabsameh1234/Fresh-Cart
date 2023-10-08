import { Component } from '@angular/core';
import { BrandsService } from '../brands.service';
import { products } from '../product';





@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.scss']
})
export class BrandsComponent {


  allBrands!:products[]


  constructor(private _BrandsService: BrandsService) {

  }

  ngOnInit(): void {
    localStorage.setItem("currentPage", "/brands")

    this._BrandsService.getAllBrands().subscribe({
      next: (res) => {
        console.log(res);
        this.allBrands=res.data
      },
      error: (error) => {
        console.log(error);
      }
    })

  }

}






