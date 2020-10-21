import { ToastService } from './../shared/toast.service';
import { IApiResponse } from './../shared/helpers/api-response.model';
import { SessionService } from './../shared/session.service';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder, FormGroup,
  Validators
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';


@Component({
  selector: 'app-land-page',
  templateUrl: './land-page.component.html',
  styleUrls: ['./land-page.component.scss']
})
export class LandPageComponent implements OnInit {
  public accessForm: FormGroup;
  private subscription: Subscription;

  constructor(
    private fb: FormBuilder,
    private sessionService: SessionService,
    private toastService: ToastService,
    private route: Router) { }

  ngOnInit(): void {
    this.accessForm = this.fb.group({
      code: ['', Validators.compose(
        [
          Validators.required,
          Validators.maxLength(6),
          Validators.minLength(6)
        ]
      )
      ]
    });
  }

  connect(): void {
    this.subscription = this.sessionService.connect(this.accessForm.value.code).
      pipe(
        tap(
          (response: IApiResponse) => {
            this.handleApiResponse(response);
          }
        )).subscribe({
          next: (response: IApiResponse) => {
            if (response.status === 'success') {
              const isAnonymous = response.payload.isAnonymous;
              if (isAnonymous) {
                this.route.navigate(['/response', response.payload.idquiz]);
              } else {
                this.route.navigate(['/login']);
              }
            }
          },
          error: (error: Error) => {
            this.toastService.notifyToast('error', 'Error', error.message);
          },
          complete: console.log
        });
  }


  private handleApiResponse(response: IApiResponse): void {
    if (response.status === 'success') {
      this.toastService.notifyToast('success', response.message, 'We will redirect you', 1000);

    } else if (response.status === 'error') {
      this.toastService.notifyToast('error', response.message, response.message);
    }
  }
}
