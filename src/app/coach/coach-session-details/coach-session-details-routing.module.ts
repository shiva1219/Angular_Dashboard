import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { CoachSessionDetailsComponent } from './coach-session-details.component';

const sessionDetails: Routes = [
  { path: '', component: CoachSessionDetailsComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(sessionDetails)
  ],
  exports: [RouterModule]
})
export class CoachSessionDetailsRoutingModule { }
