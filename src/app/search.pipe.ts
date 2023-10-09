import { Pipe, PipeTransform } from '@angular/core';
import{products} from '../app/product'

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

    transform(allProducts: products[], term: string): products[] {
      return allProducts.filter((oneproduct) => oneproduct.title.toLowerCase().includes(term.toLowerCase()))
    }
  }








  