import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { CartService } from '../cart.service';
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {
  numberOfItems!:number
  isLogIn: boolean = false
  constructor(private _AuthService: AuthService, private _Router: Router,private _CartService:CartService) { }
 
  ngOnInit(): void {
    this._CartService.getAllCart().subscribe({
      next:(res)=>{
        //get the numbers of items in cart
        this._CartService.numberOfCartItems.next(res.numOfCartItems)
      },
      error:()=>{
        //if no items put 0
        this._CartService.numberOfCartItems.next(0)
      }
    })
    this._CartService.numberOfCartItems.subscribe(()=>{
      this.numberOfItems= this._CartService.numberOfCartItems.getValue()
    })
    this._AuthService.dataToken.subscribe(() => {
      if (this._AuthService.dataToken.getValue() == null) {
        this.isLogIn = false

      } else {
        this.isLogIn = true
      }
    })
  }
  logOut() {
    //in log out remove the token from localStorage
    localStorage.removeItem("userToken") 
    this._AuthService.saveDataToken()
    //send the user to log in page to log in again
    this._Router.navigate(["/logIn"])
  }
}





