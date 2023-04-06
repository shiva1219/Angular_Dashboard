import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { CoachSessionEditComponent } from './coach-session-edit.component';

const sessionEdit: Routes = [
  { path: '', component: CoachSessionEditComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(sessionEdit)
  ],
  exports: [RouterModule]
})
export class CoachSessionEditRoutingModule { }
