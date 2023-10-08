import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { productId } from '../app/auth-object'
import { Observable } from 'rxjs'





@Injectable({
  providedIn: 'root'
})
export class WishListService {



  baseUrl: string = "https://ecommerce.routemisr.com";
  header: any = { token: localStorage.getItem("userToken") }

  constructor(private _HttpClient: HttpClient, private _Router: Router) { }


  addToWishList(pId: string): Observable<any> {
    let body: productId = { productId: pId }
    return this._HttpClient.post(this.baseUrl + "/api/v1/wishlist", body, {
      headers: this.header
    })
  }
  getUserWishList(): Observable<any> {
    return this._HttpClient.get(this.baseUrl + "/api/v1/wishlist", {
      headers: this.header
    })
  }


}


