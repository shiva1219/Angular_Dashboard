
import {
  Component, OnInit, ChangeDetectionStrategy,
  AfterViewInit, Directive, ViewChild, ViewContainerRef
} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ConfigService } from '../../services/config.service';
import { Regions } from '../../api/data-model';
import { AppRoutingModule } from '../../app-routing.module';
import {PopupService} from '../../Helpers/Popup.Service';
import { RouterLink, Router } from '@angular/router';
import {
  FormsModule, ReactiveFormsModule, FormControl, FormGroupDirective, NgForm,
  FormBuilder, Validators, FormGroup, EmailValidator
} from '@angular/forms';
//import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { isNullOrUndefined } from 'util';


@Component({
  selector: 'koola-coach-profile',
  templateUrl: './coach-profile.component.html',
  styleUrls: ['./coach-profile.component.scss']
})
export class CoachProfileComponent implements OnInit {

  createOrganisation: FormGroup;
  pincode: string[] = [];
  @ViewChild('createOrg') createOrg: NgForm;
  addressFormState: boolean = false;
  detailsFormState: boolean = true;
  formStatus: boolean = true;
  inputFieldStatus: boolean = false; 
  constructor(private fb: FormBuilder,
    public _configService: ConfigService,
    private router: Router,
    public _popupService: PopupService,
    vRef: ViewContainerRef) {
    this.loadFormGroups(fb);

    
  }

  ngOnInit() {
    if (window.innerWidth > 767) {
      this.addressFormState = true;
    } else {
      this.addressFormState = false;
    }
    //this.loadPincodes();
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
      'orgWebsite': [null,Validators.compose([ Validators.required,
                     Validators.pattern("^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$")
                     ])]
      // 'branchName': [null, Validators.required],
      // 'bankAcc': [null, Validators.required]
    });

    this.createOrganisation.controls.postCode.valueChanges
    .debounceTime(400) 
   		.subscribe(data => {
        if(data.length >= 3){
        let formData = { "pincode": data };
        let data1 = { "params": [{ "name": "p_value", "value": JSON.stringify(formData) }] } ;
   			this._configService.getPincodes(data1).subscribe(response =>{
   				console.log(response);
           this.pincode = response.pincode_details as string[];
   			})
       }})
      
      
   
  }

  loadPincodes() {
    let formData = { "pincode": "1234" };
    let data = { "params": [{ "name": "p_value", "value": JSON.stringify(formData) }] }
    this._configService.getPincodes(data)
      .subscribe((response: any) => {
        console.log(response.pincode_details
        );
         this.pincode = response.pincode_details as string[];
        // response.pincodes_details.forEach(element => {
        //   this.pincode.push(element.pincode);
        // });
      },
        e => {
          // console.log(e);
        }
      )
  }

  submitOrgansation(organisationData: any) {console.log(this.createOrganisation);console.log(this.createOrganisation.controls.orgName);
    if(this.createOrganisation.status=="INVALID"){
      this.inputFieldStatus = true;
    }
    else{
        this.inputFieldStatus = false;
        let date = new Date();
        date.getDate().toString();
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        let formData = {
          "registered_by_user_id":currentUser.id,
          "service_provider": [
            {
              "service_provider": organisationData.value.orgName,
              "trading_street_address":"",
              "trading_street_address_1": organisationData.value.address1,
              "trading_street_address_2": organisationData.value.address2,
              "trading_city": organisationData.value.subUrb,
              "trading_state": organisationData.value.state,
              "trading_country": organisationData.value.country,
              "trading_postcode": organisationData.value.postCode,
              "email": organisationData.value.orgEmail,
              "provider_status_id": 2,
              // "bank_branch":organisationData.value.branchName,
              // "bank_account":organisationData.value.bankAcc,
              "registration_date": date,
              "website": organisationData.value.orgWebsite
            }
          ],
          "sp_rep":
            [
              {
                "service_provider_rep_status_id": 2,
                "email": currentUser.email,
                "phone": "+61469797339",
                "sp_narrative": "i am football coach with 16 years of experiance"
              }
            ]
        }



        const data = { "params": [{ "name": "p_value", "value": JSON.stringify(formData) }] };
        this._configService.saveOrgansiationDetails(JSON.stringify(data))
          .subscribe((response: any) => {
            const responseData = response && response[0] && response[0].return_message || "";
            this._popupService.showSuccess('Success!, Data Submitted ' + responseData);
            this.goToHome();
          },
            e => {
              console.log(e.error.text);
              this._popupService.showError('Error: ' + e.error.text);
            }
          )
    }    
  }


  showAddressForm() {
    if(this.createOrganisation.controls.orgName.dirty && this.createOrganisation.controls.orgEmail.dirty && this.createOrganisation.controls.orgWebsite.dirty )
    {
      this.addressFormState = true;
      this.detailsFormState = false;
      this.inputFieldStatus = false;
    }else{
      this.inputFieldStatus = true;
    }
    
  }
  showDetailsForm() {
    this.detailsFormState = true;
    this.addressFormState = false;
  }

  goToHome() {
    this.router.navigate(['/home', { step2: this.formStatus }]);
  }
}
