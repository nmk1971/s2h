import { AuthenticationService } from './../../shared/user/authentication.service';
import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  items: MenuItem[];

  constructor(private authenticationService: AuthenticationService,
              private router: Router){}

  ngOnInit(): void {
    this.items = [
      {
        label: 'Contact',
        routerLink: ['/contact']
      },
      {
        label: 'A propos',
        routerLink: ['/about']
      }
    ];
  }

  logout(): void{
    this.authenticationService.logout();
    this.router.navigate(['/home']);
  }
}
