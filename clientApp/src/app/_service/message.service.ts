
import { HttpClient } from '@angular/common/http';
import { Injectable, Input } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { getPaginatedResult, getPaginationHeaders } from './PaginationHelper';
import { Message } from '../_models/message';

@Injectable({
  providedIn: 'root'
})
export class MessageServiceService {
  baseUrl = environment.baseURL;

  constructor(private http: HttpClient) { }


  getMessages(pageNumber: number, pageSize: number, container: string) {
    let params = getPaginationHeaders(pageNumber, pageSize);
    params = params.append('Container', container);
    params = params.append('Username', "123");
    return getPaginatedResult<Message[]>(this.baseUrl + 'messages', params, this.http);
  }
  getMessageThread(username: string) {
    return this.http.get<Message[]>(this.baseUrl + 'messages/thread/' + username);
  }
  sendMessage(username: string, content: string) {
    return this.http.post<Message>(this.baseUrl + "messages", { RecipientUsername: username, content })

  }

  // deleteMessage(id: number) {
  //   this.messageService.deleteMessage(id).subscribe({
  //     next: _ => this.messages?.splice(this.messages.findIndex(m => m.id === id), 1)
  //   })
  // }
}
