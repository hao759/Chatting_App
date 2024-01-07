import { Component } from '@angular/core';
import { Message } from 'src/app/_models/message';
import { Pagination } from 'src/app/_models/pagination';
import { MessageServiceService } from 'src/app/_service/message.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  // styleUrls: ['./messages.component.css']
})
export class MessagesComponent {
  messages?: Message[] = [];
  pagination?: Pagination;
  container = "Unread";
  pageNumber = 1;
  pageSize = 5;
  loading = false;

  constructor(private messageService: MessageServiceService) { }
  ngOnInit(): void {
    this.loadMessages()
  }

  loadMessages() {
    this.loading = true;
    this.messageService.getMessages(this.pageNumber, this.pageSize, this.container).subscribe({
      next: response => {
        this.messages = response.result;
        this.pagination = response.pagination;
        // this.loading = false;
      }, error: err => console.log(err)
    })
  }
  pageChanged(event: any) {
    if (this.pageNumber !== event.page) {
      this.pageNumber = event.page;
      this.loadMessages();
    }
  }

}
