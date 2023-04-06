import { DataBroadcastService } from './../data-broadcast.service';
//#region
import { Component, OnInit, Inject, Input, ViewChild, AfterContentInit } from '@angular/core';
import { ModalModule } from 'ngx-bootstrap';
import { ModalDirective } from 'ngx-bootstrap/modal/modal.directive';
import {
  FormsModule, ReactiveFormsModule, FormControl, FormGroupDirective, NgForm,
  FormBuilder, Validators, FormGroup, EmailValidator
} from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { ErrorStateMatcher } from '@angular/material/core';
import {
  Country, COUNTRIES, Profile, PROFILES, userProfile, UserVerification,
  Regions, sessionToken, forgotPassword
} from '../api/data-model';
import { ProfileDataService } from '../services/profile-data.service';
import { AppRoutingModule } from '../app-routing.module';
import { RouterLink, Router, NavigationEnd, NavigationStart } from '@angular/router';
import { ConfigService } from '../services/config.service';
import { LoginService } from '../services/login.service';
import { ConfirmPasswordDirective } from '../custom-directives/confirm-password.directive';
import { PopupService } from '../Helpers/Popup.Service';
import { CoachSessionSearchComponent } from '../coach/coach-session-search/coach-session-search.component';
//import { SessionService } from '../services/session.service';
//#endregion
/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'koola-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: []
})

export class HeaderComponent implements OnInit, AfterContentInit {

  SignUpForm: FormGroup;
  SignInForm: FormGroup;
  SignUpVerification: FormGroup;
  ForgotPassword: FormGroup;
  ResetPassword: FormGroup;
  public InputData: Profile;
  userVerification: UserVerification;
  profiles: Profile[];
  validUser: boolean;
  forgetpassword: forgotPassword;
  isSignIn: boolean;
  isSignUp: boolean;
  isAlreadyCoach: boolean;
  userName: string;
  name: string;
  error: boolean;
  errorMessages: string[] = [];
  public userDetails: userProfile;
  password: string;
  email: string;
  currentUser;
  rememberMe = false;
  isCollapsed: Boolean = false;
  searchkey: any;
  href;

  isSearch: Boolean = false;
  isCartItem: Boolean = false;
  navbarProgressWidth = 0;
  @ViewChild('ModalSignUp') public ModalSignUp: ModalDirective;
  @ViewChild('ModalSignUpVerification') public ModalSignUpVerification: ModalDirective;
  @ViewChild('ModalSignIn') public ModalSignIn: ModalDirective;
  @ViewChild('ModalForgotPassword') public ModalForgotPassword: ModalDirective;
  @ViewChild('ModalResetPassword') public ModalResetPassword: ModalDirective;

  data: any = "";

  constructor(fb: FormBuilder,
    private ProfileService: ProfileDataService,
    public _loginService: LoginService,
    //public rest: SessionService,
    private _popupService: PopupService,
    private router: Router, private sharedService: DataBroadcastService) {
    this.InputData = new Profile();
    this.forgetpassword = new forgotPassword();
    this.userVerification = new UserVerification();
    this.validUser = false;
    this.isSignIn = true;
    this.isSignUp = true;
    this.isAlreadyCoach = true;
    this.error = false;
    this.userDetails = new userProfile();
    this.LoadFormGroups(fb);
  }

  ngAfterContentInit() {

    this.sharedService.cartData.emit("ngAfterContentInit: " + this.data);

    this.sharedService.sessionData.subscribe(
      (sessionSearch: any) => {
        console.log("sessionSearchKey-----> ", sessionSearch);
        if (sessionSearch === "sessionSearchKey") {
          this.isSearch = true;
        } else {
          this.isSearch = false;
        }
      })

    this.sharedService.hideCartItem.subscribe(
      (hideCart: any) => {
        if (hideCart === "cartItem") {
          this.isCartItem = true;
          this.isAlreadyCoach = false;
        } else {
          this.isCartItem = false;
          this.isAlreadyCoach = true;
        }
      })

    this.sharedService.hideSignInData.subscribe((hideSignin: any) => {
      if (hideSignin) {
        this.isValid();
      }
    })

  }

  //comp: CoachSessionSearchComponent = new CoachSessionSearchComponent(this.router, this.rest);
  ngOnInit() {
    /* var self = this;
    self.sharedService.getSub().subscribe((data: any) => {
      console.log("hello kiran--->", data);
      if (data) {
        console.log("test kiran--->", data);
        self.isSearch = true;
        self.sharedService.clearSub();
      }
    }); */


    const valid = this.isValid();
    const AuthLogin = JSON.parse(localStorage.getItem('AuthLogins'));
    if (AuthLogin && AuthLogin.email) {
      this.email = AuthLogin.email;
      this.password = AuthLogin.password;
      this.rememberMe = true;
    }
    this.router.events.subscribe((val) => {
      // see also
      if (val instanceof NavigationStart) {
        if (val["url"].includes("profile")) {
          this.navbarProgressWidth = 25;
        } else if (val["url"].includes("activities")) {
          this.navbarProgressWidth = 50;
        } else if (val["url"].includes("certificate")) {
          this.navbarProgressWidth = 75;
        } else {
          this.navbarProgressWidth = 0;
        }
      }
    });
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

    this.ForgotPassword = fb.group({
      'email': [null, Validators.compose([Validators.required, Validators.email])]
    });
    this.ResetPassword = fb.group({
      'email': [null, Validators.compose([Validators.required, Validators.email])],
      'code': [null, Validators.required],
      'password': [null, Validators.required],
      'confirm': [null, Validators.required]
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
          this.sharedService.hideButtons.emit("showButton");
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

  public titleChange(event) {
    console.log("search key ---->" + this.searchkey);
    this.sharedService.cartData.emit(this.searchkey);
  }

  public

  submitSignUpVerification(value: any) {
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

  submitForgetPassword(value: any) {
    this.forgetpassword.email = value.value.email;
    this.errorMessages = [];
    this._loginService.forgotPassword(this.forgetpassword)
      .subscribe(response => {
        console.log(response);
        this.ModalForgotPassword.hide();
        this.ModalResetPassword.show();
      },
        e => {
          this.error = true;
          this.errorMessages.push(e.error.error.message);
        })
  }
  submitResetPassword(value: any) {
    this.userVerification.email = value.value.email;
    this.userVerification.code = value.value.code;
    this.userVerification.new_password = value.value.password;
    this.errorMessages = [];
    this._loginService.ResetPassword(this.userVerification)
      .subscribe(response => {
        this.ModalResetPassword.hide();
      },
        e => {
          this.error = true;
          this.errorMessages.push(e.error.error.message);
        })
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
    //
    this.sharedService.hideButtons.emit("hideButton");
    this.router.navigate(['/']);
  }
  BecomeCoach() {
    if (!this.isSignIn) {
      // this.isAlreadyCoach = false;
    }
    this.router.navigate(['/home']);

  }

}



