import { Component, Input, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Message } from 'src/app/_models/message';
import { MessageServiceService } from 'src/app/_service/message.service';

@Component({
  selector: 'app-membermessage',
  templateUrl: './membermessage.component.html',
  styleUrls: ['./membermessage.component.css']
})
export class MembermessageComponent {
  @ViewChild('messageForm') messageForm?: NgForm
  @Input() username?: string;
  @Input() message: Message[] = [];
  messageContent = '';

  constructor(public messageService: MessageServiceService) { }
  ngOnInit(): void {
    // this.loadMessage()
  }

  sendMessage() {
    if (!this.username) return;
    this.messageService.sendMessage(this.username, this.messageContent).subscribe({
      next: message => {
        this.message.push(message)
        this.messageForm?.reset()
      }
    })
  }
}
