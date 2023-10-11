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
export class LogInComponent  {
  errorMessage!: string;
  loading: boolean = false;
  constructor(private titleService:Title,private _AuthService: AuthService, private _Router: Router) {  titleService.setTitle("Log In ") }
  logInForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)]),

  })
  logInSubmit(registerForm: FormGroup) {
    this.loading = true
    this._AuthService.sendLogIn(registerForm.value).subscribe({
      next: (res) => {
        this._Router.navigate(['/home'])
        this.loading = false
        localStorage.setItem("userToken", res.token)
        this._AuthService.saveDataToken()
        location.reload();
      },
      error: (error) => {
        this.errorMessage = error.error.message
        this.loading = false
      }
    })
  }
}
