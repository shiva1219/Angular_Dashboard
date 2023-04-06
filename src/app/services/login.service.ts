import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import axios from 'axios';
import { RequestOptions, Request, Headers, RequestMethod } from '@angular/http';
import { Observable } from 'rxjs/observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { config } from 'aws-sdk';
import { Profile, UserVerification, forgotPassword, Regions, sessionToken } from '../api/data-model';
import { environment } from "../../environments/environment";
import { Constants } from '../api/Constants';


const baseApiUrl = environment.apiHost;
const apiKey = environment.dreamfactoryApikey;

@Injectable()
export class LoginService {
  session_token: string;
  headers = new HttpHeaders();
  httpHeaderOptions = null;
  constructor(private http: HttpClient) {

  }

  isLogin(data) {
    localStorage.setItem('userDetails', data.first_name);
    localStorage.setItem('lastName', data.last_name);
    localStorage.setItem('email', data.email);
    localStorage.setItem('userId', data.id);
    localStorage.setItem('userName', data.name);
  }
  getSession(): Observable<any> {
    let data = new sessionToken();
    data.email = "guest.user@primitivegroup.in";
    data.password = "Guest12!@";
    data.duration = 0;
    let httpOptions = {
      headers: new HttpHeaders({
        // 'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Request-Method': '*',
        'Access-Control-Max-Age': '8400',
      })
    };

    console.log("headers---->", JSON.stringify(httpOptions));

    return this.http.post<any>(baseApiUrl + 'user/session', data, httpOptions)
      .map(session => {
        // login successful if there's a jwt token in the response
        if (session && session.session_token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('session_token_signUp', JSON.stringify(session));
        }
        return session;
      })
  };

  searchFilter(data: any, sessionToken): Observable<any> {

    let httpOptionsKoola2 = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'X-DreamFactory-API-Key': Constants.APIKEY,
        'X-DreamFactory-Session-Token': sessionToken//localStorage.getItem('session_token_signUp')
      })
    };
    return this.http.post<any>(Constants.API_ENDPOINT + Constants.SEARCH_FILTER, data, httpOptionsKoola2).pipe(
      map(this.extractData)
    )
  }

  UserSignIn(data: Profile): Observable<any> {


    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');

    return this.http.post<any>(baseApiUrl + 'user/session', data, { headers: headers })
      .map(user => {
        // login successful if there's a jwt token in the response
        if (user && user.session_token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
        }

        return user;
      });
  }
  signUpService(data: any) {
    return this.http.post<any>(baseApiUrl + 'primitive/_func/v_koola_primitive_user_create', data);
  }
  UserSignUp(data: Profile): Observable<Profile> {
    return this.http.post<Profile>(baseApiUrl + 'user/register', data);
  }

  userVerification(data: UserVerification): Observable<UserVerification> {
    return this.http.post<UserVerification>(baseApiUrl + 'user/password?login=false', data);
  }

  forgotPassword(data: forgotPassword): Observable<forgotPassword> {
    return this.http.post<UserVerification>(baseApiUrl + 'user/password?reset=true', data);
  }

  ResetPassword(data: UserVerification): Observable<UserVerification> {
    return this.http.post<UserVerification>(baseApiUrl + 'user/password?login=false', data);
  }
  getCoachByUserId(data: any): Observable<any> {
    return this.http.post(baseApiUrl + 'primitive/_func/v_koola_become_sp_boolean', data);
  }
  private extractData(res: Response) {
    let body = res;
    return body || {};
  }
  /* Search Module */

  getSessions(data: any, sessionToken): Observable<any> {

    let httpOptionsKoola2 = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'X-DreamFactory-API-Key': Constants.APIKEY,
        'X-DreamFactory-Session-Token': sessionToken//localStorage.getItem('session_token_signUp')
      })
    };
    return this.http.post<any>(Constants.API_ENDPOINT + Constants.GET_SESSION_DETAILS, data, httpOptionsKoola2).pipe(
      map(this.extractData)
    )
  }

}

