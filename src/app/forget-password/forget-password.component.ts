import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Token } from '@angular/compiler';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent {



  errorMessage!: string;
  loading: boolean = false;
  isSendEmail:boolean=true
  isSendCode:boolean=true

  constructor(private _AuthService: AuthService, private _Router: Router) { }


  

  sendEmailForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
  })

  sendcodeForm: FormGroup = new FormGroup({
    resetCode: new FormControl(null, [Validators.required]),
  })

  resetPasswordForm: FormGroup = new FormGroup({

    email: new FormControl(null, [Validators.required, Validators.email]),
    newPassword: new FormControl(null, [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)]),

  })




  sendEmailSubmit(emailForm: FormGroup) {
    this.loading = true
    this._AuthService.sendForgetEmail(emailForm.value).subscribe({
      next: () => {
        this.loading = false
        this.errorMessage = ""
        this.isSendEmail=false
      },
      error: (error) => {
        this.errorMessage = error.error.message
        this.loading = false
      }
    })
  }


  sendcodeSubmit(codeForm: FormGroup) {
    this.loading = true
    this._AuthService.sendForgetcode(codeForm.value).subscribe({
      next: (res) => {
        console.log(res)
        this.loading = false
        this.errorMessage = ""
        this.isSendCode=false
      },
      error: (error) => {
        console.log(error)
        this.errorMessage = error.error.message
        this.loading = false

      }
    })
  }


  resetPasswordSubmit(resetPass: FormGroup) {
    this.loading = true
    this._AuthService.resetPassword(resetPass.value).subscribe({

      next: (token) => {
        console.log(token)
        localStorage.setItem("userToken", JSON.stringify(token).slice(10));
        this._AuthService.saveDataToken()
        this._Router.navigate(['/home'])
        this._AuthService.saveDataToken()
      },
      error: (error) => {
        console.log(error)
        this.loading = false
        this.errorMessage = error.error.message

      },

    })
  }

}
