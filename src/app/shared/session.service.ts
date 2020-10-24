import { AuthenticationService } from './user/authentication.service';
import { ISession } from './models/session.model';
import { environment } from './../../environments/environment';
import { IApiResponse } from './helpers/api-response.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';


/*
* This survice assure the first connection to api
*/

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private currentSessionSubject: BehaviorSubject<ISession>;
  public currentSession$: Observable<ISession>;
  private sessionResponseSubject: BehaviorSubject<any>;
  public sessionResponse$: Observable<any>;

  constructor(private http: HttpClient, private authenticationService: AuthenticationService) {
    // set raw session as observable
    this.currentSessionSubject = new BehaviorSubject<ISession>(JSON.parse(localStorage.getItem('currentSession')));
    this.currentSession$ = this.currentSessionSubject.asObservable();

    // set session populated for student response
    this.sessionResponseSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('sessionResponse')));
    this.sessionResponse$ = this.sessionResponseSubject.asObservable();
  }

  public get currentSessionValue(): ISession {
    return this.currentSessionSubject.value;
  }

  public get sessionResponseValue(): any {
    return this.sessionResponseSubject.value;
  }

  connect(code: string): Observable<any> {
    let session: ISession;
    return this.http.get(`${environment.apiUrl}/api/v1/response/sessionbycode/${code}`)
      .pipe(map((response: IApiResponse) => {
        try {
          session = { ...response.payload };
          if (session) {
            localStorage.setItem('currentSession', JSON.stringify(session));
            this.currentSessionSubject.next(session);
          }

        } catch (error) {
          session = null;
        }
        return ({
          status: response.status,
          message: response.message,
          payload: session
        });
      })) as Observable<IApiResponse>;
  }

  getTheQuiz(sessionId: string): Observable<any> {
    let sessionResponse: any;
    return this.http.get(`${environment.apiUrl}/api/v1/response/session/${sessionId}`)
      .pipe(map((response: IApiResponse) => {
        try {
          sessionResponse = { ...response.payload };
          if (sessionResponse) {
            if (!sessionResponse.isAnonymous){
              sessionResponse.studentId = this.authenticationService.currentUserValue._id;
            }
            localStorage.setItem('sessionResponse', JSON.stringify(sessionResponse));
            this.currentSessionSubject.next(sessionResponse);
          }

        } catch (error) {
          sessionResponse = null;
        }
        return ({
          status: response.status,
          message: response.message,
          payload: sessionResponse
        });
      })) as Observable<IApiResponse>;
  }

  endSession(): void {
    // remove user from local storage to log user out
    localStorage.removeItem('currentSession');
    localStorage.removeItem('sessionResponse');
    this.currentSessionSubject.next(null);
    this.sessionResponseSubject.next(null);
  }
}
