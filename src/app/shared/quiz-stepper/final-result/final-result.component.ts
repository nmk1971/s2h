import { ToastService } from './../../toast.service';
import { IApiResponse } from './../../helpers/api-response.model';
import { ResponseService } from './../../response.service';
import { AuthenticationService } from './../../user/authentication.service';
import { SessionService } from './../../session.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';

@Component({
  selector: 'app-final-result',
  templateUrl: './final-result.component.html',
  styleUrls: ['./final-result.component.scss']
})
export class FinalResultComponent implements OnInit {
  @ViewChild(MatAccordion) accordion: MatAccordion;
  public response: any;
  public result: any;
  public isLoading = false;
  public correctResponsesNumber: number;
  public totalResponsesNumber: number;
  public score: number;
  public isSentTwice = false;

  constructor(private sessionService: SessionService,
              private authenticationService: AuthenticationService,
              private responseService: ResponseService,
              private toastService: ToastService) { }

  ngOnInit(): void {
    this.response = { ...this.sessionService.sessionResponseValue };
    if (this.response !== null) {
      this.response.student = { ...this.authenticationService.currentUserValue };
      this.response.responseDateTime = new Date();
      this.isLoading = true;
      this.responseService.postResponse(this.response).subscribe(
        {
          next: (data: IApiResponse) => {
            this.toastService.notifyToast('info', 'info', data.message, 3000);
            this.isLoading = false;
            this.result = data.payload;
            this.correctResponsesNumber =
              this.result.hasOwnProperty('sessionId') ?
                this.result.questions.filter(quest => quest.isCorrect === true).length :
                this.result.correctResponsesNumber;
            this.totalResponsesNumber =
              this.result.hasOwnProperty('sessionId') ?
                this.result.questions.length :
                this.result.totalResponsesNumber;
            if (this.result.hasOwnProperty('sessionId')) {
              this.result.questions.map(quest => {
                if (quest.question_type === 'QCU' || quest.question_type === 'QCM') {
                  quest.qcxResponse.map(resp => {
                    resp.correctIsValid = quest.qcxCorrectResponse.filter(corrResp => corrResp._id === resp._id)[0].isValid;
                    return resp;
                  });
                }
                return quest;
              });
            }
            this.score = this.result.score;
            this.sessionService.endSession();
          },
          error: (err: Error) => {
            this.toastService.notifyToast('error', 'Error', err);
            this.isSentTwice = true;
            //            this.sessionService.endSession();
            this.isLoading = false;
          },
          complete: () => {
            this.isLoading = false;
            this.sessionService.endSession();
          }
        }
      );
    }
  }
}
