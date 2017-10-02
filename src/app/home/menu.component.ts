import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../user/auth.service';
import { MessageService } from '../core/message.service';

@Component({
  selector: 'pm-menu',
  templateUrl: './menu.component.html'
})
export class MenuComponent implements OnInit {
  get displayMessages(): boolean {
    return this.messageService.displayMessages;
  }

  constructor(private router: Router,
              private authService: AuthService,
              private messageService: MessageService) { }

  ngOnInit() {
  }

  showMessages(): void {
    this.messageService.displayMessages = true;
  }

  hideMessages(): void {
    this.messageService.displayMessages = false;
  }

  logOut(): void {
    this.authService.logout();
    this.router.navigate(['/welcome']);
  }
}
