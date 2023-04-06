import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchAreaComponent } from './work-area/search-area.component';
import { UserProfileComponent } from './profile/user-profile.component';
import { CoachProfileComponent } from './profile/coach-profile.component';
import { AuthGuard } from './guards/auth.guards';
import { CoachModule } from './coach/coach.module';

const routes: Routes = [
  { path: '', component: SearchAreaComponent},
  { path: 'userProfile', component: UserProfileComponent, canActivate: [AuthGuard] },
  { path: 'coach', component: CoachProfileComponent, canActivate: [AuthGuard] },
  { path: 'coach1', loadChildren: './coach/coach.module#CoachModule'},

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
