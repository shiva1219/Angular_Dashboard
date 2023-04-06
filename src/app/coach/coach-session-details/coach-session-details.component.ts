import { Component, OnInit } from '@angular/core';
import { LoginResponse } from '../../api/data-model';
import { Router, ActivatedRoute } from '@angular/router';
import { SessionService } from '../../services/session.service';
import { OpportunityInstanceDetail, SessionDetails, Amenity, TargetAgeGroup, ConsumerExpert, SurfaceQuality, Venue, Image, Day } from '../../api/session-data-models';
import { DataBroadcastService } from '../../data-broadcast.service';

@Component({
  selector: 'koola-coach-session-details',
  templateUrl: './coach-session-details.component.html',
  styleUrls: ['./coach-session-details.component.scss'],
  providers: [SessionService]
})
export class CoachSessionDetailsComponent implements OnInit {
  sessionId: any;
  currentUser: any;
  sessionDetails: SessionDetails[];
  opportunityInstanceDetail: OpportunityInstanceDetail;
  amenity: Amenity[];
  targetAgeGroup: TargetAgeGroup[];
  consumerExpert: ConsumerExpert[];
  surfaceQuality: SurfaceQuality[];
  venue: Venue[];
  image: Image[];
  days: Day[];
  isPublish: boolean = true;
  isRegister: boolean = false;

  calendarObj: any;
  selectedGender = [];

  cName: string;
  serviceProvider: string;
  baseOffering: string;
  pageName: string;
  status: string;
  venueAddress: string;
  profileName: string;

  imagesFlag: true;
  sessionSearch: string = "";
  hideCart: string = "cartItem";
  baseOfferingId: any;


  constructor(private router: Router, public rest: SessionService, private activatedRoute: ActivatedRoute, private sharedService: DataBroadcastService) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
    this.profileName = this.currentUser.first_name.charAt(0).toUpperCase() + this.currentUser.last_name.charAt(0).toUpperCase();
    var self = this;
    self.activatedRoute.params.subscribe((obj: any) => {
      self.pageName = obj.page;
      if (self.pageName === "publish") {
        self.isPublish = false;
      } else if (self.pageName === "preview") {
        self.isPublish = true;
      } else if (self.pageName === "search") {
        self.isRegister = true;
        self.isPublish = false;
      }

      self.sessionId = obj.id;


      self.loadOpportunityInstance(self.sessionId);
      // self.showEditpage(self.sessionId);
    });

    //
    this.sharedService.sessionData.emit(this.sessionSearch);
    this.sharedService.hideCartItem.emit(this.hideCart);
  }

  public loadOpportunityInstance(sessId: number) {
    var self = this;
    let formData = {
      "registered_by_user_id": this.currentUser.id,
      "opportunity_instance_id": sessId
    }
    // console.log(formData);
    let data = { "params": [{ "name": "p_value", "value": JSON.stringify(formData) }] }

    self.rest.getOpportunityInstance(data).subscribe((data: any) => {
      self.sessionDetails = data;
      console.log("session Details data-->", JSON.stringify(data));
      self.opportunityInstanceDetail = data.opportunity_instance_details[0];
      this.baseOfferingId = data.opportunity_instance_details[0].base_offering_id;
      self.amenity = data.opportunity_instance_details[0].amenity;
      self.targetAgeGroup = data.opportunity_instance_details[0].target_age_group;
      //self.consumerExpert = data.opportunity_instance_details[0].consumer_expert[0];

      //self.surfaceQuality = data.opportunity_instance_details[0].surface_quality[0];
      self.venue = data.opportunity_instance_details[0].venue[0];
      self.image = data.opportunity_instance_details[0].image[0];
      self.days = data.opportunity_instance_details[0].days;

      self.venueAddress = data.opportunity_instance_details[0].venue_address[0].address_id + "," +
        data.opportunity_instance_details[0].venue_address[0].address1 + ","
        + data.opportunity_instance_details[0].venue_address[0].address2 + ","
        + data.opportunity_instance_details[0].venue_address[0].address3 + ","
        + data.opportunity_instance_details[0].venue_address[0].city + ","
        + data.opportunity_instance_details[0].venue_address[0].state + ","
        + data.opportunity_instance_details[0].venue_address[0].country + ","
        + data.opportunity_instance_details[0].venue_address[0].postalcode;
      //self.cName = data.opportunity_instance_details[0].cName
      //self.serviceProvider = data.opportunity_instance_details[0].service_provider;
      self.baseOffering = data.opportunity_instance_details[0].base_offering;

      if (data.opportunity_instance_details[0].gender.includes("F")) {
        this.selectedGender.push("Female");
      }
      if (data.opportunity_instance_details[0].gender.includes("M")) {
        this.selectedGender.push("Male");
      }

      let tempAmenities = [];
      if (this.amenity.length > 0) {
        // this.emenitiesFlag = true;
        for (var i = 0; i < this.amenity.length; i++) {
          //console.log("ame data", JSON.stringify(data[i]));

          let amenitiesData = {
            "amenity_id": this.amenity[i].amenity_id,
            "image": this.amenity[i].amenity_image_url
          };
          tempAmenities.push(amenitiesData);
        }
        this.amenity = tempAmenities;
        console.log("amenities====>", this.amenity);
      }
      self.calendarObj = {};
      self.calendarObj["session_type_id"] = data.opportunity_instance_details[0].session_type_id;
      self.calendarObj["days"] = self.days;
      self.calendarObj["session_start_time"] = data.opportunity_instance_details[0].session_start_time;
      self.calendarObj["session_completion_time"] = data.opportunity_instance_details[0].session_completion_time;

    });
  }


  public updateDetailsPage(event) {
    this.router.navigate(['sessionEdit', { id: this.sessionId }]);
  }

  public sessionInstanceCreate(status: any) {


    if (status === 0) {
      this.status = "draft"
    } else if (status === 1) {
      this.status = "publish"
    }

    let formData = {
      "registered_by_user_id": this.currentUser.id,
      "opportunity_instance_id": this.sessionId,
      "status": this.status
    }

    let data = { "params": [{ "name": "p_value", "value": JSON.stringify(formData) }] }

    this.rest.sessionPreviewUpdate(data).subscribe((data: any) => {
      console.log("preview update", JSON.stringify(data));
      this.router.navigate(['sessionDetails', { page: this.status, id: this.sessionId }]);
    });
  }

  public showCartPage(event) {
    // Insert Cart Session Details
    var self = this;
    self.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    let formData = {
      "registered_by_user_id": self.currentUser.id,//111
      "register_cart": [
        {
          "base_offering_id": this.baseOfferingId,//71,
          "status": "register",
          "quantity_ordered": 1
        }
      ]
    }
    let data = { "params": [{ "name": "p_value", "value": JSON.stringify(formData) }] }

    console.log("formData-->", JSON.stringify(data));
    self.rest.insertCartDetails(data).subscribe((insertData: any) => {
      console.log("Insert cart data----->", JSON.stringify(insertData));
      this.router.navigate(['cart']);
    })
  }




}
