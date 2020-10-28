import { PrimengModule } from './../shared/primeng/primeng.module';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { ContactPageComponent } from './contact-page/contact-page.component';
import { AboutPageComponent } from './about-page/about-page.component';
import { ResponsePageComponent } from './response-page/response-page.component';


@NgModule({
  declarations: [FooterComponent, NavBarComponent, ContactPageComponent, AboutPageComponent, ResponsePageComponent],
  imports: [
    CommonModule,
    RouterModule,
    PrimengModule
  ],
  exports: [
    FooterComponent,
    NavBarComponent
  ]
})
export class LayoutModule { }
