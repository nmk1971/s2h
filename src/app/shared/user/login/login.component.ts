import { SessionService } from './../../session.service';
import { ToastService } from './../../toast.service';
import { IApiResponse } from './../../helpers/api-response.model';
import { MessageService } from 'primeng/api';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  returnUrl: string;
  public hide: boolean;
  public session: any;



  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private toastService: ToastService,
    private authenticationService: AuthenticationService,
    private sessionService: SessionService) {
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      loginname: ['', Validators.compose([
        Validators.required])],
      password: ['', Validators.required]
    });
    this.session = this.sessionService.currentSessionValue;
  }

  onSubmit(): void {

    this.authenticationService.login(
      this.loginForm.value.loginname,
      this.loginForm.value.password,
      this.session.group
    )
      .pipe(first())
      .subscribe({
        next: (data: IApiResponse) => {
          if (data.status === 'success') {
            this.toastService.notifyToast('info', 'Success', data.message, 4000);
            this.router.navigate(['/response']);
          } else if (data.status === 'error') {
            this.toastService.notifyToast('error', 'Error', data?.message);
          }
        },
        error: (error) => {
          this.toastService.notifyToast('error', 'Error', error.message);
        },
        complete: () => { console.log(this.session); }
      });
  }

  getErrorMessage(): string {
    return 'invalid loginname, try again';
  }

}
