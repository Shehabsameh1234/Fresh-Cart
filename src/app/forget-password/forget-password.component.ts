import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent {
  //variables
  errorMessage!: string;
  loading: boolean = false;
  isSendEmail: boolean = true
  isSendCode: boolean = true
  //variables


  constructor(private titleService:Title,private _AuthService: AuthService, private _Router: Router) {   titleService.setTitle("Forget Password ")}
  //form
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
  //send the email that we want to change its password
  sendEmailSubmit(emailForm: FormGroup) {
    this.loading = true
    this._AuthService.sendForgetEmail(emailForm.value).subscribe({
      next: () => {
        this.loading = false
        this.errorMessage = ""
        this.isSendEmail = false
      },
      error: (error) => {
        //hendle the errors 
        this.errorMessage = error.error.message
        this.loading = false
      }
    })
  }
  //send the code that user recieved in his or her email
  sendcodeSubmit(codeForm: FormGroup) {
    this.loading = true
    this._AuthService.sendForgetcode(codeForm.value).subscribe({
      next: (res) => {
        this.loading = false
        this.errorMessage = ""
        this.isSendCode = false
      },
      error: (error) => {
        //display the messeges
        this.errorMessage = error.error.message
        this.loading = false

      }
    })
  }
  //insert the new password
  resetPasswordSubmit(resetPass: FormGroup) {
    this.loading = true
    this._AuthService.resetPassword(resetPass.value).subscribe({
      next: (res:any) => {
        console.log(res.token);
        localStorage.setItem("userToken", res.token);
        this._AuthService.saveDataToken()
        this._Router.navigate(['/home'])
        this._AuthService.saveDataToken()
        location.reload();
      },
      error: (error) => {
        //handle the errors
        this.loading = false
        this.errorMessage = error.error.message
      },
    })
  }
}
