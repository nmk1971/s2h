import { IApiResponse } from './../../shared/helpers/api-response.model';
import { ToastService } from './../../shared/toast.service';
import { IUser } from './../../shared/user/user.model';
import { AuthenticationService } from './../../shared/user/authentication.service';
import { ISession } from './../../shared/models/session.model';
import { SessionService } from './../../shared/session.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StepsModule } from 'primeng/steps';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-response-page',
  templateUrl: './response-page.component.html',
  styleUrls: ['./response-page.component.scss']
})
export class ResponsePageComponent implements OnInit {

  public session: ISession;
  public currentUser: IUser;
  public sessionResponse: any;
  public questions: MenuItem[];

  constructor(private router: Router,
              private sessionService: SessionService,
              private authenticationService: AuthenticationService,
              private toastService: ToastService) {

  }

  ngOnInit(): void {
    this.session = this.sessionService.currentSessionValue;
    this.currentUser = this.authenticationService.currentUserValue;


    if (this.session === null || (this.session.isAnonymous === false && this.currentUser === null)) {
      this.router.navigate(['/home']);
    }
    this.sessionService.getTheQuiz(this.session?._id).subscribe(
      {
        next: (data: IApiResponse) => {
          if (data.status === 'success') {
            this.sessionResponse = data.payload;
          } else {
            this.toastService.notifyToast('error', 'Error', data.message);
          }
        },
        error: (err) => {
          this.toastService.notifyToast('error', 'Error', err.message);
        },
        complete: () => {
          console.log();
        }
      }
    );
    this.sessionResponse = this.sessionService.sessionResponseValue;
    //  console.log(this.sessionResponse);

    if (this.sessionResponse) {
      this.questions = this.sessionResponse?.idquiz.questions.map(q => {
        const nq = { ...q };
        switch (nq.question_type) {
          case 'QCM': { nq.routerLink = `qcm/${q._id}`; break; }
          case 'QCU': { nq.routerLink = `qcu/${q._id}`; break; }
          case 'INPUT': { nq.routerLink = 'app-input'; break; }
          case 'ORDERING': { nq.routerLink = 'app-ordering'; break; }
        }
        return nq;
      });

        console.log(this.questions);
    }

  }

}
