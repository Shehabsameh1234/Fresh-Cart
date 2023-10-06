import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {

  constructor(private _AuthService: AuthService, private _Router: Router) { }


  isLogIn: boolean = false

  ngOnInit(): void {
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
