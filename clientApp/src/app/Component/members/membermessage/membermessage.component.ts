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
  message: Message[] = []

  constructor(public messageService: MessageServiceService) { }
  ngOnInit(): void {
    this.loadMessage()
  }
  loadMessage() {
    if (this.username) {
      this.messageService.getMessageThread(this.username).subscribe({
        next: res => {
          this.message = res
        }
      })
    }
  }

  // sendMessage() {
  //   if (!this.username) return;
  //   this.loading = true;
  //   this.messageService.sendMessage(this.username, this.messageContent).then(() => {
  //     this.messageForm?.reset();
  //   }).finally(() => this.loading = false);
  // }
}
