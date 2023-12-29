import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions } from '@kolkov/ngx-gallery';
import { Member } from 'src/app/_models/member';
import { MembersService } from 'src/app/_service/members.service';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit {
  member!: Member
  galleryOptions: NgxGalleryOptions[] = []
  galleryImages: NgxGalleryImage[] = []


  constructor(private memberService: MembersService, private _ActivatedRoute: ActivatedRoute) { }
  ngOnInit(): void {
    this.loadMember()

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


  loadMember() {
    this.memberService.getMember(this._ActivatedRoute.snapshot.params['username']).subscribe(data => {
      this.member = data;
      this.galleryImages = this.getImage()
    })
  }

}
