import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  didnotmatch!: string;
  errorMessage!: string;
  loading: boolean = false;
  constructor(private _AuthService: AuthService, private _Router: Router) { }
  registerForm: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(10)]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)]),
    rePassword: new FormControl(null, [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)]),
    phone: new FormControl(null, [Validators.required, Validators.pattern(/^1[0125][0-9]{8}$/)]),
  }, this.validPassword)
  validPassword(registerForm: any) {
    return registerForm.get('password').value === registerForm.get('rePassword').value ? null : { 'mismatch': true }
  }
  signUpSubimt(registerForm: FormGroup) {
    this.loading = true
    this._AuthService.sendRegister(registerForm.value).subscribe({
      next: () => {
        this._Router.navigate(['/logIn'])
        this.loading = false
      },
      error: (error) => {
        this.errorMessage = error.error.message
        this.loading = false
      }
    })
  }
}









