import { LoginComponent } from './shared/user/login/login.component';
import { ResponsePageComponent } from './layout/response-page/response-page.component';
import { AboutPageComponent } from './layout/about-page/about-page.component';
import { ContactPageComponent } from './layout/contact-page/contact-page.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandPageComponent } from './land-page/land-page.component';

const routes: Routes = [
  { path: 'home', component: LandPageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'response', component: ResponsePageComponent },
  { path: 'contact', component: ContactPageComponent },
  { path: 'about', component: AboutPageComponent },
  { path: '**', redirectTo: 'home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
