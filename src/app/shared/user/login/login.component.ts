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
  styleUrls: ['./login.component.scss'],
  providers:[MessageService]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  returnUrl: string;
  public hide: boolean;



  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private messageService: MessageService,
              private authenticationService: AuthenticationService) {
         // redirect to home if already logged in
     if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/response', 1]);
     }
    }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      loginname: ['', Validators.compose([
        Validators.required  ])],
      password: ['', Validators.required]
    });

  }

  onSubmit(): void{
    this.authenticationService.login(this.loginForm.value.loginname, this.loginForm.value.password)
      .pipe(first())
      .subscribe(
       (data: IApiResponse) => {
         this.messageService.add({severity:'info',summary:'Success',detail:data.message,life:4000});
         this.router.navigate(['/creator/home']);
        },
        error => {
          this.messageService.add({severity:'error',summary:'Error',detail:'Failed to login',life:4000})
        });
  }

  getErrorMessage(): string{
    return 'invalid loginname, try again';
  }

}
