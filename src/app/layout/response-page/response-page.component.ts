import { QcmFormComponent } from './../../shared/quiz-stepper/qcm-form/qcm-form.component';
import { QcuFormComponent } from './../../shared/quiz-stepper/qcu-form/qcu-form.component';
import { Subscription } from 'rxjs';
import { IApiResponse } from './../../shared/helpers/api-response.model';
import { ToastService } from './../../shared/toast.service';
import { IUser } from './../../shared/user/user.model';
import { AuthenticationService } from './../../shared/user/authentication.service';
import { ISession } from './../../shared/models/session.model';
import { SessionService } from './../../shared/session.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { StepsModule } from 'primeng/steps';
import { MenuItem } from 'primeng/api';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-response-page',
  templateUrl: './response-page.component.html',
  styleUrls: ['./response-page.component.scss']
})
export class ResponsePageComponent implements OnInit {

  constructor(private router: Router,
              private sessionService: SessionService,
              private authenticationService: AuthenticationService,
              private toastService: ToastService,
              private route: ActivatedRoute) {

  }



  public session: ISession | any;
  public currentUser: IUser;
  public sessionResponse: any;
  public questions: MenuItem[];
  public activeIndex: number;
  public currentQuestionId: string;

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
            if (this.sessionResponse) {
              this.questions = this.sessionResponse?.idquiz.questions.map((q, index) => {
                const nq = { ...q };
                switch (nq.question_type) {
                  case 'QCM': { nq.routerLink = `qcm/${q._id}`; break; }
                  case 'QCU': { nq.routerLink = `qcu/${q._id}`; break; }
                  case 'INPUT': { nq.routerLink = 'app-input'; break; }
                  case 'ORDERING': { nq.routerLink = 'app-ordering'; break; }
                }
     /*           nq.command = (event: any) => {
                  this.activeIndex = index;
                  console.log(`%c ${JSON.stringify(event)}`,'color:red;');
                  console.log(`%c ${this.activeIndex}`,'color:blue;');
                };   */
                return nq;
              });
             // console.table(this.questions);
            }
            this.router.navigate([`/response/${this.questions[0].routerLink}`]);
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

   

  }

  getActiveIndex(event): void{
    this.activeIndex = event;
  }

  setActiveIndex(event): void{
    console.log(this.currentQuestionId);
  }
}
