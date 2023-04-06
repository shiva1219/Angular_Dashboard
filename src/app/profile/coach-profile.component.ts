//#region
import {
  Component, OnInit, ChangeDetectionStrategy,
  AfterViewInit, Directive, ViewChild, ViewContainerRef
} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { DataService } from '../services/data.service';
import { ConfigService } from '../services/config.service';
import { Regions } from '../api/data-model';
import { AppRoutingModule } from '../app-routing.module';
import { RouterLink, Router } from '@angular/router';
import {
  FormsModule, ReactiveFormsModule, FormControl, FormGroupDirective, NgForm,
  FormBuilder, Validators, FormGroup, EmailValidator
} from '@angular/forms';
import { integer } from 'aws-sdk/clients/storagegateway';
import { isNullOrUndefined } from 'util';

//#endregion

@Component({
  selector: 'koola-coach-profile',
  templateUrl: './coach-profile.component.html',
  styleUrls: ['./coach-profile.component.scss']
})
export class CoachProfileComponent implements OnInit {
  people$1: Observable<any[]>;
  // pincode = ['500011','500012','500013','500014'];
  type = ['A1', 'B1', 'A2', 'B2'];
  selectedPeople1 = [];
  someRange = [3, 7];
  serviceFlag = 1;
  serviceFlag_1: Boolean = true;
  serviceFlag_2: Boolean = false;
  serviceFlag_3: Boolean = false;
  serviceFlag_4: Boolean = false;
  serviceNextBtn: Boolean = true;
  offeringsFalg1: Boolean = false;
  offeringsFalg2: Boolean = false;
  selectedActivityName1: string;
  selectedActivityName2: string;
  createOrganisation: FormGroup;
  createOffering: FormGroup;
  createProfile: FormGroup;
  opportunity1: integer;
  nextButtonStatus = this.createOrganisation;
  @ViewChild('createOrg') createOrg: NgForm;
  @ViewChild('createOff') createOff: NgForm;
  @ViewChild('createPro') createPro: NgForm;


  constructor(private dataService: DataService, fb: FormBuilder,
    public _configService: ConfigService,
    private router: Router) {
    this.loadFormGroups(fb);
  }

  private loadFormGroups(fb) {
    this.createOrganisation = fb.group({
      'orgName': [null, Validators.required],
      'address1': [null, Validators.required],
      'address2': [null, Validators.required],
      'subUrb': [null, Validators.required],
      'postCode': [null, Validators.required],
      'state': [null, Validators.required],
      'country': [null, Validators.required],
      'orgEmail': [null, Validators.compose([Validators.required, Validators.email])],
      'orgWebsite': [null, Validators.required],
      'branchName': [null, Validators.required],
      'bankAcc': [null, Validators.required]

    });
    this.createOffering = fb.group({
      'pincode': [null, Validators.required],
      // 'range' : [null, Validators.required],
      'gender': [null, Validators.required],
      'surfaces': [null, Validators.required],
      'ageGroup': [null, Validators.required],
      'expertise': [null, Validators.required],
      'someRange': [this.someRange, Validators.required]

    });

    this.createProfile = fb.group({
      'description': [null, Validators.required],
      'certifications': [null, Validators.required],
      'desigination': [null, Validators.required],
      'fromDate': [null, Validators.required],
      'toDate': [null, Validators.required],
      'companyName': [null, Validators.required],
      'region': [null, Validators.required],
      'coWebsite': [null, Validators.required],
      'currentCompany': [null, Validators.required]

    });
  }

  regionId: string[] = [];
  regions: string[] = [];
  opportunities: string[];
  sports: string[] = [];
  pincode: string[] = [];
  selectedActivity: string[];
  floorSurfaces: string[];
  ageGroups: string[];
  expertises: string[];
  selectedAgeGroups = [];
  selectedSurfaces = [];
  certifications: string[] = [];
  providerQualification = [];

  ngOnInit() {
    // let a = JSON.parse(localStorage.isLogin);
    this.loadRegions();
    this.loadOpportunities();
    this.loadPincodes();
    this.loadCertificates();
    this.nextButtonStatus = this.createOrganisation;
    //this.people$1 = this.dataService.getPeople();

  }
  addItem($event) {
    console.log($event);
    this.loadFloorSurfaces();
    this.loadAgeGroups();
    this.loadExpertises();

    // console.log(this.selectedActivity.length);
    if (this.selectedActivity.length == 1) {
      this.selectedActivityName1 = $event.opportunity;
      this.offeringsFalg1 = true;
      this.opportunity1 = $event.opportunity_id;
    } else if (this.selectedActivity.length == 2) {
      this.selectedActivityName2 = $event.opportunity;
      this.offeringsFalg2 = true;
    } else {
      this.offeringsFalg1 = false;
      this.offeringsFalg2 = false;
    }

  }
  removeItem($event) {
    if (this.selectedActivity.length == 1) {
      this.offeringsFalg1 = true;
    } else if (this.selectedActivity.length == 2) {
      this.offeringsFalg2 = true;
    } else {
      this.offeringsFalg1 = false;
      this.offeringsFalg2 = false;
    }
  }

  addcertifications($event) {
    var inputs = {
      "certification_source": $event.certification_source,
      "provider_qualification": $event.provider_qualification,
      "course_year": $event.course_year
    };
    this.providerQualification.push(inputs);
  }
  onChangeRangeSlider($event) {
    console.log($event);
    console.log(this.someRange);
  }
  onselectAgeGroups($event, val) {
    this.selectedAgeGroups.push(val.target_age_group_id);
    console.log(this.selectedAgeGroups);
  }
  onselectSurfaces($event, val) {
    this.selectedSurfaces.push(val.surface_type_id);
    console.log(this.selectedSurfaces);
  }
  clearModel1() {
    this.selectedPeople1 = [];
  }

  changeModel1() {
    this.selectedPeople1 = [{ name: 'New person' }];
  }
  loadRegions() {
    this._configService.getRegions()
      .subscribe((response: any) => {
        //this.regions = response.region_details as string[];

      },
        e => {
          console.log(e);
        }
      )
  }
  loadOpportunities() {
    this._configService.getOpportunities()
      .subscribe((response: any) => {
        this.opportunities = response.opportunity_details as string[];
        this.sports = response.opportunity_details as string[];
        // response.opportunity_details.forEach(element => {
        //   this.sports.push(element.opportunity);
        //   });
      },
        e => {

        }
      )
  }
  loadPincodes() {
    let formData = { "pincode": "1234" };
    let data = { "params": [{ "name": "p_value", "value": JSON.stringify(formData) }] }
    this._configService.getPincodes(data)
      .subscribe((response: any) => {
        this.pincode = response.pincodes_details as string[];
        // response.pincodes_details.forEach(element => {
        //   this.pincode.push(element.pincode);
        //   });
      },
        e => {
          // console.log(e);
        }
      )
  }
  loadFloorSurfaces() {
    this._configService.getFloorSurfaces()
      .subscribe((response: any) => {
        this.floorSurfaces = response.surface_quality_details as string[];
        console.log(this.floorSurfaces);
        // response.pincodes_details.forEach(element => {
        //   this.pincode.push(element.pincode);
        //   });
      },
        e => {
          // console.log(e);
        }
      )
  }
  loadAgeGroups() {
    this._configService.getAgeGroups()
      .subscribe((response: any) => {
        this.ageGroups = response.target_age_group_details as string[];

      },
        e => {
          console.log(e);
        }
      )
  }
  loadExpertises() {
    this._configService.getExpertises()
      .subscribe((response: any) => {
        this.expertises = response.consumer_expertise_details as string[];

      },
        e => {
          console.log(e);
        }
      )
  }
  loadCertificates() {
    let formData = { "provider_qualification": "" };
    let data = { "params": [{ "name": "p_value", "value": JSON.stringify(formData) }] }
    this._configService.getCertificates(data)
      .subscribe((response: any) => {
        this.certifications = response.provider_qualification_details as string[];
      },
        e => {
          console.log(e);
        })
    {

    }
  }
  next() {
    if (this.serviceFlag == 1) {
      //this.createOrg.ngSubmit.emit();
      this.nextButtonStatus = this.createOffering;
      this.serviceFlag_1 = false;
      this.serviceFlag_2 = true;
      this.serviceFlag++;

      return;
    }
    else if (this.serviceFlag == 2) {
     // this.createOff.ngSubmit.emit();
      this.nextButtonStatus = this.createProfile;
      this.serviceFlag_2 = false;
      this.serviceFlag_3 = true;
      this.serviceFlag++;
      return;
    }
    else if (this.serviceFlag == 3) {
     // this.createPro.ngSubmit.emit();
      //this.nextButtonStatus = "!createProfile.valid";
      this.serviceFlag_3 = false;
      this.serviceFlag_4 = true;
      this.serviceNextBtn = false;
      return;
    }
  }
  submitOrgansation(organisationData: any) {
    let date = new Date();
    date.getDate().toString();
    let formData = {
      "service_provider": [
        {
          "service_provider_id": 9,
          "service_provider": organisationData.value.orgName,
          "trading_street_address_1": organisationData.value.address1,
          "trading_street_address_2": organisationData.value.address2,
          "trading_city": organisationData.value.subUrb,
          "trading_state": organisationData.value.state,
          "trading_country": organisationData.value.country,
          "trading_postcode": organisationData.value.postCode,
          "email": organisationData.value.orgEmail,
          "provider_status_id": 2,
          "registration_date": date,
          "registered_by_user_id": 6,
          "website": organisationData.value.orgWebsite
        }
      ],
      "sp_rep":
        [
          {
            "service_provider_rep_id": 7001,
            "service_provider_id": 9,
            "service_provider_rep_status_id": 2,
            "user_id": localStorage.userId,
            "cname": localStorage.firstName,
            "surname": localStorage.lastName,
            "email": localStorage.email,
            "phone": "+61469797339",
            "added_by_user": 6,
            "sp_narrative": "i am football coach with 16 years of experiance"
          }
        ],
      "sp_fin_account": [
        {
          "bank_account": organisationData.value.bankAcc,
          "account_name": organisationData.value.branchName,
          "owning_user_id": 6,
          "purchase_balance": "0.00",
          "earnings_balance": "0.00",
          "currency_id": 1,
          "status": "In Active"
        }
      ]
    }
    let data = { "params": [{ "name": "p_value", "value": JSON.stringify(formData) }] }
    this._configService.saveOrgansiationDetails(JSON.stringify(data))
      .subscribe((response: any) => {
        console.log(response);
        alert(response[0].return_message);
        this.next();
      },
        e => {
          console.log(e.error.text);
          alert(e.error.text);
        }
      )
  }

  submitOffering(createOffering: any) {
    console.log(createOffering);
    var formData = {
      "logged_in_user": 6,
      "offering_details": [
        {
          "opportunity_id": this.opportunity1,
          "provider_offering": this.selectedActivityName1,
          "title": this.selectedActivityName1,
          "pincode": createOffering.value.pincode,
          "range_min": this.someRange[0],
          "range_max": this.someRange[1],
          "surface_quality_id": createOffering.value.surfaces,
          "target_age_group_id": this.selectedAgeGroups,
          "gender": createOffering.value.gender,
          "consumer_expertise_id": createOffering.value.expertise,
          "price": 50,
          "value": 65,
          "currency_id": 2,
          "auto_resubscribe_frequency": "false",
          "offer_start_date": "17-JUN-2018",
          "offer_end_date": "17-JUN-2018",
          "frequency_of_offering": "Weekly"
        }
      ]
    };

    let data = { "params": [{ "name": "p_value", "value": JSON.stringify(formData) }] }
    this._configService.saveOfferingDetails(data)
      .subscribe((response: any) => {
        console.log(response);
        this.next();
      }, e => {
        console.log(e);
        alert(e.error.text);

      })
  }

  submitProfile(createProfile: any) {

    var regionValue = this.regionId[this.regions.indexOf(createProfile.value.region)];

    var formData = {
      "logged_in_user": 6,
      "sp_narrative": createProfile.value.description,
      "provider_qualification": this.providerQualification,
      "sp_rep_qualification": [1, 2],
      "experiance_personal_details": [
        {
          "title": createProfile.value.desigination,
          "from_date": createProfile.value.fromDate,
          "to_date": createProfile.value.toDate,
          "current_employer": createProfile.value.currentCompany,
          "description": createProfile.value.companyName,
          "region_id": regionValue,
          "website": createProfile.value.coWebsite
        }
      ]
    };
    let data = { "params": [{ "name": "p_value", "value": JSON.stringify(formData) }] };
    this._configService.saveCertificateDetails(data)
      .subscribe((response: any) => {
        console.log(response);
        alert(response.return_message);
        this.next();
      },
        e => {
          console.log(e.error.text);
        }
      )


  }

}
