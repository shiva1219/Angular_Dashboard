import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'koola-coach-profile-home',
  templateUrl: './coach-profile-home.component.html',
  styleUrls: ['./coach-profile-home.component.scss']
})
export class CoachProfileHomeComponent implements OnInit {
  step1: boolean = true;
  step2: boolean = false;
  step3: boolean = false;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit() {
    if (this.activatedRoute.snapshot.params["step2"] == "true") {
      this.step1 = false;
      this.step2 = true;
      this.step3 = false;
    } else if (this.activatedRoute.snapshot.params["step3"] == "true") {
      this.step1 = false;
      this.step2 = false;
      this.step3 = true;
    } else {
      this.step1 = true;
      this.step2 = false;
      this.step3 = false;
    }
  }

  goToProfile() {
    this.router.navigateByUrl('profile');
  }

  goToActivities() {
    this.router.navigate(['activities']);
  }

  goToCreateSession() {
    this.router.navigateByUrl('certificate');
  }

}
