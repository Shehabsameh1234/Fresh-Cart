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
  //variables
  allBrands!: products[]
  loading: boolean = true
  loaded: boolean = false
  isWrong: boolean = false
  //variables

  constructor(private titleService: Title, private _BrandsService: BrandsService) {
    titleService.setTitle("Brands")
  }

  ngOnInit(): void {
    //get all brands
    this._BrandsService.getAllBrands().subscribe({
      next: (res) => {
        this.allBrands = res.data
        this.loaded = true
        this.loading = false
        if (res.data == null || res.data == undefined) {
          this.isWrong = true
        }
      },
      error: () => {
        //handle the error
        this.loading = false
        this.isWrong = true
      }
    })
  };
//refresh the page in errors
  reload() {
    location.reload()
  }
}






