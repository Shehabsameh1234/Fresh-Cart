import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs'
import { HttpClient } from '@angular/common/http';
import { payData } from './object'
@Injectable({
  providedIn: 'root'
})
export class CheckOutService {
  baseUrl: string = "https://ecommerce.routemisr.com";
  header: any = { token: localStorage.getItem("userToken") }
  constructor(private _HttpClient: HttpClient) { }
  pay(cId: string, formvalue: payData): Observable<any> {
    let bodyPay: any = {
      shippingAddress: formvalue
    }
    return this._HttpClient.post(`${this.baseUrl}/api/v1/orders/checkout-session/${cId}?url=https://shehabsameh1234.github.io/Fresh-Cart/`, bodyPay,{
      headers:this.header
    })
  }
}





