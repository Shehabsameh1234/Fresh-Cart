import { Component } from '@angular/core';
import { CategoriesService } from '../categories.service';
import { products } from '../product';
@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent {
  allCategories!: products[]
  loading: boolean = true
  loaded: boolean = false
  constructor(private _CategoriesService: CategoriesService) {}
  ngOnInit(): void {
    localStorage.setItem("currentPage", "/categories")
    this._CategoriesService.getAllCategories().subscribe({
      next: (res) => {
        console.log(res.data[0].image);
        this.allCategories=res.data
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
