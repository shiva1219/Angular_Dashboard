import { Injectable } from '@angular/core';
import { JwtHelperService  } from '@auth0/angular-jwt';



const helper = new JwtHelperService();
@Injectable()
export class tokenService {


  private headers = new Headers({ 'Content-Type': 'application/json' });
  
  constructor() { 

  }

  getTokenExpirationDate(token: string): Date {
    const decodedToken = helper.decodeToken(token);

    if (decodedToken.exp === undefined) return null;

    const date = new Date(0); 
    date.setUTCSeconds(decodedToken.exp);
    return date;
  }

  isTokenExpired(token?: string): boolean {
    if(!token) return true;
    const isExpired = helper.isTokenExpired(token);
    const date = this.getTokenExpirationDate(token);
    if(date === undefined) return false;
    return !(date.valueOf() > new Date().valueOf());
  }


}