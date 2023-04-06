import { NumberOnlyDirective } from './../shared/NumberOnlyDirective';
import { ModalModule } from 'ngx-bootstrap';
import { CoachSessionEditComponent } from './coach-session-edit/coach-session-edit.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../utils/SharedModule';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '..//guards/auth.guards';
import { CoachProfileActivitiesComponent } from './coach-profile-activities/coach-profile-activities.component';
import { CoachProfileCertificationsComponent } from './coach-profile-certifications/coach-profile-certifications.component';
import { CoachProfileComponent } from './coach-profile/coach-profile.component';
import { CoachProfileHomeComponent } from './coach-profile-home/coach-profile-home.component';
import { CoachCongratsComponent } from './coach-congrats/coach-congrats.component';
import { CoachSessionComponent } from './coach-session/coach-session.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { CoachSessionModule } from './coach-session/coach-session.module';
import { CoachSessionDetailsComponent } from './coach-session-details/coach-session-details.component';
import { CoachSessionDetailsModule } from './coach-session-details/coach-session-details.module';
import { CoachSessionCartComponent } from './coach-session-cart/coach-session-cart.component';
import { CoachSessionSearchComponent } from './coach-session-search/coach-session-search.component';
import { CoachSessionEditModule } from './coach-session-edit/coach-session-edit.module';
import { CoachCartPaymentComponent } from './coach-cart-payment/coach-cart-payment.component';

const coachRoutes: Routes = [
    {
        path: 'profile',
        component: CoachProfileComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'activities',
        component: CoachProfileActivitiesComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'certificate',
        component: CoachProfileCertificationsComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'home',
        component: CoachProfileHomeComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'congrats',
        component: CoachCongratsComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'session',
        component: CoachSessionComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'sessionDetails',
        component: CoachSessionDetailsComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'sessionEdit',
        component: CoachSessionEditComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'cart',
        component: CoachSessionCartComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'cartPayment',
        component: CoachCartPaymentComponent,
        canActivate: [AuthGuard]
    }

];
@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        RouterModule.forChild(coachRoutes),
        CoachSessionModule,
        CoachSessionDetailsModule,
        CoachSessionEditModule,
        ModalModule.forRoot()
    ],
    declarations: [
        CoachProfileComponent,
        CoachProfileActivitiesComponent,
        CoachProfileCertificationsComponent,
        CoachProfileHomeComponent,
        CoachCongratsComponent,
        CoachSessionCartComponent,
        CoachSessionSearchComponent,
        CoachCartPaymentComponent,

    ],
    providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }],

})
export class CoachModule {

}
