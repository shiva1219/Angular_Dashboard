import { TargetAgeGroup } from './../../api/session-data-models';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit, Output, AfterViewInit } from '@angular/core';
import { SessionService } from '../../services/session.service';
import {
  FormsModule,
  ReactiveFormsModule,
  FormControl,
  FormGroupDirective,
  NgForm,
  FormBuilder,
  Validators,
  FormGroup,
  EmailValidator,
  FormArray
} from '@angular/forms';
import { BaseOfferings, OfferingDetail, TagetAgeGroup, ConsumerExpert, SurfaceQuality, VenueDetail, VenueChildDetail, VenueMain, SessionDetails, OpportunityInstanceDetail } from '../../api/session-data-models';
import { sessionToken, LoginResponse } from './../../api/data-model';
import { Router, ActivatedRoute } from '@angular/router';
import { EventEmitter } from 'protractor';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { stringList } from 'aws-sdk/clients/datapipeline';
import { DataBroadcastService } from '../../data-broadcast.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'koola-coach-session-edit',
  templateUrl: './coach-session-edit.component.html',
  styleUrls: ['./coach-session-edit.component.scss'],
  providers: [SessionService]
})
export class CoachSessionEditComponent implements OnInit {

  createSession: FormGroup;
  currentUser: LoginResponse;
  baseOfferings: BaseOfferings;
  offering_details: OfferingDetail[];
  tagetAgeGroup: TagetAgeGroup[];
  consumerExpert: ConsumerExpert[];
  surfaceQuality: SurfaceQuality[];

  venueDetails: VenueDetail[];
  venueChaildDetails: VenueChildDetail[];

  selectedOfferingId: any;
  consumerExpertObj;
  venueChaildObj;
  parentVenueObj;
  venueChaild;
  selectedTargetAgeGroup: string[];
  selectedConsumerExpert: string;
  selectedAgeGroups = {};
  selectedAmenities = [];
  selItemStoreData = {};
  servicesCompleated = false;
  isMobile = false;
  isDesktop = false;
  emenitiesFlag: boolean = true;
  selectedItem: number;

  selectedObj;
  formSUbmitted = false;
  amenities = [];
  resultLocation1 = [];
  selectedActivityName: string;
  opportunity: Number;
  enableActivity: Boolean = false;
  selectedGender = [];
  serviceProviderName: string;
  cName: string;

  status: string;
  specialNodes: string;
  groupSize: number;
  cost: number;
  title: string;
  selectedAmenity = [];
  opportunity_id: string;
  venue_id: number;
  parent_venue_id: number;
  sp_narrative: string;
  description: string;
  targetGroup: any;
  baseOfferingId: boolean = true;
  imageDetails: any;
  imageSearch: any;
  userSession: any;
  surfaceQualityId: number;
  pVenue: any;
  baseUrl = location.origin;

  //get session Details
  sessionId: any;
  sessionDetails: SessionDetails[];
  opportunityInstanceDetail: OpportunityInstanceDetail;

  days: any;
  calendarObj: any;
  profileName: string;
  parentVenueId: boolean = true;
  venueId: boolean = true;
  titleFlag: boolean = true;
  groupSizeFlag: boolean = true;
  costFlag: boolean = true;
  splNotesFlag: boolean = true;
  targetAgeGroups: boolean = true;
  sessionValidationFlag = false;
  calendarFlag = false;
  imagesFlag = false;
  ageGroupFlag = false;
  tempImages: any;
  targetAgeFlag: boolean = false;
  sessionSearch: string = "";
  hideCart: string = "cartItem";

  heroForm: FormGroup;
  name = new FormControl('');
  offering = new FormControl('');
  parentVenue = new FormControl('');
  venue = new FormControl('');
  groupSizeNo = new FormControl('');
  costValue = new FormControl('');
  amenitiesValue = new FormControl('');
  calendarValue = new FormControl('');
  splNotesValue = new FormControl('');
  selectedImage = new FormControl('');
  defaultAmenities: any;



  locations = [
    {
      iddd: 'USA',
      valueee: 'united states'
    },
    {
      iddd: 'IND',
      valueee: 'india'
    },
    {
      iddd: 'INS',
      valueee: 'indonesia'
    }
  ]
  resultLocation = [this.locations[1]]





  gernderArr = [{ gen: "M", imgURL: "../assets/boy-broad-smile.png", imgActURL: "../assets/boy-broad-smile-black.png" },
  { gen: "F", imgURL: "../assets/smiling-girl.png", imgActURL: "../assets/smiling-girl-black.png" }];


  constructor(private router: Router, public rest: SessionService, private fb: FormBuilder, private activatedRoute: ActivatedRoute, private sharedService: DataBroadcastService, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.spinner.show();
    /* ===== Get Session Details ===== */
    var self = this;
    self.activatedRoute.params.subscribe((obj: any) => {
      self.sessionId = obj.id;
      self.userSession = JSON.parse(localStorage.getItem("currentUser"));
      self.profileName = this.userSession.first_name.charAt(0).toUpperCase() + this.userSession.last_name.charAt(0).toUpperCase();
      self.loadBaseOfferings();
    });

    this.sharedService.sessionData.emit(this.sessionSearch);
    this.sharedService.hideCartItem.emit(this.hideCart);
  }

  public loadBaseOfferings() {
    var self = this;
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    let formData = {
      "registered_by_user_id": this.currentUser.id
    }
    let data = { "params": [{ "name": "p_value", "value": JSON.stringify(formData) }] }
    this.rest.getBaseoffering(data).subscribe((data: any) => {
      //self.baseOfferings = data;
      this.offering_details = data.offering_details;

      self.loadVenues();
    },
      e => {
        console.log(e);
      });
  }
  public loadVenues() {
    var self = this;
    let formData = { "registered_by_user_id": this.currentUser.id };
    let data = { "params": [{ "name": "p_value", "value": JSON.stringify(formData) }] }
    self.rest.getVenueSelect(data).subscribe((data: VenueMain) => {
      this.venueDetails = data.venue_details;
      self.loadImages();
    });
  }

  public loadImages() {
    var self = this;
    let formData = { "image_id": null, "registered_by_user_id": this.currentUser.id };
    let data = { "params": [{ "name": "p_value", "value": JSON.stringify(formData) }] }

    self.rest.getImageSelect(data).subscribe((imagesData: any) => {
      this.imageDetails = imagesData.image_details;
      self.loadOpportunityInstance(self.sessionId);

    });
  }
  /* === Get Session Details === */
  public loadOpportunityInstance(sessId: number) {
    var self = this;
    let formData = {
      "registered_by_user_id": this.currentUser.id,
      "opportunity_instance_id": sessId
    }
    // console.log(formData);
    let data = { "params": [{ "name": "p_value", "value": JSON.stringify(formData) }] }

    self.rest.getOpportunityInstance(data).subscribe((data: any) => {
      console.log("oppertunity objj--->" + JSON.stringify(data));
      self.opportunityInstanceDetail = data.opportunity_instance_details[0];
      self.updateForm();
    });

  }
  /* === End Get Session Details === */

  public updateForm() {
    setTimeout(() => {
      this.spinner.hide();
    }, 2000);
    //console.log("venueDetails reponse---->" + JSON.stringify(this.venueDetails));
    // console.log("opportunityInstanceDetail reponse---->" + JSON.stringify(this.opportunityInstanceDetail));

    let masterConsumerExpert: any;

    if (this.offering_details.length > 0) {
      for (var i = 0; i < this.offering_details.length; i++) {
        if (this.offering_details[i].base_offering_id === this.opportunityInstanceDetail.base_offering_id) {
          this.selectedOfferingId = this.offering_details[i];
          this.tagetAgeGroup = this.offering_details[i].taget_age_group;
          masterConsumerExpert = this.offering_details[i].consumer_expert;
        }
      }
    }
    this.title = this.opportunityInstanceDetail.opportunity_instance;
    this.groupSize = this.opportunityInstanceDetail.available_slots;
    this.cost = this.opportunityInstanceDetail.price;
    this.specialNodes = this.opportunityInstanceDetail.special_note;

    //For gender
    if (this.opportunityInstanceDetail.gender.includes("F")) {
      this.selectedGender.push("F");
    }
    if (this.opportunityInstanceDetail.gender.includes("M")) {
      this.selectedGender.push("M");
    }

    //Target Age Groups
    if (this.tagetAgeGroup.length > 0) {
      for (var i = 0; i < this.tagetAgeGroup.length; i++) {
        if (this.opportunityInstanceDetail.target_age_group.length > 0) {
          for (var j = 0; j < this.opportunityInstanceDetail.target_age_group.length; j++) {
            if (this.tagetAgeGroup[i].target_age_group_id === this.opportunityInstanceDetail.target_age_group[j].target_age_group_id) {
              this.tagetAgeGroup[i].flag = "true";
            }
          }
        }

      }
    }

    this.targetGroup = [];
    if (this.tagetAgeGroup.length > 0) {

      for (var i = 0; i < this.tagetAgeGroup.length; i++) {
        if (this.tagetAgeGroup[i].flag === "true") {
          let data = {
            "target_age_group_id": this.tagetAgeGroup[i].target_age_group_id,
          }
          this.targetGroup.push(data);
        }
      }
    }


    //ConsumerExpert
    if (masterConsumerExpert.length > 0) {
      for (var i = 0; i < masterConsumerExpert.length; i++) {
        if (masterConsumerExpert[i].consumer_expertise_id === this.opportunityInstanceDetail.consumer_expert[0].consumer_expertise_id) {
          this.consumerExpertObj = masterConsumerExpert[i].consumer_expertise;
        }
      }
    }

    //Venues amenities
    if (this.venueDetails.length > 0) {
      for (var i = 0; i < this.venueDetails.length; i++) {

        if (this.venueDetails[i].venue_id == this.opportunityInstanceDetail.venue[0].parent_venue_id) {
          this.parentVenueObj = this.venueDetails[i];
          this.amenities = this.venueDetails[i].amenities;

          if (this.venueDetails[i].venue_child_details === null) {
            this.venue_id = this.parentVenueObj.venue_id;

          } else {
            this.venueChaildDetails = this.venueDetails[i].venue_child_details;
            for (var j = 0; j < this.venueDetails[i].venue_child_details.length; j++) {
              if (this.venueDetails[i].venue_child_details[j].venue_id == this.opportunityInstanceDetail.venue[0].venue_id) {
                this.venueChaild = this.venueDetails[i].venue_child_details[j];
                this.venue_id = this.venueChaild.venue_id;
              }
            }
          }
          //.selectedAmenities = [];
          //Amenities
          if (this.venueDetails[i].amenities.length) {
            for (var j = 0; j < this.venueDetails[i].amenities.length; j++) {
              for (var k = 0; k < this.opportunityInstanceDetail.amenity.length; k++) {
                if (this.venueDetails[i].amenities[j].amenity_id == this.opportunityInstanceDetail.amenity[k].amenity_id) {
                  this.selectedAmenities.push(this.venueDetails[i].amenities[j]);
                  this.resultLocation1.push(this.venueDetails[i].amenities[j]);
                }
              }
            }

          }
        }
      }
    }

    //images
    if (this.imageDetails.length > 0) {
      for (var i = 0; i < this.imageDetails.length; i++) {
        if (this.imageDetails[i].image_id == this.opportunityInstanceDetail.image[0].image_id) {
          this.imageSearch = this.imageDetails[i].image_id;
        }
      }
    }

    //Calendar Data
    this.calendarObj = {};
    this.calendarObj["session_type_id"] = this.opportunityInstanceDetail.session_type_id;
    this.calendarObj["days"] = this.opportunityInstanceDetail.days;
    this.calendarObj["session_start_time"] = this.opportunityInstanceDetail.session_start_time;
    this.calendarObj["session_completion_time"] = this.opportunityInstanceDetail.session_completion_time;
  }

  public titleChange(event) {
    this.titleFlag = true;
    this.sessionValidationFlag = false;
  }
  public groupSizeChange(event) {
    this.groupSizeFlag = true;
    this.sessionValidationFlag = false;
  }
  public onCostChange(event) {
    this.costFlag = true;
    this.sessionValidationFlag = false;
  }
  public splNotesChange(event) {
    this.splNotesFlag = true;
    this.sessionValidationFlag = false;
  }


  compareCategoryObjects(object1: any, object2: any) {
    return object1 && object2 && object1.id == object2.id;
  }

  public onImageChange(id: number, checked: boolean) {
    this.imageSearch = id;
    this.imagesFlag = false;
  }

  public onImageSearch(event) {
    if (event === "") {
      this.imageDetails = this.tempImages;
    } else {
      var tempArr = [];
      for (let i = 0; i < this.imageDetails.length; i++) {
        if (this.imageDetails[i].image_name.toLowerCase().indexOf(event.toLowerCase()) > -1) {
          tempArr.push(this.imageDetails[i]);
        }
      }
      this.imageDetails = tempArr;
    }
  }

  selsportsSelEvent(d) {
    const data = d.value;
    // this.selectedAmenities = [];
    // for (const spt of data) {
    if (data.length > 0) {
      this.emenitiesFlag = true;
      for (var i = 0; i < data.length; i++) {
        console.log("ame data", JSON.stringify(data[i]));

        /*   let amenitiesData = {
            "amenity_id": data[i].amenity_id,
          }; */


        // this.selectedAmenities.push(amenitiesData);
        console.log("selectedAmenities data--->" + JSON.stringify(this.selectedAmenities));
      }
    }
  }

  loadFormGroups(fb) {
  }

  public calenderHandler(calObj) {
    this.calendarFlag = false;
    this.calendarObj["session_type_id"] = calObj.session_type_id;
    this.calendarObj["days"] = calObj.days;
    this.calendarObj["session_start_time"] = calObj.start_time;
    this.calendarObj["session_completion_time"] = calObj.end_time;
    console.log("Calendar Obj---->" + JSON.stringify(this.calendarObj));

  }


  onAgeChange(event, index, item) {
    if (event.checked === true) {
      this.tagetAgeGroup[index].flag = "true";
    } else {
      this.tagetAgeGroup[index].flag = "false";
    }

    this.targetGroup = [];
    if (this.tagetAgeGroup.length > 0) {

      for (var i = 0; i < this.tagetAgeGroup.length; i++) {
        if (this.tagetAgeGroup[i].flag === "true") {
          let data = {
            "target_age_group_id": this.tagetAgeGroup[i].target_age_group_id,
          }
          this.targetGroup.push(data);
        }
      }
    }

    if (this.targetGroup.length > 0) {
      this.targetAgeFlag = false;
    }
    else {
      this.targetAgeFlag = true;
    }
  }

  onGenderChange(gen: string, isChecked: boolean) {
    const genderArray = <FormArray>this.createSession.controls.gender;

    if (isChecked) {
      genderArray.push(new FormControl(gen));
      this.selectedGender.push(gen);
    } else {
      const index = genderArray.controls.findIndex(x => x.value === gen);
      genderArray.removeAt(index);
      const index1 = this.selectedGender.findIndex(x => x === gen);
      this.selectedGender.splice(index, 1);
    }
  }

  public onChangeOfferings(selectedOffering): void {
    //console.log("onChangeOffering" + JSON.stringify(selectedOffering))
    if (this.baseOfferings != null) {
      if (this.baseOfferings.offering_details.length > 0) {
        for (var i = 0; i < this.baseOfferings.offering_details.length; i++) {
          if (this.baseOfferings.offering_details[i].base_offering_id == selectedOffering.base_offering_id) {
            selectedOffering = this.baseOfferings.offering_details[i];
            //this.selectedOfferingObj = this.baseOfferings.offering_details[i];
            this.tagetAgeGroup = this.baseOfferings.offering_details[i].taget_age_group;
            this.consumerExpert = this.baseOfferings.offering_details[i].consumer_expert;
            this.surfaceQuality = this.baseOfferings.offering_details[i].surface_quality;
          }
        }
      }
    }
  }

  public changeBaseOffering(event) {
    //console.log("onChangeOffering" + JSON.stringify(this.selectedOfferingId));
    if (this.baseOfferings != null) {
      if (this.baseOfferings.offering_details.length > 0) {
        for (var i = 0; i < this.baseOfferings.offering_details.length; i++) {
          if (this.baseOfferings.offering_details[i].base_offering_id == this.selectedOfferingId.base_offering_id) {
            this.selectedOfferingId = this.baseOfferings.offering_details[i];
            this.tagetAgeGroup = this.baseOfferings.offering_details[i].taget_age_group;
            this.consumerExpert = this.baseOfferings.offering_details[i].consumer_expert;
            this.surfaceQuality = this.baseOfferings.offering_details[i].surface_quality;
          }
        }
      }
    }
  }

  isAgeGroupChecked(ageGroup) {
    if (!ageGroup) {
      return false;
    } else {
      return this.selectedAgeGroups.hasOwnProperty(ageGroup.target_age_group_id);
    }
  }

  onselectAgeGroups($event, val) {
    const obj = val;
    // obj.isChecked = $event.checked;
    if ($event.checked) {
      this.selectedAgeGroups[val.target_age_group_id] = obj;
    } else {
      delete this.selectedAgeGroups[val.target_age_group_id];
    }
  }

  public onChangeConsumerExpert(selectedConsumerExpertObj) {
    //console.log("onChangeConsumerExpertObj-->" + JSON.stringify(selectedConsumerExpertObj));
    //this.consumerExpertObj = selectedConsumerExpertObj.consumer_expertise_id;
  }

  public onChangeParentVenueDetails(parentVenue) {
    //console.log("parentVenue ---->", JSON.stringify(parentVenue));
    for (var k = 0; k < this.venueDetails.length; k++) {
      if (this.venueDetails[k].venue_id == parentVenue) {
        this.parent_venue_id = this.venueDetails[k].venue_id;
        this.venueChaildDetails = this.venueDetails[k].venue_child_details;
        this.amenities = this.venueDetails[k].amenities;
        if (this.venueChaildDetails == null) {
          this.venueChaildDetails = [];
          //this.heroForm.value.venueId = this.parent_venue_id;
          this.venue_id = this.venueDetails[k].venue_id;
        }
        else if (this.venueDetails[k].venue_child_details.length > 0) {
          this.venueChaildDetails = this.venueDetails[k].venue_child_details;
        } else {
        }
      }
    }
  }
  public onChangeVenueDetails(childVenue) {
    this.venue_id = childVenue.venue_id;
  }

  public getBaseOfferings() {

  }


  public removeAmenities(sptObj) {
    for (var k = 0; k <= this.selectedAmenities.length; k++) {
      if (this.selectedAmenities[k].amenity_id === sptObj.amenity_id) {
        this.selectedAmenities.splice(k, 1);

      }
    }
  }

  public prepareSessionCreateObj(status?: any) {
    if (this.title === undefined || this.title === "" || this.title == null) {
      this.titleFlag = false;
      this.sessionValidationFlag = true;
    }
    if (this.selectedAmenities == undefined || this.title === "" || this.title == null) {
      console.log("amenitis" + this.sessionValidationFlag);
      this.emenitiesFlag = false;
      this.sessionValidationFlag = true;
    } if (this.groupSize == undefined || this.groupSize == null || this.groupSize.toString() === "") {
      console.log("groupSize" + this.sessionValidationFlag);
      this.groupSizeFlag = false;
      this.sessionValidationFlag = true;
    } if (this.cost == undefined || this.cost == null || this.cost.toString() === "") {
      console.log("emptyyycost -->" + this.cost);
      console.log("cost" + this.sessionValidationFlag);
      this.costFlag = false;
      this.sessionValidationFlag = true;
    } if (this.specialNodes == undefined || this.specialNodes === "" || this.specialNodes == null) {
      console.log("specialNodes--->" + this.sessionValidationFlag);
      this.splNotesFlag = false;
      this.sessionValidationFlag = true;
    } if (this.targetGroup == undefined || this.targetGroup === "" || this.targetGroup == null) {
      console.log("targetGroups" + this.sessionValidationFlag);
      this.ageGroupFlag = true;
      this.sessionValidationFlag = true;
    } if (this.calendarObj == undefined || this.calendarObj === "" || this.calendarObj == null) {
      console.log("calendar" + this.sessionValidationFlag);
      this.calendarFlag = true;
      this.sessionValidationFlag = true;
    } if (this.imageSearch == undefined || this.imageSearch === "" || this.imageSearch == null) {
      console.log("images" + this.sessionValidationFlag);
      this.imagesFlag = true;
      this.sessionValidationFlag = true;
    }
    if (!this.sessionValidationFlag) {
      if (status === 0) {
        this.status = "draft"
      } else if (status === 1) {
        this.status = "preview"
      } else if (status === 2) {
        this.status = "publish"
      }
      let amenitiesData = [];
      //preparing session creation object
      if (this.selectedAmenities.length > 0) {
        for (var i = 0; i < this.selectedAmenities.length; i++) {
          console.log("data--->")
          let amenityData = {
            "amenity_id": this.selectedAmenities[i].amenity_id,
          };
          amenitiesData.push(amenityData);
        }
      }

      let formData = {
        "registered_by_user_id": this.currentUser.id,
        "opportunity_instance_id": this.opportunityInstanceDetail.opportunity_instance_id,
        "opportunity_instance": [
          {
            "title": this.title,
            "base_offering_id": this.selectedOfferingId.base_offering_id,
            "opportunity_id": this.opportunityInstanceDetail.opportunity_id,
            "gender": "M",//this.selectedGender,
            "venue_id": this.venue_id,
            "parent_venue_id": this.parentVenueObj.venue_id,
            "group_size": this.groupSize,
            "price": this.cost,
            "session_type_id": this.calendarObj.session_type_id,
            "start_time": "18:00:00",//this.calendarObj.session_start_time,
            "end_time": "19:00:00",//this.calendarObj.session_completion_time,
            "special_notes": this.specialNodes,
            "Image": this.imageSearch,
            "status": this.status
          }
        ],
        "days": this.calendarObj.days,
        "amenity_details": amenitiesData,//this.selectedAmenities,
        "target_age_group": this.targetGroup
      }

      console.log("Update Session Obj---->", JSON.stringify(formData));

      let data = { "params": [{ "name": "p_value", "value": JSON.stringify(formData) }] }

      this.rest.sessionInstanceUpdate(data).subscribe((sessiondata: any) => {
        console.log("Update session response--->" + JSON.stringify(sessiondata));
        alert('Success!' + sessiondata.return_message);
        //this.router.navigate(['sessionDetails/:page/ :id', { page: "publish", id: sessiondata.opportunity_instance_details[0].opportunity_instance_id }]);
        this.router.navigate(['sessionDetails', { page: this.status, id: sessiondata.opportunity_instance_details[0].opportunity_instance_id }]);
      },
        e => {
          console.log(e.error.text);
          alert('Error: ' + e.error.text);
        });
    }
  }
}

