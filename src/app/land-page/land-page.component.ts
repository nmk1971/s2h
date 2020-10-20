import { IApiResponse } from './../shared/helpers/api-response.model';
import { SessionService } from './../shared/session.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';


@Component({
  selector: 'app-land-page',
  templateUrl: './land-page.component.html',
  styleUrls: ['./land-page.component.scss'],
  providers: [MessageService]
})
export class LandPageComponent implements OnInit {
  public accessForm: FormGroup;
  private subscription: Subscription;

  constructor(
    private fb: FormBuilder,
    private sessionService: SessionService,
    private messageService: MessageService,
    private route: Router) { }

  ngOnInit(): void {
    this.accessForm = this.fb.group({
      code: ['', Validators.required]
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
          next: (response: IApiResponse)=>{
            if(response.status==="success"){
            const isAnonymous = response.payload.isAnonymous;
            if(isAnonymous){
              this.route.navigate(['/response',response.payload.idquiz]);
            }else{
              this.route.navigate(['/login']);
            }
          }
          },
          error:(error: Error)=>{
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: error.message
            })
          },
          complete:console.log
        });
  }


  private handleApiResponse(response: IApiResponse): void {
    if (response.status === 'success') {
      this.messageService.add({
        life: 4000,
        severity: 'success',
        summary: response.message,
        detail: 'We will redirect you'
      });

    } else if (response.status === 'error') {
      this.messageService.add({
        severity: 'error',
        summary: response.message,
        detail: response.message
      });
    }
  }
}
