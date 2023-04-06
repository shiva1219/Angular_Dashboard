import {Component, OnInit, HostListener, ViewChild, OnDestroy} from '@angular/core';
import {ConfigService} from '../../services/config.service';
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
import {PopupService} from '../../Helpers/Popup.Service';
import {Observable, Subscription} from '../../../../node_modules/rxjs';
import { Router } from '../../../../node_modules/@angular/router';
@Component({selector: 'koola-coach-profile-activities',
 templateUrl: './coach-profile-activities.component.html',
 styleUrls: ['./coach-profile-activities.component.scss']})
export class CoachProfileActivitiesComponent implements OnInit, OnDestroy {
  offeringsFalg2 : Boolean = false;

  regionId : string[] = [];
  regions : string[] = [];
  opportunities : string[];
  sports : string[] = [];
  pincode : string[] = [];
  selectedActivity : string[];
  floorSurfaces : string[];
  ageGroups : string[];
  expertises : string[];
  selectedAgeGroups = {};
  selectedGender = [];
  selectedSurfaces = [];
  certifications : string[] = [];
  providerQualification = [];
  someRange = [3, 7];
  createOffering;
  enableActivity : Boolean = false;
  selectedActivityName : string;
  opportunity : Number;
  selectedObj;
  selectedSports;
  selectedItem : number;
  servicesCompleated = false;
  isMobile = false;
  isDesktop = false;
  selItemStoreData = {};
  formSUbmitted = false;
  formStatus: Boolean = true;
  gernderArr = [{ gen: "M" , imgURL: "../assets/smiling-girl.png", imgActURL: "../assets/smiling-girl-black.png"},
  { gen: "F", imgURL : "../assets/boy-broad-smile.png" , imgActURL: "../assets/boy-broad-smile-black.png"}];
  coachServices: Subscription;
  @ViewChild('createOff') createOff: NgForm;
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.calculateDevice(event);
  }
  selsportsSelEvent(d) {
   const data = d;
   for (const spt of data) {
    if (this.selItemStoreData[spt.opportunity_id] === undefined) {
      this.selItemStoreData[spt.opportunity_id] = {
         value: null,
        "hasData": false
      };
    }
   }

  }
  calculateDevice(event) {
    if ((event && event.target.innerWidth > 768) || window.innerWidth > 768 ) {
      this.isDesktop = true;
      this.isMobile = false;
    } else {
      this.isDesktop = false;
      this.isMobile = true;
    }
  }
  constructor(private _configService : ConfigService,
     private fb : FormBuilder,
      private route: Router,
    private _popupService: PopupService) {}
  ngOnInit() {
    this.loadOpportunities();
    this.loadFormGroups(this.fb);
    this.calculateDevice(null);
    this.loadCoachServices();
  }
  listClick(event, newValue) {
    if (this.selectedItem && this.selectedItem === newValue.opportunity_id) {
       return false;
    } else {
      if (this.createOff && !this.createOff.valid && this.createOff.dirty) {
       const r = confirm("Will last changes !!!");
       if (r === true) {
        this.prepareSelect(newValue);
       }  else {
         return false;
       }
    } else if (this.createOff && this.createOff.valid) {
      this.saveAndNext();
      this.prepareSelect(newValue);
    } else {
      this.prepareSelect(newValue);
    }

  }
  }
  prepareSelect(newValue) {
    this.formSUbmitted = false;
    this.selectedAgeGroups = [];
    this.selectedItem = newValue.opportunity_id;
    this.selectedObj = newValue;
    if (this.selectedSports.length > 0) {
      this.addItem(newValue);
      this.replaceDataWithdraft(this.selectedItem);
    }
  }
  replaceDataWithdraft(selectedItem) {
    if (this.selItemStoreData[selectedItem].hasData) {
      const tempVal = this.selItemStoreData[selectedItem].value;
      this.createOffering.controls["pincode"].setValue(tempVal.pincode);
      this.createOffering.controls["title"].setValue(tempVal.description);
      // this.createOffering.controls["gender"].setValue(tempVal.gender);
      this.createOffering.controls["surfaces"].setValue(tempVal.surface_quality_id);
      this.createOffering.controls["expertise"].setValue(tempVal.consumer_expertise_id);
      this.createOffering.controls["someRange"].setValue([tempVal.range_min, tempVal.range_max]);
      this.createOffering.controls["cost"].setValue(tempVal.price);
      this.selectedAgeGroups = tempVal.target_age_group_id;
      this.selectedGender = tempVal.gender;

    }  else {
      this.selectedAgeGroups = {};
      this.createOffering.reset(true);
      this.createOffering.controls["someRange"].setValue([3, 7]);
      this.selectedGender = [];
      const genderArray = <FormArray>this.createOffering.controls.gender;
      while (genderArray.length !== 0) {
        genderArray.removeAt(0);
      }
    }
    // this.createOffering.setValue("s")
  }
  onChangeRangeSlider($event) {
    console.log($event);
    this.someRange = $event;
    // console.log(this.someRange);
  }
  loadCoachServices() {
   this.coachServices = Observable.forkJoin(this._configService.getFloorSurfaces(),
     this._configService.getAgeGroups(), this._configService.getExpertises())
     .subscribe(dataArr => {
      this.floorSurfaces = dataArr[0] && dataArr[0].surface_quality_details || {};
      this.ageGroups = dataArr[1] && dataArr[1].target_age_group_details || {};
      this.expertises = dataArr[2] && dataArr[2].consumer_expertise_details || {};
      this.servicesCompleated = true;
    }, err => {
      console.log(err);
    }, () => {});
    this.loadPincodes();
  }
  loadOpportunities() {
    this
      ._configService
      .getOpportunities()
      .subscribe((response : any) => {
        this.opportunities = response && response.opportunity_details || [];
        this.sports = response && response.opportunity_details || [];
      });
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
    }  else {
    delete  this.selectedAgeGroups[val.target_age_group_id];
    }
  }
  loadFloorSurfaces() {
    this
      ._configService
      .getFloorSurfaces()
      .subscribe((response : any) => {
        this.floorSurfaces = response.surface_quality_details || [];
        console.log(this.floorSurfaces);
      });
  }
  removeItem($event) {
    // if (this.selectedActivity.length === 1) {   this.offeringsFalg1 = true; }
    // else if (this.selectedActivity.length === 2) {   this.offeringsFalg2 = true;
    // } else {   this.offeringsFalg1 = false;   this.offeringsFalg2 = false; }
  }
  loadPincodes() {
    const formData = {
      "pincode": "1234"
    };
    const data = {
      "params": [
        {
          "name": "p_value",
          "value": JSON.stringify(formData)
        }
      ]
    };
    this
      ._configService
      .getPincodes(data)
      .subscribe((response : any) => {
          this.pincode = response && response.pincode_details || [];
        // response.pincodes_details.forEach(element => {
        // this.pincode.push(element.pincode);   });
      }, e => {
        // console.log(e);
      });
  }
  addItem($event) {
    this.enableActivity = true;
    this.selectedActivityName = $event.opportunity;
    this.opportunity = $event.opportunity_id;

  }
  loadAgeGroups() {
    this
      ._configService
      .getAgeGroups()
      .subscribe((response : any) => {
        this.ageGroups = response.target_age_group_details  || [];

      });
  }
  loadExpertises() {
    this
      ._configService
      .getExpertises()
      .subscribe((response : any) => {
        this.expertises = response.consumer_expertise_details  || [];
      }, e => {
        console.log(e);
      });
  }
  closeCoachActivity(e, data) {
    e.preventDefault();
    e.stopImmediatePropagation();
    this.enableActivity = false;
    this.selectedActivityName = "";
    this.selectedItem = null;
  }
  removeCoachActivity(e, data) {
    e.preventDefault();
  if (this.selectedObj && data && (this.selectedObj.opportunity_id === data.opportunity_id)) {
    this.enableActivity = false;
    this.selectedActivityName = "";
  }
    // console.log(this.selectedObj);
    this.selectedSports = (this.removeValue(data));
      delete this.selItemStoreData[data.opportunity_id];
  }
  removeValue(data) {
    return this
      .selectedSports
      .filter(elm => {
        return elm['opportunity_id'] !== data['opportunity_id'];
      });
  }
  loadFormGroups(fb) {
    this.createOffering = fb.group({
      'pincode': [null],
      'title': [null],
      'gender': this.fb.array([], Validators.required),
      'surfaces': [null, Validators.required],
      'ageGroup': [null, Validators.required],
      'expertise': [null, Validators.required],
      'someRange': [this.someRange, Validators.required],
      'cost': [null, Validators.required]

    });
  }
  onGenderChange(gen: string, isChecked: boolean) {
    const genderArray = <FormArray>this.createOffering.controls.gender;

    if (isChecked) {
      genderArray.push(new FormControl(gen));
      this.selectedGender.push(gen);
    } else {
      const index = genderArray.controls.findIndex(x => x.value === gen);
      genderArray.removeAt(index);
    const index1 =  this.selectedGender.findIndex(x => x === gen);
    this.selectedGender.splice(index, 1);
    }
  }
  prepareCoachData() {

    const coachObj = { "opportunity_id": this.opportunity,
      "base_offering": this.selectedActivityName,
      "description": this.createOffering.value.title,
      "pincode": this.createOffering.value.pincode,
      "range_min": this.someRange[0],
      "range_max": this.someRange[1],
      "surface_quality_id": this.createOffering.value.surfaces,
      "target_age_group_id": this.selectedAgeGroups,
      "gender": this.createOffering.value.gender,
      "consumer_expertise_id": this.createOffering.value.expertise,
      "price": this.createOffering.value.cost,
      "value": 65,
      "number_of_credits": 1,
      "currency_id": 2,
      "auto_resubscribe_frequency": "false",
      "offer_start_date": "17-JUN-2018",
      "offer_end_date": "17-JUN-2018",
      "frequency_of_offering": "Weekly"
    };

    if (this.selItemStoreData[this.selectedObj.opportunity_id] ) {
    this.selItemStoreData[this.selectedObj.opportunity_id].value = coachObj;
    this.selItemStoreData[this.selectedObj.opportunity_id].hasData = true;
    }
    console.log(this.selItemStoreData);
  }
  persistData(formData) {
    const data = {
      "params": [
        {
          "name": "p_value",
          "value": JSON.stringify(formData)
        }
      ]
    };
    this
      ._configService
      .saveOfferingDetails(data)
      .subscribe((response : any) => {
        if (response && response[0] && response[0].return_message) {
          this._popupService.showSuccess('Success!, Data Submitted ' + response[0] && response[0].return_message);

        } else {
          this._popupService.showSuccess('Success!, Data Submitted ');
        }
        this.goToHome();
      }, e => {
        console.log(e);
        this._popupService.showError('Error: ' + e.error.text);

      });
  }
  saveAndNext() {
    if (Object.values(this.selectedAgeGroups).length > 0 ) {
      this.createOff.form.controls["ageGroup"].setValue("true");
    }  else {
      this.createOff.form.controls["ageGroup"].setValue("false");
    }
    // this.createOff["submitted"]= true;
    this.formSUbmitted = true;

    if (!this.createOff.valid) {
    } else {
      this.prepareCoachData();
    }
  }
  prepareAllData() {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const formData = {
      "registered_by_user_id": currentUser.id,
      "offering_details": []
    };
    for (const frm of Object.keys(this.selItemStoreData)) {
      const tempVal = this.selItemStoreData[frm].value;
      tempVal.target_age_group_id = Object.keys(tempVal.target_age_group_id).map(data => Number(data));
      formData.offering_details.push(tempVal);
    }
    this.persistData(formData);
  }
  saveData() {
  let allFiledsFilled = true;
  const itemsData = Object.values(this.selItemStoreData);
  if (itemsData.length === 0) {
    allFiledsFilled = false;
    alert("Select atleast a sport and fill the form to proceed further!!!");
    return false;
  }
  for (const frm of itemsData) {
    if (frm["hasData"] === false) {
      allFiledsFilled = false;
      alert("Please fill all selected forms");
      return false;
    }
  }
  if (allFiledsFilled) {
    this.prepareAllData();

  }
}
ngOnDestroy(): void {
 this.coachServices.unsubscribe();
}
goToHome() {
  this.route.navigate(['/home', { step3: this.formStatus }]);
}
}
