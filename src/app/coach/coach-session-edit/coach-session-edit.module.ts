import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { CoachSessionEditRoutingModule } from './coach-session-edit-routing.module';
import { CoachSessionEditComponent } from './coach-session-edit.component';
import { SharedModule } from '../../utils/SharedModule';

@NgModule({
  imports: [
    CommonModule,
    CoachSessionEditRoutingModule,
    SharedModule
  ],
  exports: [],
  declarations: [CoachSessionEditComponent],
  providers: [DatePipe]
})
export class CoachSessionEditModule { }
