import { IApiResponse } from './../../shared/helpers/api-response.model';
import { ToastService } from './../../shared/toast.service';
import { IUser } from './../../shared/user/user.model';
import { AuthenticationService } from './../../shared/user/authentication.service';
import { ISession } from './../../shared/models/session.model';
import { SessionService } from './../../shared/session.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MenuItem } from 'primeng/api';

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
  public sessionResponse: any = null;
  public questions: MenuItem[];

  ngOnInit(): void {

    this.session = this.sessionService.currentSessionValue;
    this.currentUser = this.authenticationService.currentUserValue;
    this.sessionResponse = this.sessionService.sessionResponseValue;

    if (this.session === null || (this.session.isAnonymous === false && this.currentUser === null)) {
      this.router.navigate(['/home']);
    }
    this.sessionService.getTheQuiz(this.session?._id).subscribe(
      {
        next: (data: ISession) => {
          this.sessionResponse = data;
          this.questions = [...this.sessionResponse.idquiz.questions];
   //       this.sessionResponse = this.sessionService.sessionResponseValue;
          this.router.navigate([`/response/${this.questions[0].routerLink}`]);
        },
        error: (err) => {
          this.toastService.notifyToast('error', 'Error', err.message);
        },
        complete: () => {
          console.log();
        }
      }
    );
  }

}
