import { UserModule } from './shared/user/user.module';
import { ErrorInterceptor } from './shared/helpers/error.interceptor';
import { JwtInterceptor } from './shared/helpers/jwt.intercepror';
import { MessageService } from 'primeng/api';
import { PrimengModule } from './shared/primeng/primeng.module';
import { LayoutModule } from './layout/layout.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './shared/material/material.module';
import { LandPageComponent } from './land-page/land-page.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [
    AppComponent,
    LandPageComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    LayoutModule,
    PrimengModule,
    HttpClientModule,
    UserModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: MAT_DIALOG_DATA, useValue: 'dialogData'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
