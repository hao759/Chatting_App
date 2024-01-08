import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions } from '@kolkov/ngx-gallery';
import { TabDirective, TabsetComponent } from 'ngx-bootstrap/tabs';
import { User } from 'src/app/_models/User';
import { Member } from 'src/app/_models/member';
import { Message } from 'src/app/_models/message';
import { MembersService } from 'src/app/_service/members.service';
import { MessageServiceService } from 'src/app/_service/message.service';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit {
  @ViewChild('memberTabs', { static: true }) memberTabs?: TabsetComponent;
  member!: Member
  galleryOptions: NgxGalleryOptions[] = []
  galleryImages: NgxGalleryImage[] = []
  activeTab?: TabDirective;
  messages: Message[] = [];
  user?: User;


  constructor(private memberService: MembersService, private _ActivatedRoute: ActivatedRoute,
    private messageService: MessageServiceService, private route: ActivatedRoute) { }
  ngOnInit(): void {
    this.route.data.subscribe({
      next: data => this.member = data['member']
    })
    this.route.queryParams.subscribe({
      next: params => {
        params['tab'] && this.selectTab(params['tab'])
      }
    })
    this.loadMessages();
    this.galleryOptions = [
      {
        width: '600px',
        height: '400px',
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide
      },
      {
        breakpoint: 800,
        width: '100%',
        height: '600px',
        imagePercent: 80,
        thumbnailsPercent: 20,
        thumbnailsMargin: 20,
        thumbnailMargin: 20
      },
      {
        breakpoint: 400,
        preview: false
      }
    ];


  }
  getImage() {
    if (this.member) {
      const imageUrl = []
      for (var item of this.member.photos) {
        imageUrl.push({
          small: item.url,
          medium: item.url,
          big: item.url
        })
      }
      return imageUrl
    }
    else
      return []
  }
  selectTab(heading: string) {
    if (this.memberTabs) {
      this.memberTabs.tabs.find(x => x.heading === heading)!.active = true;
    }
  }

  onTabActivated(data: TabDirective) {
    this.activeTab = data;
    if (this.activeTab.heading === 'Messages' && this.user) {
      this.loadMessages()
    } else {
    }
  }

  loadMessages() {
    if (this.member)
      this.messageService.getMessageThread(this.member.name).subscribe({
        next: messages => this.messages = messages//ko thay mess
      })
  }
  // loadMember() {
  //   this.memberService.getMember(this._ActivatedRoute.snapshot.params['username']).subscribe(data => {
  //     this.member = data;
  //     this.galleryImages = this.getImage()
  //   })
  // }

}
