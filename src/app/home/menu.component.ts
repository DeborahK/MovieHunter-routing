import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../user/auth.service';

@Component({
  selector: 'mh-menu',
  templateUrl: './menu.component.html'
})
export class MenuComponent implements OnInit {

  constructor(private router: Router,
              private authService: AuthService) { }

  ngOnInit() {
  }

  logOut(): void {
    this.authService.logout();
    this.router.navigate(['/welcome']);
  }
}
