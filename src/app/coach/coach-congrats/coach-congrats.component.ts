import { Component, OnInit } from '@angular/core';
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'koola-coach-congrats',
  templateUrl: './coach-congrats.component.html',
  styleUrls: ['./coach-congrats.component.scss']
})
export class CoachCongratsComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  public createNewSession(event) {
    this.router.navigate(['session']);
  }

}
