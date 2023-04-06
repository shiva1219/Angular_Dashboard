import { DataBroadcastService } from './data-broadcast.service';
// the browser platform with a compiler
import { NgModule } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CollapseModule, ModalModule, BsDatepickerModule, BsDropdownModule } from 'ngx-bootstrap';
import { Ng2AutoCompleteModule } from 'ng2-auto-complete';
import { NgSelectModule } from '@ng-select/ng-select';
import { ConfirmPasswordDirective } from './custom-directives/confirm-password.directive';
import { ProfileDataService } from './services/profile-data.service';
import { DataService } from './services/data.service';
import { AwsService } from './services/aws.service';
import { ConfigService } from './services/config.service';
import { LoginService } from './services/login.service';
import { Angular2FontawesomeModule } from 'angular2-fontawesome/angular2-fontawesome';
import { ToasterModule, ToasterService } from 'angular2-toaster';
import { AuthGuard } from './guards/auth.guards';
import { tokenService } from './guards/token.service';
import { RequestInterceptor } from './Helpers/RequestInterceptor';
import { PopupService } from './Helpers/Popup.Service';
import { SharedModule } from './utils/SharedModule';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { FooterComponent } from './shared/footer.component';
import { SearchAreaComponent } from './work-area/search-area.component';
import { CoachModule } from './coach/coach.module';
// import { HeaderComponent } from './shared/header.component';
import { UserProfileComponent } from './profile/user-profile.component';
import { AppRoutingModule } from './app-routing.module';
import { CoachProfileComponent } from './profile/coach-profile.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
//import { SessionService } from './services/session.service';
import { NgxSpinnerModule } from 'ngx-spinner';


@NgModule({
  declarations: [
    AppComponent,
    // HeaderComponent,
    FooterComponent,
    SearchAreaComponent,
    UserProfileComponent,
    ConfirmPasswordDirective,
    CoachProfileComponent,
  ],
  imports: [
    SharedModule,
    CoachModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CollapseModule,
    NgSelectModule,
    BsDropdownModule.forRoot(),
    Ng2AutoCompleteModule,
    Angular2FontawesomeModule,
    BsDatepickerModule,
    BrowserAnimationsModule,
    ToasterModule.forRoot(),
    ModalModule.forRoot(),
    NgxSpinnerModule
  ],
  providers: [
    ProfileDataService,
    DataService,
    AwsService,
    ConfigService,
    LoginService,
    AuthGuard,
    JwtHelperService,
    tokenService,
    ToasterService,
    //SessionService,
    DataBroadcastService,
    PopupService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestInterceptor,
      multi: true
    },
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
