import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent {
  //vars
  errorMessage!: string;
  loading: boolean = false;
  //vars
  constructor(private titleService: Title, private _AuthService: AuthService, private _Router: Router) { titleService.setTitle("Log In ") }
  //from
  logInForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)]),

  })
  //send log in data email and password
  logInSubmit(registerForm: FormGroup) {
    this.loading = true
    this._AuthService.sendLogIn(registerForm.value).subscribe({
      next: (res) => {
        this.loading = false
        //save the token in localStorage
        localStorage.setItem("userToken", res.token)
        this._AuthService.saveDataToken()
        //send the user to home page if login success
        this._Router.navigate(['/home'])
        location.reload()
      },
      error: (error) => {
        //diplay the messege if log in faild
        this.errorMessage = error.error.message
        this.loading = false
      }
    })
  }
}
