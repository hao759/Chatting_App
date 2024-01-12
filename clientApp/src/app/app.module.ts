import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { NavComponent } from './Component/nav/nav.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AccountService } from './_service/account.service';
import { HomeComponent } from './Component/home/home/home.component';
import { RegisterComponent } from './Component/register/register.component';
import { MemberListComponent } from './Component/members/member-list/member-list.component';
import { MemberDetailComponent } from './Component/members/member-detail/member-detail.component';
import { ListsComponent } from './Component/members/lists/lists.component';
import { MessagesComponent } from './Component/members/messages/messages.component';
import { ToastrModule } from 'ngx-toastr';
import { ModuleShareModule } from './-module-share/-module-share.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TestErrorComponent } from './error/test-error/test-error.component';
import { MemberCardComponent } from './Component/members/member-card/member-card.component';
import { JwtInterceptor } from './_interceptor/jwt.interceptor';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { NgxGalleryModule } from '@kolkov/ngx-gallery';
import { MemberEditComponent } from './Component/members/member-edit/member-edit.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { LoadingInterceptor } from './_interceptor/loading.interceptor';
import { PhotoEditorComponent } from './Component/members/photo-editor/photo-editor.component';
import { FileSelectDirective, FileUploadModule } from 'ng2-file-upload';
import { TextInputComponent } from './_forms/text-input/text-input.component';
import { DataPickerComponent } from './_forms/data-picker/data-picker.component';

import { MembermessageComponent } from './Component/members/membermessage/membermessage.component';
import { AdminPannelComponent } from './Component/admin/admin-pannel/admin-pannel.component';
import { HasRoleDirective } from './_directives/has-role.directive';
import { UserManagementComponent } from './Component/admin/user-management/user-management.component';
import { PhotoManagementComponent } from './Component/admin/photo-management/photo-management.component';
import { RolesModalComponent } from './_models/roles-modal/roles-modal.component';
@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    RegisterComponent,
    MemberListComponent,
    MemberDetailComponent,
    ListsComponent,
    MessagesComponent,
    TestErrorComponent,
    MemberCardComponent,
    MemberEditComponent,
    PhotoEditorComponent,
    TextInputComponent,
    DataPickerComponent,
    MembermessageComponent,
    AdminPannelComponent,
    HasRoleDirective,
    UserManagementComponent,
    PhotoManagementComponent,
    RolesModalComponent,
  ],
  imports: [
    FileUploadModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ModuleShareModule,
    BrowserAnimationsModule,
    NgxGalleryModule,
    ReactiveFormsModule,
    NgxSpinnerModule.forRoot({ type: 'ball-scale-multiple' }),
    TabsModule.forRoot(),
  ],
  providers: [
    AccountService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
