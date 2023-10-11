import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { productId, count } from './object'
import { BehaviorSubject, Observable } from 'rxjs'
@Injectable({
  providedIn: 'root'
})
export class CartService {
  baseUrl: string = "https://ecommerce.routemisr.com";
  header: any = { token: localStorage.getItem("userToken") }
  numberOfCartItems: BehaviorSubject<any> = new BehaviorSubject(null)
  constructor(private _HttpClient: HttpClient) { }
  addToCart(pId: string): Observable<any> {
    let body: productId = { productId: pId }
    return this._HttpClient.post(this.baseUrl + "/api/v1/cart", body, {
      headers: this.header
    })
  }
  getAllCart(): Observable<any> {
    return this._HttpClient.get(this.baseUrl + "/api/v1/cart", {
      headers: this.header
    })
  }
  cleartAllCart(): Observable<any> {
    return this._HttpClient.delete(this.baseUrl + "/api/v1/cart", {
      headers: this.header
    })
  }
  cleartSpecItem(pId: string): Observable<any> {
    return this._HttpClient.delete(this.baseUrl + `/api/v1/cart/${pId}`, {
      headers: this.header
    })
  }
  updateCart(pCount: number, pId: string): Observable<any> {
    let body: count = { count: pCount }
    return this._HttpClient.put(this.baseUrl + `/api/v1/cart/${pId}`, body, {
      headers: this.header
    })
  }
}






