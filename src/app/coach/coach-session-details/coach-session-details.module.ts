import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { CoachSessionDetailsComponent } from './coach-session-details.component';
import { CoachSessionDetailsRoutingModule } from './coach-session-details-routing.module';
import { SharedModule } from '../../utils/SharedModule';


@NgModule({
  imports: [
    CommonModule,
    CoachSessionDetailsRoutingModule,
    SharedModule
  ],
  exports: [],
  declarations: [CoachSessionDetailsComponent],
  providers: [DatePipe]
})
export class CoachSessionDetailsModule { }
