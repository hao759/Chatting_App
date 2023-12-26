import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from "@angular/common/http";
import { NavComponent } from './Component/nav/nav.component'
import { FormsModule } from '@angular/forms';
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
@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    RegisterComponent,
    MemberListComponent,
    MemberDetailComponent,
    ListsComponent,
    MessagesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ModuleShareModule,
    BrowserAnimationsModule,
  ],
  providers: [
    AccountService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
