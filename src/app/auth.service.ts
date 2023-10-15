import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs'
import { registerData, logInData, emailData, codeData, resetData } from './object'
import jwtDecode from 'jwt-decode';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl: string = "https://ecommerce.routemisr.com";
  dataToken: BehaviorSubject<any> = new BehaviorSubject(null)
  constructor(private _HttpClient: HttpClient,private _Router:Router) { 
    if(localStorage.getItem("userToken")==null){
      this._Router.navigate(['/logIn'])
    }
    else{
      this.saveDataToken()
    }
  }
  sendRegister(_registerData: registerData): Observable<any> {
    return this._HttpClient.post(`${this.baseUrl}/api/v1/auth/signup`, _registerData)
  }
  sendLogIn(_logInData: logInData): Observable<any> {
    return this._HttpClient.post(`${this.baseUrl}/api/v1/auth/signin`, _logInData)
  }
  sendForgetEmail(_emailData: emailData) {
    return this._HttpClient.post(`${this.baseUrl}/api/v1/auth/forgotPasswords`, _emailData)
  }
  sendForgetcode(_codeData: codeData) {
    return this._HttpClient.post(`${this.baseUrl}/api/v1/auth/verifyResetCode`, _codeData)
  }
  resetPassword(_resetData: resetData) {
    return this._HttpClient.put(`${this.baseUrl}/api/v1/auth/resetPassword`, _resetData)
  }
  saveDataToken() {
    this.dataToken.next(localStorage.getItem("userToken"))
    if (this.dataToken.getValue() != null) {
      this.dataToken.next(jwtDecode(this.dataToken.getValue()))
    }
    else {
      this.dataToken.next(null)
    }
  }
}



