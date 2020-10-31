import { ToastService } from './toast.service';
import { AuthenticationService } from './user/authentication.service';
import { ISession } from './models/session.model';
import { environment } from './../../environments/environment';
import { IApiResponse } from './helpers/api-response.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';


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

  constructor(private http: HttpClient, private authenticationService: AuthenticationService, private toastService: ToastService) {
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
      .pipe(
        tap((data: IApiResponse) => {
          if (data.status === 'success') {
            this.toastService.notifyToast('info', 'Load Session Success', data.message, 4000);
          } else if (data.status === 'error') {
            this.toastService.notifyToast('error', 'Sorry Load Session faild', data.message);
          }
        }),
        map((response: IApiResponse) => {
          sessionResponse = { ...response.payload };
          if (!sessionResponse?.isAnonymous) {
            sessionResponse.studentId = this.authenticationService.currentUserValue._id;
          }
          sessionResponse.idquiz.questions = sessionResponse.idquiz.questions
            .map((quest, index) => {
              quest.previous = null;
              quest.next = null;
              quest.previousQuestionType = null;
              quest.nextQuestionType = null;
              if (index > 0) {
                quest.previous = sessionResponse.idquiz.questions[index - 1]._id;
                quest.previousQuestionType = sessionResponse.idquiz.questions[index - 1].question_type;
              }
              if (index < sessionResponse.idquiz.questions.length - 1) {
                quest.next = sessionResponse.idquiz.questions[index + 1]._id;
                quest.nextQuestionType = sessionResponse.idquiz.questions[index + 1].question_type;
              }
              if ((quest.question_type === 'QCM') || (quest.question_type === 'QCU')) {
                quest.qcxResponse = quest.qcxResponse.map(resp => {
                  resp.isValid = false;
                  return resp;
                });
              }
              return quest;
            });
          return sessionResponse;
        }
        ),
        map(sResponse => {
          if (sResponse) {
            sResponse.idquiz.questions = sResponse?.idquiz.questions.map(q => {
              const nq = { ...q };
              switch (nq.question_type) {
                case 'QCM': { nq.routerLink = `qcm/${q._id}`; break; }
                case 'QCU': { nq.routerLink = `qcu/${q._id}`; break; }
                case 'INPUT': { nq.routerLink = 'app-input'; break; }
                case 'ORDERING': { nq.routerLink = 'app-ordering'; break; }
              }
              return nq;
            }
            );
          }
          localStorage.setItem('sessionResponse', JSON.stringify(sessionResponse));
          this.sessionResponseSubject.next(sessionResponse);
          return sResponse;
        }),
        catchError(error => of(`Bad Promise: ${error}`))
      );
  }

  notify(session: any): void {
    localStorage.setItem('sessionResponse', JSON.stringify(session));
    this.sessionResponseSubject.next(session);
  }

  endSession(): void {
    // remove user from local storage to log user out
    localStorage.removeItem('currentSession');
    localStorage.removeItem('sessionResponse');
    this.currentSessionSubject.next(null);
    this.sessionResponseSubject.next(null);
  }
}
