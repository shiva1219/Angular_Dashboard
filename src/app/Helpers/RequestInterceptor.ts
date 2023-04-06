import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from "../../environments/environment";


const baseApiUrl = environment.apiHost;
const apiKey = environment.dreamfactoryApikey;
@Injectable()
export class RequestInterceptor implements HttpInterceptor {

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        let sessionToken = JSON.parse(localStorage.getItem('session_token_signUp'));
        if (request.url.includes('primitive')) {
            // find if any user matches login credentials
            if (currentUser && currentUser.session_token) {
                request = request.clone({
                    setHeaders: {
                        'Content-Type': 'application/json',
                        'X-DreamFactory-API-Key': apiKey,
                        'X-DreamFactory-Session-Token': currentUser.session_token
                    }
                });
            }
        } 
        else
         {
            if (sessionToken && sessionToken.session_token) {
                request = request.clone({
                    setHeaders: {
                        'Content-Type': 'application/json',
                        'X-DreamFactory-API-Key': apiKey,
                        'X-DreamFactory-Session-Token': sessionToken.session_token
                    }
                });
            }
        }

        return next.handle(request);

    }

}