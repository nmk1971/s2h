import { PrimengModule } from './../primeng/primeng.module';
import { UserBadgeComponent } from './badge/user-badge.component';
import { MaterialModule } from './../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [LoginComponent, UserBadgeComponent],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    HttpClientModule,
    PrimengModule
  ],
  exports:[LoginComponent, UserBadgeComponent]
})
export class UserModule { }
