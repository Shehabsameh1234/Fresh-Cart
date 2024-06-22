import { Component } from '@angular/core';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-paysucpayment-successful',
  templateUrl: './paysucpayment-successful.component.html',
  styleUrls: ['./paysucpayment-successful.component.scss']
})
export class PaysucpaymentSuccessfulComponent {

  constructor(private _CartService:CartService ){}

  ngOnInit(): void {
      this._CartService.cleartAllCart().subscribe(
        () => {
          this._CartService.numberOfCartItems.next(0)
        })
    
  }
}
