import { Component, OnInit } from '@angular/core';
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
import { BaseOfferings, OfferingDetail, TagetAgeGroup, ConsumerExpert, SurfaceQuality, VenueDetail, VenueChildDetail, VenueMain } from '../../api/session-data-models';
import { sessionToken, LoginResponse } from './../../api/data-model';
import { Router } from '@angular/router';
import { DataBroadcastService } from './../../data-broadcast.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'koola-coach-session',
  templateUrl: './coach-session.component.html',
  styleUrls: ['./coach-session.component.scss'],
  providers: [SessionService]
})
export class CoachSessionComponent implements OnInit {

  createSession: FormGroup;
  currentUser: LoginResponse;
  baseOfferings: BaseOfferings;
  offering_details: OfferingDetail[];
  tagetAgeGroup: TagetAgeGroup[];
  consumerExpert: ConsumerExpert[];
  surfaceQuality: SurfaceQuality[];

  venueDetails: VenueDetail[];
  venueChaildDetails: VenueChildDetail[];

  selectedOfferingObj;
  consumerExpertObj;
  venueChaildObj;
  venueChaild;
  selectedTargetAgeGroup: string[];
  selectedConsumerExpert: string;
  selectedAgeGroups = {};
  selectedAmenities: any;
  selItemStoreData = {};
  servicesCompleated = false;
  isMobile = false;
  isDesktop = false;
  selectedItem: number;

  selectedObj;
  formSUbmitted = false;
  amenities: string[] = [];
  selectedActivityName: string;
  opportunity: Number;
  enableActivity: Boolean = false;
  selectedGender = [];
  serviceProviderName: string;
  cName: string;
  selectedcalendarObj; any;
  status: string;
  specialNodes: string;
  groupSize: string;
  cost: string;
  title: string;
  opportunity_id: string;
  venue_id: string;
  parent_venue_id: string;
  sp_narrative: string;
  description: string;
  targetGroup: any;
  imageSearch: any;


  baseOfferingId: boolean = true;
  parentVenueId: boolean = true;
  venueId: boolean = true;
  titleFlag: boolean = true;
  emenitiesFlag: boolean = true;
  groupSizeFlag: boolean = true;
  costFlag: boolean = true;
  splNotesFlag: boolean = true;
  targetAgeGroups: boolean = true;
  sessionValidationFlag = false;
  calendarFlag = false;
  imagesFlag = false;
  ageGroupFlag = false;
  tempImages: any;


  imageDetails: any;
  userSession: any;
  surfaceQualityId: number;

  profileName: string;
  baseUrl = location.origin;

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



  gernderArr = [{ gen: "M", imgURL: "../assets/boy-broad-smile.png", imgActURL: "../assets/boy-broad-smile-black.png" },
  { gen: "F", imgURL: "../assets/smiling-girl.png", imgActURL: "../assets/smiling-girl-black.png" }];


  constructor(private router: Router, public rest: SessionService,
    private fb: FormBuilder,
    private sharedService: DataBroadcastService,
    private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.spinner.show();
    //this.sharedService.setSub(this.sessionSearch);
    this.sharedService.sessionData.emit(this.sessionSearch);
    this.sharedService.hideCartItem.emit(this.hideCart);
    setTimeout(() => { }, 300);

    this.userSession = JSON.parse(localStorage.getItem("currentUser"));
    this.profileName = this.userSession.first_name.charAt(0).toUpperCase() + this.userSession.last_name.charAt(0).toUpperCase();


    /* this.rest.getSession().subscribe((data: LoginResponse) => {
      localStorage.setItem("userId", data.id);
      localStorage.setItem("sessionToken", data.session_token);
    }); */
    this.loadBaseOfferings();

  }

  public loadBaseOfferings() {
    var self = this;
    self.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    let formData = {
      "registered_by_user_id": self.currentUser.id
    }
    //console.log(formData);
    let data = { "params": [{ "name": "p_value", "value": JSON.stringify(formData) }] }

    self.rest.getBaseoffering(data).subscribe((data: any) => {
      console.log("BaseOfferings data--->" + JSON.stringify(data));
      self.baseOfferings = data;
      self.offering_details = data.offering_details;
      self.tagetAgeGroup = self.baseOfferings.offering_details[0].taget_age_group;
      self.consumerExpert = self.baseOfferings.offering_details[0].consumer_expert;
      self.surfaceQuality = self.baseOfferings.offering_details[0].surface_quality;
      self.cName = self.baseOfferings.offering_details[0].cname;
      self.sp_narrative = self.baseOfferings.offering_details[0].sp_narrative;
      self.description = self.baseOfferings.offering_details[0].description;
      self.surfaceQualityId = self.baseOfferings.offering_details[0].surface_quality_id;
      self.serviceProviderName = self.baseOfferings.offering_details[0].service_provider;

      if (data.offering_details[0].gender.includes("F")) {
        this.selectedGender.push("F");
      }
      if (data.offering_details[0].gender.includes("M")) {
        this.selectedGender.push("M");
      }
      this.selectedOfferingObj = this.baseOfferings.offering_details[0];

      if (this.baseOfferings.offering_details[0].consumer_expert.length > 0) {
        for (var i = 0; i < this.baseOfferings.offering_details[0].consumer_expert.length; i++) {
          if (this.baseOfferings.offering_details[0].consumer_expert[i].flag == "true") {
            this.consumerExpertObj = this.baseOfferings.offering_details[0].consumer_expert[i].consumer_expertise;
            console.log("consumer expert", JSON.stringify(this.consumerExpertObj));

          }
        }
      }

      //self.consumerExpertObj = "1";//this.baseOfferings.offering_details[0].consumer_expert[0];

      self.targetGroup = [];
      if (self.baseOfferings.offering_details[0].taget_age_group.length > 0) {
        for (var i = 0; i < self.baseOfferings.offering_details[0].taget_age_group.length; i++) {
          if (self.baseOfferings.offering_details[0].taget_age_group[i].flag === "true") {
            let data = {
              "target_age_group_id": self.baseOfferings.offering_details[0].taget_age_group[i].target_age_group_id,
            }
            self.targetGroup.push(data);
          }
        }
      }
      /*  setTimeout(() => {
         this.spinner.hide();
       }, 500); */


      self.loadVenues();
      self.loadFormGroups(self.fb);
      self.loadImages();

    },
      e => {
        console.log(e);
      });
  }

  public loadAmenities() {
    let formData = { "amenity": null, "registered_by_user_id": this.currentUser.id };
    let data = { "params": [{ "name": "p_value", "value": JSON.stringify(formData) }] }
    this.rest.amenities(data).subscribe((data: any) => {
      //this.amenities = data.amenity_details || [];
    },
      e => {
        console.log(e);
      });

  }
  costKeyPress(event) {

  }

  public calenderHandler(calenderObj) {
    this.selectedcalendarObj = calenderObj;
    this.calendarFlag = false;
    this.sessionValidationFlag = false;
  }

  public loadVenues() {
    let formData = { "registered_by_user_id": this.currentUser.id };
    let data = { "params": [{ "name": "p_value", "value": JSON.stringify(formData) }] }
    this.rest.getVenueSelect(data).subscribe((data: VenueMain) => {
      console.log("venueData--->" + JSON.stringify(data.venue_details));
      this.venueDetails = data.venue_details;
      this.venueChaildObj = this.venueDetails[0];
      if (this.venueDetails[0].venue_child_details == null) {
        console.log("onChangeParentVenueDetails-->" + "no child venue");
        this.venueChaildDetails = [];
        this.venue_id = this.parent_venue_id;
        this.venueId = true;
      }
      else if (this.venueDetails[0].venue_child_details.length > 0) {
        console.log("onChangeParentVenueDetails-->" + "have child venue");
        this.venueChaildDetails = this.venueDetails[0].venue_child_details;
        this.venueId = false;
        this.venueChaild = this.venueDetails[0].venue_child_details[0];
      } else {

      }
    });
  }

  public loadImages() {
    let formData = { "image_id": null, "registered_by_user_id": this.currentUser.id };
    let data = { "params": [{ "name": "p_value", "value": JSON.stringify(formData) }] }

    this.rest.getImageSelect(data).subscribe((imagesData: any) => {
      console.log("ImagesData--->" + JSON.stringify(imagesData.image_details));
      this.imageDetails = imagesData.image_details;
      this.tempImages = this.imageDetails;

      setTimeout(() => {
        this.spinner.hide();
      }, 1500);
    });
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
    this.selectedAmenities = [];
    // for (const spt of data) {
    if (data.length > 0) {
      this.emenitiesFlag = true;
      for (var i = 0; i < data.length; i++) {
        //console.log("ame data", JSON.stringify(data[i]));

        let amenitiesData = {
          "amenity_id": data[i].amenity_id,
          "image": data[i].amenity_image_url
        };
        this.selectedAmenities.push(amenitiesData);
        console.log("selectedAmenities data--->" + JSON.stringify(this.selectedAmenities));
      }
    }
  }

  loadFormGroups(fb) {
    /* this.heroForm = this.fb.group({
       name: ['', Validators.required],
       offering: ['', Validators.required],
 
        new FormControl(''),
       offering = new FormControl(''),
       parentVenue = new FormControl(''),
       venue = new FormControl(''),
       groupSizeNo = new FormControl(''),
       costValue = new FormControl(''),
       amenitiesValue = new FormControl(''),
       calendarValue = new FormControl(''),
     });*/

  }


  onCostChange($event) {
    console.log("$event");
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

      if (this.tagetAgeGroup.length > 0) {
        this.ageGroupFlag = false;
      } else {
        this.ageGroupFlag = true;
      }
    }
  }

  onGenderChange(gen: string, isChecked: boolean) {
    const genderArray = <FormArray>this.createSession.controls.gender;
    console.log(genderArray);

    if (isChecked) {
      genderArray.push(new FormControl(gen));
      this.selectedGender.push(gen);
    } else {
      const index = genderArray.controls.findIndex(x => x.value === gen);
      genderArray.removeAt(index);
      const index1 = this.selectedGender.findIndex(x => x === gen);
      this.selectedGender.splice(index, 1);
    }
    console.log("selected gender", JSON.stringify(this.selectedGender));
  }

  public onChangeOfferings(selectedOffering): void {
    if (this.baseOfferings != null) {
      if (this.baseOfferings.offering_details.length > 0) {
        for (var i = 0; i < this.baseOfferings.offering_details.length; i++) {
          if (this.baseOfferings.offering_details[i].base_offering_id == selectedOffering.base_offering_id) {
            this.baseOfferingId = true;
            selectedOffering = this.baseOfferings.offering_details[i];
            this.selectedOfferingObj = this.baseOfferings.offering_details[i];
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
    this.parentVenueId = true;
    this.parent_venue_id = parentVenue.venue_id;

    this.amenities = parentVenue.amenities;
    if (parentVenue.venue_child_details == null) {
      console.log("onChangeParentVenueDetails-->" + "no child venue");
      this.venueChaildDetails = [];
      this.venue_id = this.parent_venue_id;
      this.venueId = true;
    }
    else if (parentVenue.venue_child_details.length > 0) {
      console.log("onChangeParentVenueDetails-->" + "have child venue");
      this.venueChaildDetails = parentVenue.venue_child_details;
      this.venueId = false;
      this.venueChaild = parentVenue.venue_child_details[0];
    } else {

    }
  }

  public onChangeVenueDetails(childVenue) {
    this.venueId = true;
    this.venue_id = childVenue.venue_id;
  }

  public getBaseOfferings() {

  }

  public onImageChange(id: number, checked: boolean) {
    console.log("id ---> ", id);
    console.log("checked ---> ", checked);
    this.imageSearch = id;
    console.log("imageSearch ---> ", this.imageSearch);
    this.imagesFlag = false;

  }

  public saveToDraft(event, term: string) {
    this.status = "draft";
    this.router.navigate(['session-details', { term: term }]);
  }
  public sessionPreview(event, term: string) {
    this.status = "preview";
    this.router.navigate(['session-details', { term: term }]);
  }

  public sessionPublish(event) {
    this.status = "publish";
    this.prepareSessionCreateObj();
  }

  public removeAmenities(sptObj) {
    for (var k = 0; k <= this.selectedAmenities.length; k++) {
      if (this.selectedAmenities[k].amenity_id === sptObj.amenity_id) {
        this.selectedAmenities.splice(k, 1);
      }
    }
  }

  public titleChange(event) {
    this.titleFlag = true;
    this.sessionValidationFlag = false;
  }
  public groupSizeChange(event) {
    this.groupSizeFlag = true;
    this.sessionValidationFlag = false;
  }
  public costChange(event) {
    this.costFlag = true;
    this.sessionValidationFlag = false;
  }
  public splNotesChange(event) {
    this.splNotesFlag = true;
    this.sessionValidationFlag = false;
  }

  public prepareSessionCreateObj(status?: any) {
    /*  this.sessionValidationFlag = true;
     //    this.calendarFlag = false;
     if (this.selectedOfferingObj === undefined) {
       this.baseOfferingId = false;
       this.sessionValidationFlag = true;
     }
       if (this.parent_venue_id == undefined) {
       this.parentVenueId = false;
     } this.sessionValidationFlag = true;
     */

    if (this.title === undefined || this.title === "" || this.title == null) {
      console.log("tiitle" + this.title);
      this.titleFlag = false;
      this.sessionValidationFlag = true;
    }

    if (this.selectedAmenities == undefined) {
      this.emenitiesFlag = false;
      this.sessionValidationFlag = true;
    } if (this.groupSize == undefined) {
      this.groupSizeFlag = false;
      this.sessionValidationFlag = true;
      this.sessionValidationFlag = true;
    } if (this.cost == undefined) {
      this.costFlag = false;
      this.sessionValidationFlag = true;
    } if (this.specialNodes == undefined) {
      this.splNotesFlag = false;
      this.sessionValidationFlag = true;
    } if (this.targetGroup == undefined) {
      this.ageGroupFlag = true;
      this.sessionValidationFlag = true;
    } if (this.selectedcalendarObj == undefined) {
      this.calendarFlag = true;
      this.sessionValidationFlag = true;
    } if (this.imageSearch == undefined) {
      this.imagesFlag = true;
      this.sessionValidationFlag = true;
    }
    if (this.sessionValidationFlag) {
      console.log("please fill all the fields" + this.sessionValidationFlag)
    }
    else {
      this.sessionValidationFlag = false;
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
        "opportunity_instance": [
          {
            "title": this.title,
            "base_offering_id": this.selectedOfferingObj.base_offering_id,
            "opportunity_id": this.selectedOfferingObj.opportunity_id,
            "gender": this.selectedGender,
            "venue_id": this.venue_id,
            "parent_venue_id": this.parent_venue_id,
            "group_size": this.groupSize,
            "price": this.cost,
            "session_type_id": this.selectedcalendarObj.session_type_id,
            "start_time": this.selectedcalendarObj.start_time,
            "end_time": this.selectedcalendarObj.end_time,
            "special_notes": this.specialNodes,
            "Image": this.imageSearch,
            "status": this.status
          }
        ],
        "days": this.selectedcalendarObj.days,
        "amenity_details": amenitiesData,//this.selectedAmenities,
        "target_age_group": this.targetGroup
      }

      console.log("Session Obj---->", JSON.stringify(formData));

      let data = { "params": [{ "name": "p_value", "value": JSON.stringify(formData) }] }
      /* this.rest.sessionInstanceCreate(data).subscribe((sessiondata: any) => {
        console.log("create session response--->" + JSON.stringify(sessiondata));
        alert('Success!' + sessiondata.return_message);
        //this.router.navigate(['sessionDetails/:page/ :id', { page: "publish", id: sessiondata.opportunity_instance_details[0].opportunity_instance_id }]);
        this.router.navigate(['sessionDetails', { page: this.status, id: sessiondata.opportunity_instance_details[0].opportunity_instance_id }]);
      },
        e => {
          console.log(e.error.text);
          alert('Error: ' + e.error.text);
        }); */
    }
  }

}
