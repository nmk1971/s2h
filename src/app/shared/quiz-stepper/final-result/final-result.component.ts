import { ToastService } from './../../toast.service';
import { IApiResponse } from './../../helpers/api-response.model';
import { ResponseService } from './../../response.service';
import { AuthenticationService } from './../../user/authentication.service';
import { SessionService } from './../../session.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-final-result',
  templateUrl: './final-result.component.html',
  styleUrls: ['./final-result.component.scss']
})
export class FinalResultComponent implements OnInit {
  public response: any;
  public result: any;
  public isLoading = false;

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

          },
          error: (err: Error) => {
            this.toastService.notifyToast('error', 'Error', err);
          },
          complete: () => {
            this.isLoading = false;

          }
        }
      );
    }

  }

}
