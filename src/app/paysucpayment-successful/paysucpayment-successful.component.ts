import { Component } from '@angular/core';

@Component({
  selector: 'app-paysucpayment-successful',
  templateUrl: './paysucpayment-successful.component.html',
  styleUrls: ['./paysucpayment-successful.component.scss']
})
export class PaysucpaymentSuccessfulComponent {

  ngOnInit(): void {
    localStorage.setItem("currentPage", "/paymentSuccessful")
  }
}
