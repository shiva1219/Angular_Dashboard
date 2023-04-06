import { sessionToken, Profile, UserVerification } from './../api/data-model';
import { SessionService } from './../services/session.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { LoginService } from '../services/login.service';
import { ModalDirective } from 'ngx-bootstrap';
import { Router } from '@angular/router';
import { DataBroadcastService } from '../data-broadcast.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { PopupService } from '../Helpers/Popup.Service';
import { ConfirmPasswordDirective } from '../custom-directives/confirm-password.directive';
import { NgxSpinnerService } from 'ngx-spinner';
import { MyErrorStateMatcher } from '../shared/header.component';



@Component({
  selector: 'koola-search-area',
  templateUrl: './search-area.component.html',
  styleUrls: ['./search-area.component.scss'],
  providers: [LoginService]
})
export class SearchAreaComponent implements OnInit {
  SignInForm: FormGroup;
  SignUpForm: FormGroup;
  SignUpVerification: FormGroup;
  public registerId: string;
  userVerification: UserVerification;
  someRange = [3, 7];
  createOffering;
  currentUser: any;
  sessionData: any;
  baseUrl = location.origin;
  //ModalSignIn: boolean;
  amenityData = [];
  tempImages: any;
  searchVal: string;
  @ViewChild('ModalSignUp') public ModalSignUp: ModalDirective;
  @ViewChild('ModalSignUpVerification') public ModalSignUpVerification: ModalDirective;
  @ViewChild('ModalSignIn') public ModalSignIn: ModalDirective;
  @ViewChild('ModalDate') public ModalDate: ModalDirective;
  @ViewChild('ModalForgotPassword') public ModalForgotPassword: ModalDirective;


  myData: any;
  message: string;
  sessionSearch: string = "sessionSearchKey";
  hideCart: string = "";
  isShowLogin: boolean = false;
  errorMessages: string[] = [];
  public InputData: Profile;
  name: string;
  error: boolean;
  password: string;
  email: string;
  userName: string;
  validUser: boolean;
  isSignIn: boolean;
  isSignUp: boolean;
  isAlreadyCoach: boolean;
  selectedVal = true;
  rememberMe = false;
  isCollapsed: Boolean = false;
  userToken: string;
  filterSessionForm: FormGroup;
  sessionSearchFilterStartDate;
  sessionSearchFilterEndDate;
  arrayOfStrings = ['this', 'is', 'list', 'of', 'string', 'element'];
  constructor(fb: FormBuilder, private router: Router, public _loginService: LoginService, private sharedService: DataBroadcastService, private _popupService: PopupService, private spinner: NgxSpinnerService) {
    this.LoadFormGroups(fb);
    this.InputData = new Profile();
    this.userVerification = new UserVerification();
    this.loadSessions();
    this.filterSessionForm = fb.group({
      'fromDate': [null, Validators.required],
      'toDate': [null, Validators.required],
      /*  'toggle': [true] */
    }, { validator: this.checkDates });
  }
  public onValChange(val: boolean) {
    this.selectedVal = val;
  }


  checkDates(group: FormGroup) {
    if (group.controls.fromDate.value && group.controls.toDate.value && group.controls.toDate.value <= group.controls.fromDate.value) {
      return { notValid: true };
    }
    return null;
  }

  public save() {
    this.sessionSearchFilterStartDate = this.selectedVal ? this.filterSessionForm.value.fromDate : null;
    this.sessionSearchFilterEndDate = !(this.selectedVal) ? null : this.filterSessionForm.value.toDate;
    this.sesstionFilter();
  }

  public clearFilter() {
    this.sessionSearchFilterStartDate = null;
    this.sessionSearchFilterEndDate = null;

    this.loadSessions();
    this.ModalDate.hide();
  }

  public loadSessions() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    // console.log("current user data--->" + JSON.stringify(this.currentUser));
    if (this.currentUser) {
      // this.isShowLogin = true;
      this.registerId = this.currentUser.id;
      this.userToken = this.currentUser.session_token;
      this.getAllSessions();
    } else {
      // this.isShowLogin = false;
      this._loginService.getSession().subscribe((data: any) => {
        this.registerId = "0";
        this.userToken = data.session_token;
        // console.log("data--->" + JSON.stringify(data.session_token));
        this.getAllSessions();
      });
    }
  }

  ngOnInit() {
    this.spinner.show();
    this.sharedService.sessionData.emit(this.sessionSearch);
    this.sharedService.hideCartItem.emit(this.hideCart);
    if (this.currentUser) {
      this.isShowLogin = true;
    }

    this.sharedService.hideButtons.subscribe((hideBtn: any) => {
      console.log("hide button--->", hideBtn);
      if (hideBtn === "showButton") {
        this.isShowLogin = true;
      } else {
        this.isShowLogin = false;
      }
    })

    this.sharedService.cartData.subscribe(
      (data: any) => {
        //console.log("dataaaaaaaa" + JSON.stringify(data));
        this.myData = data;
        this.getAllSessions();
      });
  }

  public getAllSessions() {

    /* setTimeout(() => {
     
    }, 1000); */
    //console.log("sessionToken" + JSON.stringify(sessionToken));
    var self = this;

    let formData = {
      "registered_by_user_id": this.registerId
    }
    let data = { "params": [{ "name": "p_value", "value": JSON.stringify(formData) }] }

    self._loginService.getSessions(data, this.userToken).subscribe((insertData: any) => {
      self.sessionData = insertData.opportunity_instance_details;
      //console.log("session dataa---->" + JSON.stringify(insertData));
      this.tempImages = self.sessionData;
      console.log("data---->" + this.myData);
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
        // console.log("trmpArr", JSON.stringify(tempArr));
        self.sessionData = tempArr;
      }

      this.spinner.hide();
      // this.sesstionFilter();
    })
  }

  public sesstionFilter() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (this.currentUser) {
      this.registerId = this.currentUser.id;
      this.userToken = this.currentUser.session_token;
      this.sessionFilter();
    } else {
      this._loginService.getSession().subscribe((data: any) => {
        this.registerId = "0";
        this.userToken = data.session_token;
        this.sessionFilter();
      });
    }


    this.ModalDate.hide();

  }

  public sessionFilter() {
    var self = this;
    this.spinner.show();
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    let formData = {
      "registered_by_user_id": this.registerId,
      "opportunity_instance_id": null,//"176",
      "base_offering_id": null,
      "start_date": this.sessionSearchFilterStartDate,
      "completion_date": this.sessionSearchFilterEndDate,
      "postcode": null
    }

    let data = { "params": [{ "name": "p_value", "value": JSON.stringify(formData) }] }
    this._loginService.searchFilter(JSON.stringify(data), this.userToken)
      .subscribe((response: any) => {
        console.log("seach filter response" + JSON.stringify(response));
        this.tempImages = [];
        this.sessionData = [];
        self.sessionData = response.opportunity_instance_details;
        this.tempImages = self.sessionData;
        this.sessionData = this.tempImages;
        this.spinner.hide();
      });
  }

  valueChanged(newVal) {
    // console.log("Case 2: value is changed to ", newVal);
  }
  Arr = Array; //Array type captured in a variable
  num: number = 7;
  arrayofImageSrc = ["./assets/ahmedabad_001.png", "./assets/mumbai_001.png", "./assets/patna_001.png", "./assets/pune_001.png", "./assets/surat_001.png", "./assets/thane_001.png", "./assets/visakhapatnam_001.png"]


  public viewSessionCartPage(event, sessionId) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (this.currentUser) {
      this.isShowLogin = true;
      console.log("current user");
      //ModalSignIn.show()
      //this.router.navigate(['cart', { id: sessionId }]);
      this.router.navigate(['sessionDetails', { page: "search", id: sessionId }]);
    } else {
      this.isShowLogin = false;
      console.log("else");
      //this.router.navigate(['/']);
    }
    //return false;
  }

  private LoadFormGroups(fb) {
    this.SignUpForm = fb.group({
      'firstname': [null, Validators.required],
      'lastname': [null, Validators.required],
      'email': [null, Validators.compose([Validators.required, Validators.email])],
      'terms': [null, Validators.requiredTrue],
      'marketingPolicy': [null, Validators.required]
    });

    this.SignInForm = fb.group({
      'email': [null, Validators.compose([Validators.required, Validators.email])],
      'password': [null, Validators.required],
      'rememberMe': [null]
    });

    this.SignUpVerification = fb.group({
      'code': [null, Validators.required],
      'password': [null, Validators.required],
      'confirm': [null, Validators.required]
    }, {
        validator: ConfirmPasswordDirective.MatchPassword
      }
    );
  }
  matcher = new MyErrorStateMatcher();

  reserErrorMessages() {
    this.errorMessages = [];
  }

  submitSignInForm(value) {
    this.InputData.email = value.value.email;
    this.InputData.password = value.value.password;
    this.errorMessages = [];
    this._loginService.UserSignIn(this.InputData)
      .subscribe((response: any) => {
        if (value.value.rememberMe) {
          localStorage.setItem("AuthLogins", JSON.stringify(this.InputData));
        }
        else {
          localStorage.removeItem("AuthLogins");
        }
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this._popupService.showSuccess('Success!, Logged as ' + response.email);
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser) {
          //kiran
          this.isShowLogin = true;
          this.sharedService.hideSignInData.emit("hidesignIn");
          this.SignUpConfirmation(currentUser);
        }

        // this.toastr.success('Success!, Logged as ' + response.email, null, { toastLife: 10000, showCloseButton: true });
        this.userName = this.currentUser.name;
        this.ModalSignIn.hide();
        // this.getSessionToken(this.sessionToken);
        this.isValid();
        // alert(response);

      },
        e => {
          this.error = true;
          this.errorMessages.push(e.error.error.message);
          this._popupService.showError('Something went Wrong! ' + e.error.error.message);
          // this.toastr.error('Something went Wrong! ' + e.error.error.message, null, { toastLife: 10000, showCloseButton: true });
          this.LogOut();
          console.log(e);
          // alert(e);

        }
      )
    // this.childModal.hide();
  }

  private SignUpConfirmation(currentUser) {

    var formData =
    {
      "primitive_user_id": currentUser.id,
      "primitive_user": currentUser.email,
      "identity_provider": "SignUp",
      "cname": currentUser.name,
      "surname": currentUser.last_name,
      "sex": "",
      "date_of_birth": "1999-09-09",
      "status": "",
    }
    let data = { "params": [{ "name": "p_value", "value": JSON.stringify(formData) }] }
    this._loginService.signUpService(JSON.stringify(data))
      .subscribe((response: any) => {
        console.log("login service");
      });

  }

  submitSignUpForm(value: any) {
    this.InputData.first_name = value.value.firstname;
    this.InputData.last_name = value.value.lastname;
    this.InputData.email = value.value.email;
    this.InputData.password = "";
    this.errorMessages = [];
    this._loginService.getSession().subscribe();
    this._loginService.UserSignUp(this.InputData)
      .subscribe((response: Profile) => {
        this.ModalSignUp.hide();
        this.ModalSignUpVerification.show();
        this._popupService.showSuccess('Success!, Created New User');
        // this.toastr.success('Success!, Created New User ', null, { toastLife: 10000, showCloseButton: true });

      },
        e => {
          this.error = true;
          this._popupService.showError('Something went Wrong! ' + e.error.error.message);
          //  this.toastr.error('Something went Wrong! ' + e.error.error.context.email, null, { toastLife: 10000, showCloseButton: true });
          this.errorMessages.push(e.error.error.context.email);

        }
      )

  }

  public submitSignUpVerification(value: any) {
    this.userVerification.email = this.InputData.email;
    this.userVerification.code = value.value.code;
    this.userVerification.new_password = value.value.password;
    this.errorMessages = [];
    this._loginService.userVerification(this.userVerification)
      .subscribe(response => {
        this._popupService.showSuccess('Success!,Verified , Please login again');
        //    this.toastr.success('Success!,Verified ', null, { toastLife: 10000, showCloseButton: true });
      },
        e => {
          this._popupService.showError('Something went Wrong! ' + e.error.error.message);
          //    this.toastr.error('Something went Wrong! ' + e.error.message, null, { toastLife: 10000, showCloseButton: true });
          this.error = true;
          this.errorMessages.push(e.error.error.message);
        }
      )
  }

  IsCoach(id) {
    let formData = {
      "registered_by_user_id": id
    };
    const data = { "params": [{ "name": "p_value", "value": JSON.stringify(formData) }] };
    this._loginService.getCoachByUserId(data)
      .subscribe(response => {
        if (response.return_message && response.return_message == 'DISABLE') {
          //  this.isAlreadyCoach = true;
        } else {
          //  this.isAlreadyCoach = false;
        }
      },

        e => {
          if (e.error) {
            this.LogOut();
          }
        })
  }

  isValid() {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser && currentUser.name) {
      this.validUser = true;
      this.isSignIn = false;
      this.isSignUp = false;
      this.userName = currentUser.name;
      this.IsCoach(currentUser.id);
      this.name = currentUser.first_name.charAt(0).toUpperCase() + currentUser.last_name.charAt(0).toUpperCase();

      return true;
    } else {
      this.LogOut();
      return false;

    }
  }

  LogOut() {
    this.validUser = false;
    this.isSignIn = true;
    this.isSignUp = true;
    this.isAlreadyCoach = true;
    localStorage.setItem('isLogin', JSON.stringify(false));
    localStorage.removeItem('currentUser');
    this.router.navigate(['/']);
  }

}
