import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs'; //of
import { map, catchError, tap } from 'rxjs/operators';
import { sessionToken } from '../api/data-model';
import { Session } from 'protractor';
import { JsonPipe } from '@angular/common';
import { Constants } from '../api/Constants';

@Injectable()
export class SessionService {

  constructor(private http: HttpClient) { }
  currentUser = JSON.parse(localStorage.getItem("currentUser"));

  public httpOptionsKoola = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'X-DreamFactory-API-Key': Constants.APIKEY,
      'X-DreamFactory-Session-Token': this.currentUser.session_token
    })
  };

  private extractData(res: Response) {
    let body = res;
    return body || {};
  }

  public getJSON(): Observable<any> {
    return this.http.get("./assets/offering.json")
  }

  public getRequest(url: String): Observable<any> {
    return this.http.get(Constants.API_ENDPOINT + url, Constants.httpOptions).pipe(
      map(this.extractData));
  };

  getBaseoffering(data: any): Observable<any> {
    return this.http.post<any>(Constants.API_ENDPOINT + Constants.BASE_OFFERING, data, this.httpOptionsKoola).pipe(
      map(this.extractData))

  };

  amenities(data: any): Observable<any> {
    return this.http.post<any>(Constants.API_ENDPOINT + Constants.AMINITIES, data, this.httpOptionsKoola).pipe(
      map(this.extractData))

  };

  getVenueSelect(data: any): Observable<any> {
    return this.http.post<any>(Constants.API_ENDPOINT + Constants.VENUE_SELECT, data, this.httpOptionsKoola).pipe(
      map(this.extractData)
    )
  };

  getSession(): Observable<any> {
    console.log("getSession");
    let data = new sessionToken();
    data.email = "guest.user@primitivegroup.in";
    data.password = "Guest12!@";
    data.duration = 0;
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    return this.http.post<any>(Constants.API_ENDPOINT + Constants.USER_SESSION, data, httpOptions).pipe(
      map(this.extractData))
  };

  sessionInstanceCreate(data: any): Observable<any> {
    return this.http.post<any>(Constants.API_ENDPOINT + Constants.COACH_SESSION_INSTANCE_CREATE,
      data, this.httpOptionsKoola).pipe(
        map(this.extractData)
      )
  };

  sessionInstanceUpdate(data: any): Observable<any> {
    return this.http.post<any>(Constants.API_ENDPOINT + Constants.COACH_SESSION_INSTANCE_DELETE, data, this.httpOptionsKoola).pipe(
      map(this.extractData)
    )
  };

  /* ==== SessionImages ==== */
  getImageSelect(data: any): Observable<any> {
    return this.http.post<any>(Constants.API_ENDPOINT + Constants.K_IMAGE_SELECT, data, this.httpOptionsKoola).pipe(
      map(this.extractData)
    )
  }


  /* ==== SessionDetails ==== */
  getOpportunityInstance(data: any): Observable<any> {
    return this.http.post<any>(Constants.API_ENDPOINT + Constants.OPPORTUNITY_INSTANCE, data, this.httpOptionsKoola).pipe(
      map(this.extractData)
    )
  };
  sessionPreviewUpdate(data: any): Observable<any> {
    return this.http.post<any>(Constants.API_ENDPOINT + Constants.INSTANCE_PREVIEW_UPDATE, data, this.httpOptionsKoola).pipe(
      map(this.extractData)
    )
  }


  /* private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  } */


  /* ========= cart Module ============ */
  insertCartDetails(data: any): Observable<any> {
    return this.http.post<any>(Constants.API_ENDPOINT + Constants.INSERT_CART, data, this.httpOptionsKoola).pipe(
      map(this.extractData)
    )
  }

  deleteCartDetails(data: any): Observable<any> {
    return this.http.post<any>(Constants.API_ENDPOINT + Constants.DELETE_CART, data, this.httpOptionsKoola).pipe(
      map(this.extractData)
    )
  }

  searchCartDetails(data: any): Observable<any> {
    return this.http.post<any>(Constants.API_ENDPOINT + Constants.SEARCH_CART, data, this.httpOptionsKoola).pipe(
      map(this.extractData)
    )
  }

  /* Search Module */

  getSessions(data: any): Observable<any> {

    let httpOptionsKoola2 = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'X-DreamFactory-API-Key': Constants.APIKEY,
        'X-DreamFactory-Session-Token': localStorage.getItem('session_token_signUp')
      })
    };
    return this.http.post<any>(Constants.API_ENDPOINT + Constants.GET_SESSION_DETAILS, data, httpOptionsKoola2).pipe(
      map(this.extractData)
    )
  }

}
