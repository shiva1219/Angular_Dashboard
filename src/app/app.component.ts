import { Component } from '@angular/core';
import { ConfigService } from './services/config.service';
import {ToasterService,Toast,ToasterConfig} from 'angular2-toaster';

@Component({
  selector: 'koola-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'koola';
  Session_token:string;
  
  constructor(public configService:ConfigService){
    
   
}
}
