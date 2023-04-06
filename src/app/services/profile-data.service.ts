import { Injectable } from '@angular/core';
import { COUNTRIES, Country,Profile,PROFILES,userProfile } from '../api/data-model';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

@Injectable()
export class ProfileDataService {

  delayMs = 500;
  constructor() { }
  profileArray:Profile[] = PROFILES;
  userprofile:userProfile = new userProfile();

  getCountries():Observable<Country[]>{
    return of(COUNTRIES);
  }

  saveProfiles(prof:Profile):void{
    PROFILES.push(prof);
  }

  getProfiles():Observable<Profile[]>{
    return of(PROFILES);
  }

  validate(logins:Profile): Observable<userProfile> {
    this.userprofile.isValid = true;
    this.userprofile.userName = logins.email;
    return of(this.userprofile);
  }

  uploadImg(img:File):Observable<string>{
    return of("");
  }

}
