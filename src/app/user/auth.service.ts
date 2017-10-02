import { Injectable } from '@angular/core';

import { IUser } from './user';
import { MessageService } from '../core/message.service';

@Injectable()
export class AuthService {
    currentUser: IUser;
    redirectUrl: string;

    constructor(private messageService: MessageService) {  }

    isLoggedIn(): boolean {
        return !!this.currentUser;
    }

    login(userName: string, password: string): void {
        // Code here would log into a back end service
        // and return user information
        // This is just hard-coded here.
        this.currentUser = {
            id: 2,
            userName: userName,
            isAdmin: false
        };
        this.messageService.addMessage(`User: ${this.currentUser.userName} logged in`);
    }

    logout(): void {
        this.currentUser = null;
    }
}
