import { ToastService } from './shared/toast.service';
import { Component, OnInit } from '@angular/core';

import { MessageService, PrimeNGConfig } from 'primeng/api';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [MessageService]
})
export class AppComponent implements OnInit {
  private toast$: Observable<any>;

  constructor(
    private primengConfig: PrimeNGConfig,
    private toastService: ToastService,
    private messageService: MessageService) { }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.toast$ = this.toastService.getToast();
    this.toast$.subscribe(
      (toast) => {
        if (toast.life === 0) {
          this.messageService.add({
            severity: toast.severity,
            summary: toast.summary,
            detail: toast.detail,
            sticky: true
          });
        } else {
          this.messageService.add({
            severity: toast.severity,
            summary: toast.summary,
            detail: toast.detail,
            life: toast.life
          });
        }
      });
  }
}
