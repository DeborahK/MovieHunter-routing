import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../user/auth.service';

@Component({
  selector: 'mh-menu',
  templateUrl: './menu.component.html'
})
export class MenuComponent implements OnInit {
  pageTitle: string = 'InStep Movie Hunter';

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  get userName(): string {
    return this.authService.currentUser.userName;
  }

  constructor(private router: Router,
              private authService: AuthService) { }

  ngOnInit() {
  }

  logOut(): void {
    this.authService.logout();
    this.router.navigate(['/welcome']);
  }
}
