import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-googlemaps',
  templateUrl: './googlemaps.component.html',
  styleUrls: ['./googlemaps.component.css']
})
export class GooglemapsComponent implements OnInit {
  lat: number = 17.6868;
  lng: number = 83.2185;

  constructor() { }

  ngOnInit() {
  }

}
