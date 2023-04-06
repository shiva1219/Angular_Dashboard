import { Component, OnInit } from '@angular/core';
import { SessionService } from '../../services/session.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DataBroadcastService } from '../../data-broadcast.service';

@Component({
  selector: 'koola-coach-session-cart',
  templateUrl: './coach-session-cart.component.html',
  styleUrls: ['./coach-session-cart.component.scss'],
  providers: [SessionService]
})
export class CoachSessionCartComponent implements OnInit {
  currentUser: any;
  sessionId: number;
  sessionData: any;
  cartItemsData: any;
  baseUrl = location.origin;
  isRegisterPay: boolean = true;
  isBillingAddress: boolean = false;
  isParticipants: boolean = true;
  sessionSearch: string = "";
  hideCart: string = "cartItem";

  constructor(private router: Router, public rest: SessionService, private activatedRoute: ActivatedRoute, private sharedService: DataBroadcastService) { }

  ngOnInit() {

    var self = this;
    self.activatedRoute.params.subscribe((obj: any) => {
      self.sessionId = obj.id;
      //get all Cart items by id
      self.loadUserCartItems();

      //get SessinDetails
      self.loadOpportunityInstance(self.sessionId);
      //self.deleteSessionCartDetails(self.sessionId);
    });

    this.sharedService.sessionData.emit(this.sessionSearch);
    this.sharedService.hideCartItem.emit(this.hideCart);
  }

  //get user Cart Items

  public loadUserCartItems() {
    var self = this;
    self.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    console.log(self.currentUser);
    let formData = {
      "registered_by_user_id": this.currentUser.id
    }

    let data = { "params": [{ "name": "p_value", "value": JSON.stringify(formData) }] }

    self.rest.searchCartDetails(data).subscribe((cartData: any) => {
      console.log("Cart Items--->", JSON.stringify(cartData));
      self.cartItemsData = cartData.consumer_asset_details;
    });
  }

  //SessionDetails
  public loadOpportunityInstance(sessionId) {
    var self = this;
    self.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    let formData = {
      "registered_by_user_id": this.currentUser.id,
      "opportunity_instance_id": sessionId
    }
    // console.log(formData);
    let data = { "params": [{ "name": "p_value", "value": JSON.stringify(formData) }] }

    self.rest.getOpportunityInstance(data).subscribe((insertData: any) => {
      self.sessionData = insertData.opportunity_instance_details[0];
      console.log("sessionDetails--->", JSON.stringify(self.sessionData));
    });
  }

  // Delete Cart Session Details
  public deleteSessionCartDetails(event, sessionId) {
    var self = this;
    self.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    let deleteformData = {
      "registered_by_user_id": self.currentUser.id, ///111
      "consumer_asset_id": sessionId
    }
    let deData = { "params": [{ "name": "p_value", "value": JSON.stringify(deleteformData) }] }

    self.rest.deleteCartDetails(deData).subscribe((deleteData: any) => {
      //console.log("Delete cart data----->", JSON.stringify(deleteData));
      this.loadUserCartItems();
    })
  }

  public showBillingAddress(event) {
    this.isRegisterPay = false;
    this.isBillingAddress = true;
  }

  public showBillingPay(event) {
    console.log(this.sessionId);
    this.router.navigate(['cartPayment', { id: this.sessionId }]);
  }
}
