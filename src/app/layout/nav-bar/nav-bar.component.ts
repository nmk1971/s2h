import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  items: MenuItem[];

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


}
