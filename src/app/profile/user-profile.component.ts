import { Component, OnInit } from '@angular/core';
import {Country,COUNTRIES,Profile,PROFILES} from '../api/data-model';
import { ProfileDataService } from '../services/profile-data.service'

@Component({
  selector: 'koola-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  Countries:Country[];
  profiles:Profile[];
  email:string;
  constructor(private Services: ProfileDataService) { }
  
  ngOnInit() {
    this.getCountries();
     this.getProfiles();
    this.email=this.profiles[0].email;
  };

  uploadImg(){
    let element:HTMLElement = document.getElementById('avatar') as HTMLElement;
    element.click();
  }
  onFileChange(event:any){
    let files = event.target.files;
    this.upload(files[0]);
    alert(files[0].name);
  }
  upload(img: File) {
    var formData: FormData = new FormData();
    formData.append("image", img, img.name);

    var xhr = new XMLHttpRequest();
    xhr.upload.addEventListener("progress", (ev: ProgressEvent) => {
        //You can handle progress events here if you want to track upload progress (I used an observable<number> to fire back updates to whomever called this upload)
    });
    xhr.open("PUT", "../uploads", true);
    xhr.send(formData);
}
 getCountries():void{
    this.Services.getCountries()
   .subscribe(countries => {
     this.Countries=countries;
   })
 }

 getProfiles():void{
  this.Services.getProfiles()
  .subscribe(profiles=>{
    this.profiles = profiles;
  })
 }
 

}
