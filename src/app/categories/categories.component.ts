import { Component } from '@angular/core';
import { CategoriesService } from '../categories.service';
import { products } from '../product';
import { Title } from '@angular/platform-browser';
@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent {
  allCategories!: products[]
  subCategories!: products[]
  loading: boolean = true
  loaded: boolean = false
  categoryName!: string
  isWrong: boolean = false

  constructor(private titleService: Title, private _CategoriesService: CategoriesService) { titleService.setTitle("Categories") }
  ngOnInit(): void {

    this._CategoriesService.getAllCategories().subscribe({
      next: (res) => {
        console.log(res.data[0].image);
        this.allCategories = res.data
        this.loaded = true
        this.loading = false
        if (res.data == null || res.data == undefined) {
          this.isWrong=true
        }
      },
      error: () => {
        this.loading = false
        this.isWrong=true
      }
    })
  }
  getSpecCategory(categoryId: string, event: any) {
    this._CategoriesService.getSpecCategory(categoryId).subscribe({
      next: (res) => {
        this.categoryName = event.srcElement.id + " subategories"
        this.subCategories = res.data
        if (res.data[0] == undefined) {
          this.categoryName = " "
        }
      },
      error: () => { }
    })
  };

  reload(){
    location.reload()
  }


}
