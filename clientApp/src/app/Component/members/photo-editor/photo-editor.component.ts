import { Component, Input } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { User } from 'src/app/_models/User';
import { Member } from 'src/app/_models/member';
import { AccountService } from 'src/app/_service/account.service';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.css']
})
export class PhotoEditorComponent {
  @Input() member: Member | undefined
  uploader: FileUploader | undefined
  hasBaseDropZoneOver = false;
  baseUrl = environment.baseURL;
  user: User | undefined;

  constructor(private accountService: AccountService) {
    this.accountService.currentUser.subscribe(data => {
      if (data)
        this.user = data
    })
  }
  ngOnInit(): void {
    this.initializeUploader();
  }

  fileOverBase(e: any) {
    this.hasBaseDropZoneOver = e;
  }

  initializeUploader() {
    this.uploader = new FileUploader({
      url: this.baseUrl + 'users/add_photo',
      authToken: 'Bearer ' + this.user?.token,
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024
    });

    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    }

    this.uploader.onSuccessItem = (item, response, status, headers) => {
      if (response) {
        const photo = JSON.parse(response);
        this.member?.photos.push(photo);
        // if (photo.isMain && this.user && this.member) {
        //   this.user.pho = photo.url;
        //   this.member.photos = photo.url;
        //   this.accountService.setCurrentUser(this.user);
        // }
      }
    }
  }

}
