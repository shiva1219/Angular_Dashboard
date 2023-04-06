import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { CoachSessionComponent } from './coach-session.component';
import { CoachSessionRoutingModule } from './coach-session-routing.module';
import { SharedModule } from '../../utils/SharedModule';

@NgModule({
  imports: [
    CommonModule,
    CoachSessionRoutingModule,
    SharedModule
  ],
  exports: [],
  declarations: [CoachSessionComponent],
  providers: [DatePipe]
})
export class CoachSessionModule { }
