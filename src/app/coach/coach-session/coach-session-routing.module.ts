import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { CoachSessionComponent } from './coach-session.component';

const routes: Routes = [
  { path: '', component: CoachSessionComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class CoachSessionRoutingModule { }
