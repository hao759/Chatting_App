import { Component, Input } from '@angular/core';
import { Message } from 'src/app/_models/message';
import { MessageServiceService } from 'src/app/_service/message.service';

@Component({
  selector: 'app-membermessage',
  templateUrl: './membermessage.component.html',
  styleUrls: ['./membermessage.component.css']
})
export class MembermessageComponent {
  @Input() username?: string;
  @Input() message: Message[] = [];

  constructor(public messageService: MessageServiceService) { }
  ngOnInit(): void {
    // this.loadMessage()
  }

  // sendMessage() {
  //   if (!this.username) return;
  //   this.loading = true;
  //   this.messageService.sendMessage(this.username, this.messageContent).then(() => {
  //     this.messageForm?.reset();
  //   }).finally(() => this.loading = false);
  // }
}
