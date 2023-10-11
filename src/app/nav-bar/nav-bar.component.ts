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
  constructor(private _AuthService: AuthService, private _Router: Router,private _CartService:CartService) { }
  isLogIn: boolean = false
  ngOnInit(): void {
    this._CartService.getAllCart().subscribe({
      next:(res)=>{
        this._CartService.numberOfCartItems.next(res.numOfCartItems)
      },
      error:()=>{
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
    localStorage.removeItem("userToken") 
    this._AuthService.saveDataToken()
    this._Router.navigate(["/logIn"])
  }
}





