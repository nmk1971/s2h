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

  constructor(private http: HttpClient) {
    this.currentSessionSubject = new BehaviorSubject<ISession>(JSON.parse(localStorage.getItem('currentSession')));
    this.currentSession$ = this.currentSessionSubject.asObservable();
  }

  public get currentSessionValue(): ISession {
    return this.currentSessionSubject.value;
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


  endSession(): void {
    // remove user from local storage to log user out
    localStorage.removeItem('currentSession');
    this.currentSessionSubject.next(null);
  }
}
