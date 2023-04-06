import {
  Component, OnInit, ChangeDetectionStrategy,
  AfterViewInit, Directive, ViewChild, ViewContainerRef, EventEmitter,Output, HostListener
} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ConfigService } from '../../services/config.service';
import { Regions } from '../../api/data-model';
import { AppRoutingModule } from '../../app-routing.module';
import { RouterLink, Router } from '@angular/router';
import {PopupService} from '../../Helpers/Popup.Service';
import {
  FormsModule, ReactiveFormsModule, FormControl, FormGroupDirective, NgForm,
  FormBuilder, Validators, FormGroup, EmailValidator
} from '@angular/forms';
// import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { integer } from 'aws-sdk/clients/storagegateway';
import { isNullOrUndefined } from 'util';

//#endregion

@Component({
  selector: 'koola-coach-profile-certifications',
  templateUrl: './coach-profile-certifications.component.html',
  styleUrls: ['./coach-profile-certifications.component.scss']
})
export class CoachProfileCertificationsComponent implements OnInit {
  people$1: Observable<any[]>;
  // pincode = ['500011','500012','500013','500014'];
  inputFieldStatus: boolean= false;
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
  mobile: Boolean = false;
  showMobileNext: Boolean =  true;
  mobileNextstatus: Boolean = true;
  aboutYouWrapperFlag: Boolean = true;
  certificateWrapperFlag: Boolean = false;
  showOverlay: Boolean = false;
  expWrapperFlag: Boolean = false;
  selectedActivityName1: string;
  selectedActivityName2: string;
  createOrganisation: FormGroup;
  createOffering: FormGroup;
  createProfile: FormGroup;
  addNewCertProfile: FormGroup;
  addNewExpertise: FormGroup;
  opportunity1: integer;
  selectedCertifications: any;
  showOtherCertification: Boolean = false;
  toggleExperienceCard: Boolean = false;
  addExperienceText = '+ Add Experinence';
  nextButtonStatus = this.createOrganisation;
  @ViewChild('addNewCert') addNewCert: NgForm;
  @ViewChild('createPro') createPro: NgForm;
  @ViewChild('createExp') createExp: NgForm;
  @Output() myEvent = new EventEmitter<any>();

  regionId: string[] = [];
  regions: string[] = [];
  opportunities: string[];
  sports: string[] = [];
  pincode: string[] = [];
  selectedActivity: string[];
  floorSurfaces: string[];
  ageGroups: string[];
  expertises = [];
  isError = false;
  selectedAgeGroups = [];
  selectedSurfaces = [];
  certifications: string[] = [];
  providerQualification = [];
  aboutyouWrapperState: String = "carouselState active";
  certificateWrapperState: String = "carouselState inactive";
  expWrapperState: String = "carouselState inactive";

  certificationsForm =  new FormControl();
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.calculateDevice(event);
  }
  constructor(fb: FormBuilder,
    public _configService: ConfigService,
    private router: Router,
    private _popupService:PopupService,
    // public toastr: ToastsManager,
    vRef: ViewContainerRef) {
    this.loadFormGroups(fb);
  }
  calculateDevice(event) {
    if ((event && event.target.innerWidth > 768) || window.innerWidth > 768 ) {
      const descarea = document.getElementById('descriptionarea');
      descarea.removeAttribute('rows');
      this.mobile = false;
      this.showMobileNext =  true;
    } else {
      const descarea = document.getElementById('descriptionarea');
      descarea.setAttribute('rows', '20');
      this.mobile = true;
      this.showMobileNext =  false;
    }
  }
  private loadFormGroups(fb) {
    this.createProfile = fb.group({
      'description': [null, Validators.required],
      'certifications': [null, Validators.required]
    });

    this.addNewCertProfile = fb.group({
      'provider_qualification': [null, Validators.required],
      'certification_source': [null, Validators.required],
      'course_year': [null, Validators.required],
    });
    this.addNewExpertise = fb.group({
      'desigination': [null, Validators.required],
      'fromDate': [null, Validators.required],
      'toDate': [null, Validators.required],
      'companyName': [null, Validators.required],
      'region': [null, Validators.required],
      'coWebsite': [null, Validators.required],
      'currentCompany': [null]
    }, {validator: this.checkDates});
  }

  ngOnInit() {
    // let a = JSON.parse(localStorage.isLogin);
    this.loadRegions();
    this.loadOpportunities();
    this.loadCertificates();
    this.nextButtonStatus = this.createOrganisation;
    // this.people$1 = this.dataService.getPeople();
    // if (window.screen.width <= 500 || window.screen.height <= 500) { // 768px portrait
    //   const descarea = document.getElementById('descriptionarea');
    //   descarea.setAttribute('rows', '20');
    //   this.mobile = true;
    //   this.showMobileNext =  false;
    // }

    this.calculateDevice(null);

  }

  checkDates(group: FormGroup) {
    if (group.controls.fromDate.value && group.controls.toDate.value && group.controls.toDate.value <= group.controls.fromDate.value) {
      return { notValid: true };
    }
    return null;
  }

  addItem($event) {
    console.log($event);
    this.loadExpertises();

    // console.log(this.selectedActivity.length);
    if (this.selectedActivity.length === 1) {
      this.selectedActivityName1 = $event.opportunity;
      this.offeringsFalg1 = true;
      this.opportunity1 = $event.opportunity_id;
    } else if (this.selectedActivity.length === 2) {
      this.selectedActivityName2 = $event.opportunity;
      this.offeringsFalg2 = true;
    } else {
      this.offeringsFalg1 = false;
      this.offeringsFalg2 = false;
    }

  }
  removeItem($event) {
    if (this.selectedActivity.length === 1) {
      this.offeringsFalg1 = true;
    } else if (this.selectedActivity.length === 2) {
      this.offeringsFalg2 = true;
    } else {
      this.offeringsFalg1 = false;
      this.offeringsFalg2 = false;
    }
  }
  addcertifications() {
    let inputs : any = {};
    this.providerQualification = [];
    let hasOther = false;
    this.selectedCertifications.forEach((item, index) => {
      if (item.provider_qualification_id === 3) {
        hasOther = true;
        this.selectedCertifications.splice(index , 1);
      }
      inputs = {
        "certification_source": item.certification_source,
        "provider_qualification": item.provider_qualification
      };
    });
    this.showOtherCertification = hasOther;
    this.providerQualification.push(inputs);
    // console.log(this.providerQualification);
  }
  closeOtherCertification() {
    this.showOtherCertification = false;
    this.selectedCertifications = this.selectedCertifications.filter(data => {
      return data.provider_qualification_id === 3;
    });
  }
  removeCertification(cert) {
    console.log(cert);
    const self = this;
    this.selectedCertifications.map(function(item, index) {
      if (item.provider_qualification_id === cert.provider_qualification_id) {
        self.selectedCertifications.splice(index , 1);
        self.certifications.splice(index , 1);
      }
    });
    this.providerQualification.map(function(item, index) {
      if (item.provider_qualification_id === cert.provider_qualification_id) {
          self.providerQualification.splice(index, 1);
      }
    });
    console.log(this.selectedCertifications);
    console.log(this.certifications);
    console.log(this.providerQualification);
  }

  appendNewCertification(data) {

    if (this.addNewCert.valid) {
      const inputs = {
        "certification_source": data.certification_source,
        "provider_qualification": data.provider_qualification,
        "course_year": data.course_year.toLocaleDateString()
      };
      this.selectedCertifications.push(inputs);
      this.providerQualification.push(inputs);
      this.showOtherCertification = false;
    }
  }
  loadRegions() {
    this._configService.getRegions()
      .subscribe((response: any) => {
        this.regions = response.region_details as string[];

      },
        e => {
          console.log(e);
        }
      );
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
      );
  }
  loadExpertises() {
    this._configService.getExpertises()
      .subscribe((response: any) => {
        this.expertises = response.consumer_expertise_details as string[];
      },
        e => {
          console.log(e);
        }
      );
  }
  // coachCertifications() {
  //   console.log(this.selectedCertifications);
  //   this.selectedCertifications.map((item) => {
  //       if (item.provider_qualification_id === 59) {
  //         this.showOtherCertification = true;
  //       }
  //   });
  // }
  loadCertificates() {
    const formData = { "provider_qualification": "" };
    const data = { "params": [{ "name": "p_value", "value": JSON.stringify(formData) }] };
    this._configService.getCertificates(data)
      .subscribe((response: any) => {
        this.certifications = response.provider_qualification_details as string[];
      },
        e => {
          console.log(e);
        });
    {

    }
  }

  mobileNext() {
    if (this.aboutYouWrapperFlag === true) {
      if (this.createPro.form.controls["description"].status === 'VALID') {
        this.isError = false;
      this.aboutYouWrapperFlag = false;
      this.certificateWrapperFlag = true;
      this.aboutyouWrapperState = 'carouselState visited';
      this.certificateWrapperState = 'carouselState active';
      } else {
        this.isError = true;
      }
      return;
    } else if (this.certificateWrapperFlag === true) {
      if (this.addNewCert === undefined || this.addNewCert.form.valid ) {
        this.certificateWrapperFlag = false;
        this.certificateWrapperFlag = false;
        this.expWrapperFlag = true;
        this.showMobileNext = true;
        this.certificateWrapperState = 'carouselState visited';
        this.expWrapperState = 'carouselState active';
      }  else {
        this.isError = true;
      }
    }
  }
  addExperienceButton() {
    if (this.expertises.length === 0) {
      this.addExperienceText = "Add more";
    } else {
      this.addExperienceText = "+ Add Experiences";
    }
    this.toggleExperienceCard = true;
  }
  saveExperience(addNewExpertise: any) {
    if (!this.addNewExpertise.valid) {
        return false;
    }
    const tempVariable = {
      "title": this.addNewExpertise.value.desigination,
      "from_date": this.addNewExpertise.value.fromDate.toLocaleDateString(),
      "to_date": this.addNewExpertise.value.toDate.toLocaleDateString(),
      "current_employer": this.addNewExpertise.value.currentCompany,
      "description": this.addNewExpertise.value.companyName,
      "region_id": this.addNewExpertise.value.region.region_id,
      "website": this.addNewExpertise.value.coWebsite
    };
    this.expertises.push(tempVariable);
    this.toggleExperienceCard = false;
    this.addNewExpertise.reset();
  }

  closeExperience(){
    this.toggleExperienceCard = false;
  }

  removeExpertises(exp) {
    const self = this;
    this.expertises.map(function(item, index) {
      if (item.description === exp.description) {
        self.expertises.splice(index , 1);
      }
    });
    console.log(self.expertises);
  }

  submitProfile(createProfile: any) {

    const regionValue = this.regionId[this.regions.indexOf(createProfile.value.region)];
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const formData = {
      "registered_by_user_id": currentUser.id,
      "sp_narrative": createProfile.value.description,
      "provider_qualification": this.providerQualification,
      "sp_rep_qualification": [1, 2],
      "experiance_personal_details": this.expertises
    };
    const data = { "params": [{ "name": "p_value", "value": JSON.stringify(formData) }] };
    this.showOverlay = true;
    this._configService.saveCertificateDetails(data)
      .subscribe((response: any) => {
        console.log(response);
        this.showOverlay = false;
        this._popupService.showSuccess('Success!, Data Submitted ' + response[0].return_message);
        this.myEvent.emit(currentUser.id);
        this.router.navigate(['/congrats']);

      },
        e => {
          this.showOverlay = false;
          console.log(e.error.text);
          this._popupService.showError('Error: '+e.error.text);
        }
      );


   }

}

