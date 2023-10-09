import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { productId } from '../app/auth-object'
import { Observable } from 'rxjs'


@Injectable({
  providedIn: 'root'
})
export class CartService {

  baseUrl: string = "https://ecommerce.routemisr.com";
  header: any = { token: localStorage.getItem("userToken") }


  constructor(private _HttpClient: HttpClient) { }


  addToCart(pId:string): Observable<any>{
    let body: productId = { productId: pId }
    return this._HttpClient.post(this.baseUrl + "/api/v1/cart", body, {
      headers: this.header
    })
  }

  getAllCart(): Observable<any>{
    return this._HttpClient.get(this.baseUrl + "/api/v1/cart", {
      headers: this.header
    })
  }


}
