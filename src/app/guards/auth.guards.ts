import { Injectable, Input } from '@angular/core';
import { Location } from '@angular/common';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { tokenService} from '../guards/token.service';
import {PopupService} from '../Helpers/Popup.Service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private router: Router,
     private _tokenService:tokenService,
    private _popupService :PopupService) { 
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser) {
          
            // logged in so return true
           let date =  this._tokenService.getTokenExpirationDate(currentUser.session_token);
           let isExpired =  this._tokenService.isTokenExpired(currentUser.session_token);
           if(isExpired)
           {
             this._popupService.showError("Session Expired please login Again");
           // waitTime(1000);
           delay(6000).then(any=>{
            this.logOut();
            return false;
            });
           
           }
            return true;

        }
        // not logged in so redirect to login page with the return url
    
        
        this.router.navigate(['/'], { queryParams: { returnUrl: state.url }});
        return false;
    }
        

     private logOut(){
        localStorage.removeItem('currentUser');
        this.router.navigate(['/']);
        location.reload();
     }
      
}
async function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
 