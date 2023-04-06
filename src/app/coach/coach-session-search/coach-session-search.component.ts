import { DataBroadcastService } from './../../data-broadcast.service';
import { DataService } from './../../services/data.service';
import { SessionService } from './../../services/session.service';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap/modal/modal.directive';
import { Observable } from 'rxjs';

@Component({
  selector: 'koola-coach-session-search',
  templateUrl: './coach-session-search.component.html',
  styleUrls: ['./coach-session-search.component.scss'],
  providers: [SessionService]
})
export class CoachSessionSearchComponent implements OnInit, AfterViewInit {
  ngAfterViewInit(): void {
    //throw new Error("Method not implemented.");
  }
  someRange = [3, 7];
  createOffering;
  currentUser: any;
  sessionData: any;
  baseUrl = location.origin;
  ModalSignIn: boolean;
  amenityData = [];
  tempImages: any;
  searchVal: string;
  @ViewChild('ModalTesting') public ModalTesting: ModalDirective;


  myData: any;
  message: string;
  sessionSearch: string = "sessionSearchKey";
  hideCart: string = "cartItem";

  constructor(private router: Router, public rest: SessionService, private sharedService: DataBroadcastService) {
    this.sharedService.cartData.subscribe(
      (data: any) => {
        //console.log("dataaaaaaaa" + JSON.stringify(data));
        this.myData = data;
        this.getAllSessions();
      });
  }

  ngOnInit() {
    //this.sharedService.setSub(this.sessionSearch);
    this.sharedService.sessionData.emit(this.sessionSearch);
    this.sharedService.hideCartItem.emit(this.hideCart);
    this.getAllSessions();
    /* let timer = Observable.timer(2000, 5000);
    timer.subscribe(() => this.getAllSessions());
    console.log("ModalTesting---->", this.ModalTesting); */

    //this.sharedService.cartData.emit(this.searchkey);

  }



  // Insert Cart Session Details
  public getAllSessions() {
    var self = this;
    self.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    let formData = {
      "registered_by_user_id": self.currentUser.id
    }
    let data = { "params": [{ "name": "p_value", "value": JSON.stringify(formData) }] }

    self.rest.getSessions(data).subscribe((insertData: any) => {
      self.sessionData = insertData.opportunity_instance_details;

      //console.log("data---->" + this.myData);

      this.tempImages = self.sessionData;
      if (this.myData === "") {
        this.sessionData = this.tempImages;
      } if (this.myData === undefined) {
        this.sessionData = this.tempImages;
      } else {
        var tempArr = [];
        for (let i = 0; i < self.sessionData.length; i++) {
          if (self.sessionData[i].base_offering.toLowerCase().indexOf(this.myData.toLowerCase()) > -1) {
            tempArr.push(self.sessionData[i]);
          }
        }
        console.log("trmpArr", JSON.stringify(tempArr));
        self.sessionData = tempArr;
      }
    })
  }

  /* public viewSessionDetails(event, sessionId) {
    this.router.navigate(['sessionDetails', { page: "publish", id: sessionId }]);
  } */

  public viewSessionCartPage(event, sessionId) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (this.currentUser) {
      //console.log("current user");
      //ModalSignIn.show()
      //this.router.navigate(['cart', { id: sessionId }]);
      this.router.navigate(['sessionDetails', { page: "search", id: sessionId }]);
    } else {
      //console.log("else");
      this.router.navigate(['/']);
    }
    //return false;
  }

  /* public onSearchSessions(event) {
    if (event === "") {
      this.sessionData = this.tempImages;
    } else {
      var tempArr = [];
      for (let i = 0; i < this.sessionData.length; i++) {
        if (this.sessionData[i].base_offering.toLowerCase().indexOf(event.toLowerCase()) > -1) {
          tempArr.push(this.sessionData[i]);
        }
      }
      this.sessionData = tempArr;
    }
  } */

}
