import { Person } from './../models/Person';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-validator-component',
  templateUrl: './validator-component.component.html',
  styleUrls: ['./validator-component.component.css']
})
export class ValidatorComponentComponent implements OnInit {
  powers = ['Really Smart', 'Super Flexible',
  'Super Hot', 'Weather Changer'];

 model = new Person(18, 'Dr IQ', this.powers[0], 'Chuck Overstreet');

 submitted = false;


  constructor() { }

  ngOnInit() {
  }


  onSubmit() { this.submitted = true; }

  // TODO: Remove this when we're done
  get diagnostic() { return JSON.stringify(this.model); }

  newHero() {
    this.model = new Person(42, '', '');
  }

  skyDog(): Person {
    let myHero = new Person(42, 'SkyDog',
      'Fetch any object at any distance',
      'Leslie Rollover');
    console.log('My Person is called ' + myHero.name); // "My Person is called SkyDog"
    return myHero;
  }

  //////// NOT SHOWN IN DOCS ////////

  // Reveal in html:
  //   Name via form.controls = {{showFormControls(heroForm)}}
  showFormControls(form: any) {
    return form && form.controls['name'] &&
      form.controls['name'].value && form.controls['alterEgo'] && form.controls['alterEgo'].value;// Dr. IQ
  }

}
