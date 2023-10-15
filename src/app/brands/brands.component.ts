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
  isWrong:boolean=false
  constructor(private titleService:Title,private _BrandsService: BrandsService) {
    titleService.setTitle("Brands")
  }
  ngOnInit(): void {
    this._BrandsService.getAllBrands().subscribe({
      next: (res) => {
        console.log(res.data.length);
        this.allBrands=res.data
        this.loaded = true
        this.loading = false
        if(res.data==null ||res.data==undefined){
this.isWrong=true
        }
      },
      error: (error) => {
      
        this.loading = false
        this.isWrong=true
      }
    })
  };

  reload(){
    location.reload()
  }
}






