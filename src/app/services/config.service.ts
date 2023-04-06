import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import axios from 'axios';
import { RequestOptions, Request, Headers, RequestMethod } from '@angular/http';
import { Observable } from 'rxjs/observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap, refCount } from 'rxjs/operators';
import { config } from 'aws-sdk';
import { Profile, UserVerification, forgotPassword, Regions, sessionToken } from '../api/data-model';
import { environment } from "../../environments/environment";
import 'rxjs/add/operator/publishReplay';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',

  })
};
const baseApiUrl = environment.apiHost;
const apiKey = environment.dreamfactoryApikey;

@Injectable()
export class ConfigService {
  session_token: string;
  headers = new HttpHeaders();
  httpGetOptions = null;
  getOpportunitiesData: Observable<any> ;
  getFloorSurfacesData: Observable<any> ;
  getAgeGroupsData: Observable<any> ;
  constructor(private http: HttpClient) {
  }


  getRegions(): Observable<any> {
    return this.http.get(baseApiUrl + 'primitive/_func/v_koola_region_select');
  }
  getOpportunities(): Observable<any> {
    if (!this.getOpportunitiesData) {
      this.getOpportunitiesData = this.http.get(baseApiUrl + 'primitive/_func/v_koola_opportunity_select').map(data => data)
      .publishReplay(1).refCount();
    }
    return this.getOpportunitiesData;
  }
  getPincodes(data: any): Observable<any> {
    return this.http.post(baseApiUrl + 'primitive/_func/v_koola_postcode_select', data);
  }
  getFloorSurfaces(): Observable<any> {
    if (!this.getFloorSurfacesData) {
      this.getFloorSurfacesData = this.http.get(baseApiUrl + 'primitive/_func/v_koola_surface_quality_select').map(data => data)
      .publishReplay(1).refCount();
    }
    return this.getFloorSurfacesData;
    }
  getAgeGroups(): Observable<any> {
    if (!this.getAgeGroupsData) {
      this.getAgeGroupsData =  this.http.get(baseApiUrl + 'primitive/_func/v_koola_target_age_group_select').map(data => data)
      .publishReplay(1).refCount();
    }
    return this.getAgeGroupsData;
    }
  getExpertises(): Observable<any> {
    return this.http.get(baseApiUrl + 'primitive/_func/v_koola_consumer_expertise_select');
  }
  getCertificates(data: any): Observable<any> {
    return this.http.post(baseApiUrl + 'primitive/_func/v_koola_certifications_select', data);
  }
  saveOrgansiationDetails(data: any): Observable<any> {
    return this.http.post(baseApiUrl + 'primitive/_func/v_koola_sp_onboarding_create', data);
  }
  saveOfferingDetails(data: any): Observable<any> {
    return this.http.post(baseApiUrl + 'primitive/_func/v_koola_base_offering_create', data);
  }
  saveCertificateDetails(data: any): Observable<any> {
    return this.http.post(baseApiUrl + 'primitive/_func/v_koola_sp_profile_create', data);
  }

 


}

