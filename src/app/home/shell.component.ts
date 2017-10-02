import { Component, OnInit } from '@angular/core';
import { MessageService } from '../core/message.service';

@Component({
  selector: 'pm-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.css']
})
export class ShellComponent implements OnInit {
  get displayMessages(): boolean {
    return this.messageService.displayMessages;
  }

  constructor(private messageService: MessageService) { }

  ngOnInit() {
  }

}
