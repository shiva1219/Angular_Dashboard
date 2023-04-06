import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'koola-coach-cart-payment',
  templateUrl: './coach-cart-payment.component.html',
  styleUrls: ['./coach-cart-payment.component.scss']
})
export class CoachCartPaymentComponent implements OnInit {
  isParticipants: boolean;
  isBillingPay: boolean = false;
  constructor() { }

  ngOnInit() {
  }

}
